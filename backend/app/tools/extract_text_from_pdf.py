import subprocess as sp
from pathlib import Path
import time


def pdftotext(download_path, output_path, fetch_only_first_page = False):
    download_path = Path(download_path).resolve()
    output_path = Path(output_path).resolve()
    result = None

    # Run pdftotext
    if not fetch_only_first_page:
        result = sp.run(
            ["pdftotext", "-layout", str(download_path), str(output_path)],
            capture_output=True,
            text=True
        )
    else:
         result = sp.run(
            ["pdftotext", "-f", "1", "-l", "1", "-layout", str(download_path), str(output_path)],
            capture_output=True,
            text=True
        )   

    # Check for errors
    if result.returncode != 0:
        raise RuntimeError(f"pdftotext failed: {result.stderr}")

    # Read the output file
    with open(output_path, "r", encoding="utf-8") as f:
        data = f.read()

    return data