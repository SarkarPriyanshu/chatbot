// file-structure-map.ts
import * as fs from "fs";
import * as path from "path";

type FileNode = {
  name: string;
  isDirectory: boolean;
  children?: FileNode[];
};

function getFileStructure(dirPath: string): FileNode[] {
  const items = fs.readdirSync(dirPath);

  return items.map((item) => {
    const fullPath = path.join(dirPath, item);
    const isDir = fs.statSync(fullPath).isDirectory();

    if (isDir) {
      return {
        name: item,
        isDirectory: true,
        children: getFileStructure(fullPath),
      };
    } else {
      return {
        name: item,
        isDirectory: false,
      };
    }
  });
}

function formatStructure(nodes: FileNode[], indent = ""): string {
  let result = "";
  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    result += indent + pointer + node.name + "\n";

    if (node.isDirectory && node.children) {
      const newIndent = indent + (isLast ? "    " : "│   ");
      result += formatStructure(node.children, newIndent);
    }
  });
  return result;
}

// Usage: pass directory path and optional output file path
const targetDir = process.argv[2] || process.cwd();
const outputFile = process.argv[3] || "file-structure.txt";

console.log(`Scanning directory: ${targetDir}`);
const structure = getFileStructure(targetDir);
const formatted = formatStructure(structure);

fs.writeFileSync(outputFile, formatted);
console.log(`File structure saved to: ${outputFile}`);