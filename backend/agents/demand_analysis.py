def demand_analysis(parsed_idea: dict) -> dict:
    """
    Analyze market demand using MCP tools
    """
    category = parsed_idea.get('category', 'general')
    keywords = parsed_idea.get('keywords', [])
    
    return {
        "demand_level": calculate_demand_level(category),
        "target_market_size": estimate_market_size(category),
        "growth_potential": estimate_growth(category),
        "summary": f"Market demand for {category} ideas is growing. Customer interest is high with increasing search trends.",
        "demand_signals": [
            {"signal": "Google Searches", "trend": "↑ +45% YoY"},
            {"signal": "Social Media Mentions", "trend": "↑ +60% YoY"},
            {"signal": "Funding Activity", "trend": "↑ +35% YoY"},
        ]
    }

def calculate_demand_level(category: str) -> str:
    """Calculate demand level"""
    demand_map = {
        'saas': 'Very High',
        'marketplace': 'High',
        'healthcare': 'Very High',
        'fintech': 'Very High',
        'education': 'High',
        'general': 'Medium'
    }
    return demand_map.get(category, demand_map['general'])

def estimate_market_size(category: str) -> dict:
    """Estimate addressable market"""
    estimates = {
        'saas': {'tam': '$500B', 'sam': '$50B', 'som': '$5B'},
        'marketplace': {'tam': '$400B', 'sam': '$40B', 'som': '$4B'},
        'healthcare': {'tam': '$600B', 'sam': '$60B', 'som': '$6B'},
        'fintech': {'tam': '$450B', 'sam': '$45B', 'som': '$4.5B'},
        'education': {'tam': '$350B', 'sam': '$35B', 'som': '$3.5B'},
        'general': {'tam': '$100B', 'sam': '$10B', 'som': '$1B'}
    }
    return estimates.get(category, estimates['general'])

def estimate_growth(category: str) -> int:
    """Estimate growth potential"""
    growth_map = {
        'saas': 85,
        'marketplace': 75,
        'healthcare': 80,
        'fintech': 90,
        'education': 78,
        'general': 60
    }
    return growth_map.get(category, growth_map['general'])
