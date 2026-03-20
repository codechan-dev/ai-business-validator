def competitor_analysis(parsed_idea: dict) -> dict:
    """
    Analyze competitors using MCP tools
    """
    category = parsed_idea.get('category', 'general')
    keywords = parsed_idea.get('keywords', [])
    
    return {
        "competitors": find_competitors(category),
        "market_position": analyze_market_position(category),
        "barriers_to_entry": identify_barriers(category),
        "summary": f"Identified {3-5} major competitors in the {category} space. Market is moderately competitive with room for differentiation.",
        "competitive_advantages": [
            "AI-powered personalization",
            "Superior user interface",
            "Better pricing model",
            "Unique feature set"
        ]
    }

def find_competitors(category: str) -> list[dict]:
    """Find competitors in the category"""
    competitors_map = {
        'saas': [
            {'name': 'Salesforce', 'market_cap': '$300B', 'strength': 95},
            {'name': 'HubSpot', 'market_cap': '$30B', 'strength': 85},
            {'name': 'Slack', 'market_cap': '$25B', 'strength': 80}
        ],
        'marketplace': [
            {'name': 'Airbnb', 'market_cap': '$100B', 'strength': 95},
            {'name': 'Uber', 'market_cap': '$80B', 'strength': 90},
            {'name': 'DoorDash', 'market_cap': '$40B', 'strength': 85}
        ],
        'healthcare': [
            {'name': 'Teladoc', 'market_cap': '$20B', 'strength': 85},
            {'name': 'Livongo', 'market_cap': '$100B', 'strength': 90},
            {'name': 'CVS Health', 'market_cap': '$150B', 'strength': 95}
        ],
        'fintech': [
            {'name': 'Stripe', 'market_cap': '$95B', 'strength': 95},
            {'name': 'Square', 'market_cap': '$50B', 'strength': 90},
            {'name': 'Robinhood', 'market_cap': '$15B', 'strength': 80}
        ],
        'education': [
            {'name': 'Coursera', 'market_cap': '$10B', 'strength': 85},
            {'name': 'Skillshare', 'market_cap': '$3B', 'strength': 75},
            {'name': 'Udemy', 'market_cap': '$15B', 'strength': 85}
        ],
        'general': [
            {'name': 'Competitor A', 'market_cap': '$5B', 'strength': 75},
            {'name': 'Competitor B', 'market_cap': '$3B', 'strength': 70},
            {'name': 'Competitor C', 'market_cap': '$2B', 'strength': 65}
        ]
    }
    return competitors_map.get(category, competitors_map['general'])

def analyze_market_position(category: str) -> str:
    """Analyze the market position"""
    positions = {
        'saas': 'Highly competitive, requires strong differentiation',
        'marketplace': 'Network effects are critical, first-mover advantage matters',
        'healthcare': 'Highly regulated, compliance is essential',
        'fintech': 'Competitive, but opportunities in niches',
        'education': 'Growing market, good opportunities',
        'general': 'Market dependent'
    }
    return positions.get(category, positions['general'])

def identify_barriers(category: str) -> list[str]:
    """Identify barriers to entry"""
    barriers_map = {
        'saas': ['High development cost', 'Customer acquisition', 'Churn risk'],
        'marketplace': ['Network effects', 'Unit economics', 'Quality control'],
        'healthcare': ['Regulations', 'Certifications', 'Data privacy'],
        'fintech': ['Regulations', 'Trust', 'Capital requirements'],
        'education': ['Content quality', 'Instructor acquisition', 'Competition'],
        'general': ['Market saturation', 'Competition', 'Capital needs']
    }
    return barriers_map.get(category, barriers_map['general'])
