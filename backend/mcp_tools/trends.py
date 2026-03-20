"""
Google Trends MCP Tool Module
"""

def get_trends(query: str) -> list[dict]:
    """Get Google Trends data"""
    return [
        {
            "title": f"Google Trends: {query} up 45% YoY",
            "summary": f"Consistent upward trend in search volume. Peak in Q3 2024.",
            "link": "https://trends.google.com/example",
            "source": "Google Trends"
        },
        {
            "title": f"Related searches growing for {query}",
            "summary": f"Emerging keywords indicate market development potential.",
            "link": "https://trends.google.com/example2",
            "source": "Google Trends"
        }
    ]
