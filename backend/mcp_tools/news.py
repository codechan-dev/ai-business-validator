"""
News MCP Tool Module
"""

def fetch_news(query: str) -> list[dict]:
    """Fetch news mentions and articles"""
    return [
        {
            "title": f"{query} Market Grew 23% in 2024 - Industry Report",
            "summary": f"Major outlets reporting significant growth. Driven by enterprise adoption.",
            "link": "https://news.example.com/article1",
            "source": "News"
        },
        {
            "title": f"{query} Startup Raises $50M Series B",
            "summary": f"Well-funded competitors entering market. Validates opportunity.",
            "link": "https://news.example.com/article2",
            "source": "News"
        }
    ]
