def scoring(market_data: dict, competitor_data: dict, demand_data: dict, risk_data: dict) -> dict:
    """
    Calculate overall scores based on analysis
    """
    feasibility_score = calculate_feasibility(market_data, competitor_data)
    demand_score = calculate_demand(demand_data)
    competition_score = calculate_competition(competitor_data)
    risk_score = 100 - risk_data.get('risk_score', 50)  # Invert so lower risk = higher score
    
    return {
        "feasibility": min(max(feasibility_score, 0), 100),
        "demand": min(max(demand_score, 0), 100),
        "competition": min(max(competition_score, 0), 100),
        "risk": min(max(100 - risk_score, 0), 100),  # Higher is riskier
    }

def calculate_feasibility(market_data: dict, competitor_data: dict) -> int:
    """
    Calculate feasibility score
    Based on market size, growth rate, and competitive landscape
    """
    base_score = 50
    
    # Market factors (+0 to +20)
    if "market_size" in market_data:
        base_score += 10
    
    # Growth factors (+0 to +15)
    growth = market_data.get('growth_rate', 0)
    base_score += min(growth / 2, 15)
    
    # Competition factors (+0 to +15)
    barriers = len(competitor_data.get('barriers_to_entry', []))
    base_score += min(barriers * 5, 15)
    
    return min(base_score, 100)

def calculate_demand(demand_data: dict) -> int:
    """
    Calculate market demand score
    """
    base_score = 50
    
    demand_level = demand_data.get('demand_level', '')
    demand_mapping = {
        'Very High': 35,
        'High': 25,
        'Medium': 15,
        'Low': 5
    }
    base_score += demand_mapping.get(demand_level, 10)
    
    growth_potential = demand_data.get('growth_potential', 60)
    base_score += min(growth_potential / 3, 20)
    
    return min(base_score, 100)

def calculate_competition(competitor_data: dict) -> int:
    """
    Calculate competition score (higher = more competitive)
    """
    base_score = 40
    
    competitors = competitor_data.get('competitors', [])
    avg_strength = sum(c.get('strength', 0) for c in competitors) / max(len(competitors), 1)
    
    base_score += (avg_strength / 2)
    
    return min(base_score, 100)
