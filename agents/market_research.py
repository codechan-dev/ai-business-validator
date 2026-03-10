from typing import Any, Dict

from mcp_server import tools as mcp_tools
from schemas.state import BusinessIdeaState


def market_research_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Fetch market size data for the parsed industry using MCP tools."""
    if not state.parsed_idea:
        raise ValueError("parsed_idea must be populated before running market_research.")

    industry = state.parsed_idea.get("industry") or "unknown"
    market_data = mcp_tools.market_size(industry)

    return {"market_data": market_data}


__all__ = ["market_research_node"]

