"""
Startup Database MCP Tool Module
"""

def fetch_startups(query: str) -> list[dict]:
    """Fetch startup database entries"""
    return [
        {
            "title": f"Top {query} Startups 2024 - Crunchbase",
            "summary": f"Database shows 15-20 active startups. Most Series A or earlier.",
            "link": "https://crunchbase.com/example",
            "source": "Startup Database"
        },
        {
            "title": f"{query} Sector Deep Dive Analysis",
            "summary": f"Top 10 startups analyzed. Avg funding: $5-15M. Healthy diversity in market.",
            "link": "https://startupdb.example.com/example",
            "source": "Startup Database"
        }
    ]
