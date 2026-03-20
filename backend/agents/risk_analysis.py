def risk_analysis(parsed_idea: dict, analysis_data: dict) -> dict:
    """
    Analyze risks associated with the business idea
    """
    category = parsed_idea.get('category', 'general')
    
    return {
        "risk_level": calculate_risk_level(category),
        "key_risks": identify_risks(category),
        "mitigation_strategies": generate_mitigations(category),
        "summary": f"Identified {len(identify_risks(category))} key risks. Implement mitigation strategies to reduce failure probability.",
        "risk_score": calculate_risk_score(category),
        "risk_factors": [
            {"factor": "Market Risk", "level": "Medium", "mitigation": "Conduct customer research"},
            {"factor": "Competition Risk", "level": "High", "mitigation": "Build unique features"},
            {"factor": "Execution Risk", "level": "Medium", "mitigation": "Hire strong team"},
            {"factor": "Regulatory Risk", "level": "Low", "mitigation": "Monitor regulations"},
        ]
    }

def calculate_risk_level(category: str) -> str:
    """Calculate overall risk level"""
    risk_map = {
        'saas': 'Medium',
        'marketplace': 'High',
        'healthcare': 'Very High',
        'fintech': 'Very High',
        'education': 'Low',
        'general': 'Medium'
    }
    return risk_map.get(category, risk_map['general'])

def identify_risks(category: str) -> list[str]:
    """Identify key risks"""
    risks_map = {
        'saas': [
            'Customer churn',
            'Competition from established players',
            'Technical debt',
            'Market saturation'
        ],
        'marketplace': [
            'Network effects failure',
            'Inadequate supply',
            'Quality control issues',
            'Payment/fraud risks'
        ],
        'healthcare': [
            'Regulatory compliance',
            'Liability issues',
            'Data privacy concerns',
            'Clinical validation needed'
        ],
        'fintech': [
            'Regulatory changes',
            'Security breaches',
            'Trust issues',
            'Capital requirements'
        ],
        'education': [
            'Content stagnation',
            'High instructor churn',
            'Student dropout rates',
            'Changing regulations'
        ],
        'general': [
            'Market risks',
            'Team risks',
            'Financial risks',
            'Execution risks'
        ]
    }
    return risks_map.get(category, risks_map['general'])

def generate_mitigations(category: str) -> list[str]:
    """Generate mitigation strategies"""
    mitigations_map = {
        'saas': [
            'Build strong customer support',
            'Focus on product differentiation',
            'Implement agile development',
            'Monitor technical debt'
        ],
        'marketplace': [
            'Solve chicken-and-egg problem',
            'Build trust mechanisms',
            'Implement quality standards',
            'Use fraud detection'
        ],
        'healthcare': [
            'Get regulatory approvals early',
            'Consult legal experts',
            'Implement data security',
            'Conduct clinical trials'
        ],
        'fintech': [
            'Partner with regulated entities',
            'Implement strong security',
            'Build compliance framework',
            'Start with niche market'
        ],
        'education': [
            'Create evergreen content',
            'Incentivize instructors',
            'Improve engagement',
            'Stay updated on regulations'
        ],
        'general': [
            'Validate market thoroughly',
            'Build strong team',
            'Manage cash carefully',
            'Execute swiftly'
        ]
    }
    return mitigations_map.get(category, mitigations_map['general'])

def calculate_risk_score(category: str) -> int:
    """
    Calculate risk score (0-100, where lower is better)
    """
    risk_scores = {
        'saas': 45,
        'marketplace': 60,
        'healthcare': 70,
        'fintech': 75,
        'education': 35,
        'general': 50
    }
    return risk_scores.get(category, risk_scores['general'])
