"""
LangGraph workflow for business idea validation
"""
from typing import Any, Dict
from backend.agents.idea_parser import parse_idea
from backend.agents.market_research import market_research
from backend.agents.competitor_analysis import competitor_analysis
from backend.agents.demand_analysis import demand_analysis
from backend.agents.risk_analysis import risk_analysis
from backend.agents.scoring import scoring
from backend.mcp_tools import reddit, trends, product_hunt, news, startups
from backend.schemas import ValidateResponse, ScoresResponse, AnalysisResponse, SignalsResponse

class ValidationWorkflow:
    """
    MultiStep workflow for validating business ideas
    """
    
    def __init__(self):
        self.state = {}
    
    def execute(self, idea: str) -> ValidateResponse:
        """
        Execute the complete validation workflow
        """
        try:
            # Step 1: Parse Idea
            parsed_idea = self.parse_idea_node(idea)
            
            # Step 2: Market Research
            market_data = self.market_research_node(parsed_idea)
            
            # Step 3: Competitor Analysis
            competitor_data = self.competitor_analysis_node(parsed_idea)
            
            # Step 4: Demand Analysis
            demand_data = self.demand_analysis_node(parsed_idea)
            
            # Step 5: Risk Analysis
            risk_data = self.risk_analysis_node(parsed_idea, {
                'market': market_data,
                'competitors': competitor_data,
                'demand': demand_data
            })
            
            # Step 6: Scoring
            scores_dict = self.scoring_node(market_data, competitor_data, demand_data, risk_data)
            
            # Step 7: Fetch Signals from MCP tools
            signals = self.fetch_signals_node(idea)
            
            # Generate final response
            return self.generate_response(scores_dict, market_data, competitor_data, risk_data, signals)
        
        except Exception as e:
            print(f"Error in validation workflow: {e}")
            raise
    
    def parse_idea_node(self, idea: str) -> Dict[str, Any]:
        """Node: Parse and structure the idea"""
        return parse_idea(idea)
    
    def market_research_node(self, parsed_idea: Dict[str, Any]) -> Dict[str, Any]:
        """Node: Conduct market research"""
        return market_research(parsed_idea)
    
    def competitor_analysis_node(self, parsed_idea: Dict[str, Any]) -> Dict[str, Any]:
        """Node: Analyze competitors"""
        return competitor_analysis(parsed_idea)
    
    def demand_analysis_node(self, parsed_idea: Dict[str, Any]) -> Dict[str, Any]:
        """Node: Analyze market demand"""
        return demand_analysis(parsed_idea)
    
    def risk_analysis_node(self, parsed_idea: Dict[str, Any], analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """Node: Analyze risks"""
        return risk_analysis(parsed_idea, analysis_data)
    
    def scoring_node(self, market_data: Dict[str, Any], competitor_data: Dict[str, Any],
                     demand_data: Dict[str, Any], risk_data: Dict[str, Any]) -> Dict[str, int]:
        """Node: Calculate scores"""
        return scoring(market_data, competitor_data, demand_data, risk_data)
    
    def fetch_signals_node(self, idea: str) -> Dict[str, Any]:
        """Node: Fetch real-time signals from MCP tools"""
        keywords = idea.split()[:3]
        query = ' '.join(keywords)
        
        return {
            'reddit': reddit.scrape_reddit(query),
            'trends': trends.get_trends(query),
            'product_hunt': product_hunt.fetch_launches(query),
            'news': news.fetch_news(query),
            'startups': startups.fetch_startups(query),
        }
    
    def generate_response(self, scores: Dict[str, int], market_data: Dict[str, Any], 
                         competitor_data: Dict[str, Any], risk_data: Dict[str, Any],
                         signals: Dict[str, Any]) -> ValidateResponse:
        """Generate the final response"""
        
        scores_response = ScoresResponse(**scores)
        
        analysis_response = AnalysisResponse(
            market=market_data.get('summary', 'Market analysis completed'),
            competitors=competitor_data.get('summary', 'Competitor analysis completed'),
            risks=risk_data.get('summary', 'Risk analysis completed'),
            recommendation=self.generate_recommendation(scores, market_data, risk_data)
        )
        
        signals_response = SignalsResponse(
            reddit=signals.get('reddit', []),
            trends=signals.get('trends', []),
            product_hunt=signals.get('product_hunt', []),
            news=signals.get('news', []),
            startups=signals.get('startups', []),
        )
        
        return ValidateResponse(
            scores=scores_response,
            analysis=analysis_response,
            signals=signals_response
        )
    
    def generate_recommendation(self, scores: Dict[str, int], market_data: Dict[str, Any],
                               risk_data: Dict[str, Any]) -> str:
        """Generate AI recommendation based on analysis"""
        feasibility = scores.get('feasibility', 0)
        demand = scores.get('demand', 0)
        competition = scores.get('competition', 0)
        risk = scores.get('risk', 0)
        
        recommendation = f"""
Based on comprehensive analysis:

📊 SCORES:
- Feasibility: {feasibility}/100 - {'Strong' if feasibility > 70 else 'Moderate' if feasibility > 50 else 'Needs improvement'}
- Market Demand: {demand}/100 - {'Very High' if demand > 80 else 'High' if demand > 60 else 'Moderate'}
- Competition: {competition}/100 - {'Highly Competitive' if competition > 70 else 'Moderate Competition' if competition > 50 else 'Low Competition'}
- Risk Level: {100-risk}/100 - {'High Risk' if risk > 70 else 'Moderate Risk' if risk > 50 else 'Low Risk'}

💡 KEY INSIGHTS:
{market_data.get('summary', '')}

🎯 OVERALL VERDICT:
{'✅ STRONG POTENTIAL' if feasibility > 70 and demand > 70 and risk < 50 else '⚠️ MODERATE POTENTIAL' if feasibility > 50 and demand > 50 else '❌ HIGH RISK'}

📈 NEXT STEPS:
1. Validate assumptions with customer interviews
2. Build MVP focusing on key differentiation
3. Plan go-to-market strategy
4. Mitigate identified risks
5. Monitor market trends continuously
        """
        
        return recommendation.strip()


def validate_business_idea(idea: str) -> Dict[str, Any]:
    """Public API to validate a business idea"""
    workflow = ValidationWorkflow()
    result = workflow.execute(idea)
    return result.model_dump()
