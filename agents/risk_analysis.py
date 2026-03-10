from typing import Any, Dict

from llm.groq_client import get_default_groq_client
from schemas.state import BusinessIdeaState


SYSTEM_PROMPT = (
    "You are a pragmatic startup risk analyst. Evaluate risks concisely and quantitatively."
)


def risk_analysis_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Perform LLM-based risk analysis based on previous steps."""
    client = get_default_groq_client()

    user_prompt = (
        f"Business idea: {state.idea}\n"
        f"Parsed idea: {state.parsed_idea}\n"
        f"Market data: {state.market_data}\n"
        f"Competitor analysis: {state.competitor_analysis}\n"
        f"Demand analysis: {state.demand_analysis}\n\n"
        "Consider risks in the following categories:\n"
        "- Platform restrictions and dependency risk\n"
        "- Legal / regulatory risk\n"
        "- Competitive risk\n"
        "- Technical execution risk\n\n"
        "1) Provide a short risk summary (3-5 bullet-style sentences).\n"
        "2) Provide an overall risk score from 1-10 (10 = extremely risky).\n"
        "Respond ONLY as JSON:\n"
        '{\"risk_score\": <number>, \"risk_summary\": \"<short text>\"}'
    )
    raw = client.chat(system_prompt=SYSTEM_PROMPT, user_prompt=user_prompt)

    risk_score = 5.0
    risk_summary = "Risk profile could not be parsed; treat as moderate risk and investigate manually."

    try:
        import json

        parsed = json.loads(raw)
        risk_score = float(parsed.get("risk_score", risk_score))
        risk_summary = parsed.get("risk_summary", risk_summary)
    except Exception:
        pass

    return {
        "risk_analysis": {
            "risk_score": risk_score,
            "risk_summary": risk_summary,
        }
    }


__all__ = ["risk_analysis_node"]


