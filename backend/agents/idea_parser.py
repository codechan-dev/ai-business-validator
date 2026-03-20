def parse_idea(idea: str) -> dict:
    """
    Parse and structure the business idea
    """
    return {
        "original_idea": idea,
        "keywords": extract_keywords(idea),
        "category": categorize_idea(idea),
        "status": "parsed"
    }

def extract_keywords(idea: str) -> list[str]:
    """Extract key terms from idea"""
    common_words = {'a', 'an', 'the', 'and', 'or', 'but', 'for', 'to', 'is', 'in', 'on'}
    words = idea.lower().split()
    return [w for w in words if w not in common_words and len(w) > 3][:5]

def categorize_idea(idea: str) -> str:
    """Categorize the business idea"""
    categories = {
        'saas': ['software', 'platform', 'app', 'application'],
        'marketplace': ['marketplace', 'e-commerce', 'platform'],
        'healthcare': ['health', 'medical', 'wellness', 'fitness'],
        'fintech': ['finance', 'payment', 'banking', 'crypto'],
        'education': ['learning', 'education', 'course', 'training'],
    }
    
    idea_lower = idea.lower()
    for category, keywords in categories.items():
        if any(keyword in idea_lower for keyword in keywords):
            return category
    return 'general'
