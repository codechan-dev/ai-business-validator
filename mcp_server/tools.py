from typing import Any, Dict, List


def market_size(industry: str) -> Dict[str, Any]:
    """Return mocked market size data for a given industry."""
    normalized = industry.lower()

    presets = {
        "recruitment technology": {"market_size": "$34B", "growth_rate": "9% CAGR"},
        "hr tech": {"market_size": "$45B", "growth_rate": "7% CAGR"},
        "fintech": {"market_size": "$180B", "growth_rate": "11% CAGR"},
        "healthtech": {"market_size": "$120B", "growth_rate": "10% CAGR"},
    }

    data = presets.get(
        normalized,
        {"market_size": "N/A", "growth_rate": "N/A"},
    )
    return {"industry": industry, **data}


def find_competitors(product: str) -> List[str]:
    """Return a mocked list of competitors for a product."""
    text = product.lower()

    if "job" in text and "apply" in text:
        return ["LazyApply", "Teal HQ", "Simplify", "Applyish", "LoopCV"]

    if "crm" in text:
        return ["Salesforce", "HubSpot", "Pipedrive"]

    if "note" in text or "productivity" in text:
        return ["Notion", "Evernote", "Obsidian"]

    return ["No well-known direct competitors found"]


def search_trends(keyword: str) -> Dict[str, Any]:
    """Return mocked demand signals for a given keyword."""
    text = keyword.lower()

    if "ai" in text and "job" in text:
        demand_score = 8.5
        signals = [
            "High growth in Google search interest for 'AI job application'.",
            "Multiple active Reddit threads discussing automation of job applications.",
            "Several Product Hunt launches around job search automation in the last 12 months.",
        ]
    elif "ai" in text:
        demand_score = 7.5
        signals = [
            "Steady increase in AI-related search volumes.",
            "Strong investor interest in AI infrastructure and tooling.",
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
    }


def startup_lookup(category: str) -> Dict[str, Any]:
    """Return a mocked list of related startups for a category."""
    text = category.lower()

    if "recruitment" in text or "job" in text:
        startups = ["Hired", "Lever", "Greenhouse", "Eightfold.ai"]
    elif "fintech" in text:
        startups = ["Stripe", "Plaid", "Rapyd", "Brex"]
    else:
        startups = ["No notable startups found for this category"]

    return {"category": category, "startups": startups}


__all__ = [
    "market_size",
    "find_competitors",
    "search_trends",
    "startup_lookup",
]

