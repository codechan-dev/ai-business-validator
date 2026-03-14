"""MCP tools with real-time data fetching (with fallback to mocked data)."""

from typing import Any, Dict, List
import logging

try:
    from . import real_data
    HAS_REAL_DATA = True
except ImportError:
    HAS_REAL_DATA = False
    real_data = None

logger = logging.getLogger(__name__)

# Fallback mocked data
_MOCK_DATA = {
    "recruitment technology": {"market_size": "$34B", "growth_rate": "9% CAGR"},
    "hr tech": {"market_size": "$45B", "growth_rate": "7% CAGR"},
    "fintech": {"market_size": "$180B", "growth_rate": "11% CAGR"},
    "healthtech": {"market_size": "$120B", "growth_rate": "10% CAGR"},
}

_MOCK_COMPETITORS = {
    "job": ["LazyApply", "Teal HQ", "Simplify", "Applyish", "LoopCV"],
    "crm": ["Salesforce", "HubSpot", "Pipedrive"],
    "note": ["Notion", "Evernote", "Obsidian"],
    "water": ["Nalgene", "Hydro Flask", "S'well", "CamelBak", "Contigo"],
    "beverage": ["Coca-Cola", "PepsiCo", "Danone", "Nestlé", "Red Bull"],
    "can": ["Nalgene", "Hydro Flask", "S'well", "CamelBak", "Contigo", "Gatorade"],
}

_MOCK_STARTUPS = {
    "recruitment": ["Hired", "Lever", "Greenhouse", "Eightfold.ai"],
    "fintech": ["Stripe", "Plaid", "Rapyd", "Brex"],
}


def market_size(industry: str) -> Dict[str, Any]:
    """Fetch market size data from real APIs (or mock as fallback)."""
    if HAS_REAL_DATA:
        result = real_data.market_size(industry)
        if result and "error" not in result:
            return result
    
    # Fallback to mocked data
    normalized = industry.lower()
    data = _MOCK_DATA.get(
        normalized,
        {"market_size": "Data not available", "growth_rate": "Unknown"},
    )
    return {"industry": industry, **data, "source": "Mocked data (real API unavailable)"}


def find_competitors(product: str) -> List[str]:
    """Find competitors from real APIs (or mock as fallback)."""
    if HAS_REAL_DATA:
        result = real_data.find_competitors(product)
        if result and "Unable to fetch" not in str(result):
            return result
    
    # Fallback to mocked data
    text = product.lower()
    for key, competitors in _MOCK_COMPETITORS.items():
        if key in text:
            return competitors
    
    return ["Competitors data not available"]


def search_trends(keyword: str) -> Dict[str, Any]:
    """Fetch real-time search trends (or mock as fallback)."""
    if HAS_REAL_DATA:
        result = real_data.search_trends(keyword)
        if result and "error" not in result:
            return result
    
    # Fallback to mocked data
    text = keyword.lower()
    if "ai" in text and "job" in text:
        demand_score = 8.5
        signals = [
            "High growth in Google search interest for 'AI job application'.",
            "Multiple active Reddit threads discussing automation of job applications.",
            "Several Product Hunt launches around job search automation.",
        ]
    elif "ai" in text:
        demand_score = 7.5
        signals = [
            "Steady increase in AI-related search volumes.",
            "Strong investor interest in AI infrastructure.",
        ]
    else:
        demand_score = 5.0
        signals = [
            "Moderate search interest with no clear acceleration.",
            "Sparse community discussions across major forums.",
        ]

    return {
        "keyword": keyword,
        "demand_score": demand_score,
        "signals": signals,
        "source": "Mocked data (real API unavailable)",
    }


def startup_lookup(category: str) -> Dict[str, Any]:
    """Look up startups from real APIs (or mock as fallback)."""
    if HAS_REAL_DATA:
        result = real_data.startup_lookup(category)
        if result and "error" not in result:
            return result
    
    # Fallback to mocked data
    text = category.lower()
    startups = []
    
    for key, startup_list in _MOCK_STARTUPS.items():
        if key in text:
            startups = startup_list
            break
    
    return {
        "category": category,
        "startups": startups or ["No data available"],
        "source": "Mocked data (real API unavailable)",
    }


__all__ = [
    "market_size",
    "find_competitors",
    "search_trends",
    "startup_lookup",
]
