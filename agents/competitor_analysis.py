from typing import Any, Dict, List

from llm.groq_client import get_default_groq_client
from mcp_server import tools as mcp_tools
from schemas.state import BusinessIdeaState


SYSTEM_PROMPT = (
    "You are an expert startup strategist. Summarize competition in a concise, analytic way."
)


def _summarize_competition(product: str, competitors: List[str]) -> Dict[str, Any]:
    client = get_default_groq_client()
    competitors_str = ", ".join(competitors)
    user_prompt = (
        f"Product: {product}\n"
        f"Competitors: {competitors_str}\n\n"
        "In 2-3 sentences, briefly describe the competitive landscape for this product, "
        "including how crowded the space is and any notable differentiation opportunities."
    )
    summary = client.chat(system_prompt=SYSTEM_PROMPT, user_prompt=user_prompt)

    # Simple heuristic for competition level.
    num_competitors = len(competitors)
    if num_competitors <= 1:
        level = "low"
    elif num_competitors <= 3:
        level = "moderate"
    elif num_competitors <= 6:
        level = "high"
    else:
        level = "very high"

    return {
        "competition_level": level,
        "competitor_list": competitors,
        "competition_summary": summary.strip(),
    }


def competitor_analysis_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Discover competitors using MCP tools and summarize the landscape with the LLM."""
    if not state.parsed_idea:
        raise ValueError("parsed_idea must be populated before running competitor_analysis.")

    product = state.parsed_idea.get("product") or state.idea
    competitors = mcp_tools.find_competitors(product)

    analysis = _summarize_competition(product, competitors)

    return {
        "competitors": competitors,
        "competitor_analysis": analysis,
    }


__all__ = ["competitor_analysis_node"]


