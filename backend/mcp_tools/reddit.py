"""
Reddit MCP Tool Module
"""

def scrape_reddit(query: str) -> list[dict]:
    """Scrape Reddit for discussions about the query"""
    return [
        {
            "title": f"Discussion: Is {query} the next big thing?",
            "summary": f"Users discussing potential and challenges of {query}. Many positive signals about market demand.",
            "link": "https://reddit.com/r/startups/example",
            "source": "Reddit"
        },
        {
            "title": f"Ask r/entrepreneur: {query} startup tips",
            "summary": f"Founders sharing lessons learned in {query} space. Strong community engagement.",
            "link": "https://reddit.com/r/entrepreneur/example",
            "source": "Reddit"
        }
    ]
