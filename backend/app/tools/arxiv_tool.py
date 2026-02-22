import arxiv
import os

def download_first_paper(query: str, download_path="app/data"):
    # Ensure directory exists
    os.makedirs(download_path, exist_ok=True)

    search = arxiv.Search(
        query=f'ti:"{query}"',  # search in title only
        max_results=1,
        sort_by=arxiv.SortCriterion.Relevance
    )

    results = list(search.results())
    if not results:
        print("No papers found.")
        return None

    paper = results[0]
    print("Downloading:", paper.title)

    paper.download_pdf(dirpath=download_path)

    return paper.title
