from typing import Any, Dict

from llm.groq_client import get_default_groq_client
from mcp_server import tools as mcp_tools
from schemas.state import BusinessIdeaState


SYSTEM_PROMPT = (
    "You are a data-driven market analyst. Interpret demand signals for startup ideas."
)


def demand_validation_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Validate demand using MCP trends plus LLM reasoning."""
    if not state.parsed_idea:
        raise ValueError("parsed_idea must be populated before running demand_validation.")

    keyword = state.parsed_idea.get("product") or state.idea

    raw_trends = mcp_tools.search_trends(keyword)
    signals_text = "\n".join(f"- {s}" for s in raw_trends.get("signals", []))

    client = get_default_groq_client()
    user_prompt = (
        f"Product keyword: {keyword}\n"
        "Signals:\n"
        f"{signals_text}\n\n"
        "1) Provide a concise trend summary (2-3 sentences).\n"
        "2) Provide a demand score from 1-10 (float allowed), where 10 is extremely strong, "
        "considering both volume and momentum of interest.\n"
        "Respond in the following JSON format only:\n"
        '{\"demand_score\": <number>, \"trend_summary\": \"<short text>\"}'
    )
    raw = client.chat(system_prompt=SYSTEM_PROMPT, user_prompt=user_prompt)

    demand_score = raw_trends.get("demand_score", 5.0)
    trend_summary = signals_text

    try:
        import json

        parsed = json.loads(raw)
        demand_score = float(parsed.get("demand_score", demand_score))
        trend_summary = parsed.get("trend_summary", trend_summary)
    except Exception:
        # Fallback to using MCP-provided score and simple textual aggregation.
        pass

    demand_analysis = {
        "keyword": keyword,
        "demand_score": demand_score,
        "trend_summary": trend_summary,
        "raw_trend_signals": raw_trends,
    }

    return {"demand_analysis": demand_analysis}


__all__ = ["demand_validation_node"]


