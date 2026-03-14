from typing import Dict, Any

from langgraph.graph import END, StateGraph

from agents.idea_parser import idea_parser_node
from agents.market_research import market_research_node
from agents.competitor_analysis import competitor_analysis_node
from agents.demand_validation import demand_validation_node
from agents.risk_analysis import risk_analysis_node
from agents.feasibility_score import feasibility_score_node
from schemas.state import BusinessIdeaState


def build_workflow() -> Any:
    """Build and compile the LangGraph workflow for business idea validation."""
    graph = StateGraph(BusinessIdeaState)

    graph.add_node("idea_parser", idea_parser_node)
    graph.add_node("market_research", market_research_node)
    graph.add_node("competitor_analysis", competitor_analysis_node)
    graph.add_node("demand_validation", demand_validation_node)
    graph.add_node("risk_analysis", risk_analysis_node)
    graph.add_node("feasibility_score", feasibility_score_node)

    graph.set_entry_point("idea_parser")

    graph.add_edge("idea_parser", "market_research")
    graph.add_edge("market_research", "competitor_analysis")
    graph.add_edge("competitor_analysis", "demand_validation")
    graph.add_edge("demand_validation", "risk_analysis")
    graph.add_edge("risk_analysis", "feasibility_score")
    graph.add_edge("feasibility_score", END)

    return graph.compile()


def run_idea_validation(idea: str) -> Dict[str, Any]:
    """Helper for running the full workflow in one call."""
    workflow = build_workflow()
    initial_state = BusinessIdeaState(idea=idea)
    result = workflow.invoke(initial_state)
    # LangGraph may return BaseModel; convert to dict for external callers.
    if isinstance(result, BusinessIdeaState):
        return result.model_dump()
    if hasattr(result, "dict"):
        return result.dict()
    return dict(result)


__all__ = ["build_workflow", "run_idea_validation"]

