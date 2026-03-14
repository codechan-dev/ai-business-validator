from typing import Any, Dict

from llm.groq_client import get_default_groq_client
from schemas.state import BusinessIdeaState


SYSTEM_PROMPT = (
    "You are a senior venture analyst. Combine market, competition, demand, and risk into a feasibility assessment."
)


def feasibility_score_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Combine previous analysis into a feasibility score and human-readable report."""
    # Heuristic baseline using numbers from previous nodes (robust to LLM failures).
    demand_score = float(state.demand_analysis.get("demand_score", 5.0)) if state.demand_analysis else 5.0
    risk_score = float(state.risk_analysis.get("risk_score", 5.0)) if state.risk_analysis else 5.0

    competition_level = (state.competitor_analysis or {}).get("competition_level", "moderate")
    if competition_level == "low":
        competition_factor = 1.0
    elif competition_level == "moderate":
        competition_factor = 0.9
    elif competition_level == "high":
        competition_factor = 0.75
    else:
        competition_factor = 0.6

    # Simple derived baseline score [0,10].
    baseline_score = max(
        0.0,
        min(10.0, (demand_score * 0.5 + (10 - risk_score) * 0.4) * competition_factor),
    )

    client = get_default_groq_client()
    user_prompt = (
        f"Business idea: {state.idea}\n"
        f"Parsed idea: {state.parsed_idea}\n"
        f"Market data: {state.market_data}\n"
        f"Competitor analysis: {state.competitor_analysis}\n"
        f"Demand analysis: {state.demand_analysis}\n"
        f"Risk analysis: {state.risk_analysis}\n\n"
        "1) Provide a Startup Feasibility Score from 0-10 (float), where 10 is extremely promising.\n"
        "2) Provide:\n"
        "   - Market Demand analysis (1-3 sentences)\n"
        "   - Competition analysis (1-3 sentences)\n"
        "   - Revenue Potential analysis (1-3 sentences)\n"
        "   - Risk Level analysis (1-3 sentences)\n"
        "   - Clear Recommendation (build / validate further / avoid, with rationale)\n\n"
        "Respond ONLY as JSON:\n"
        "{\n"
        '  \"feasibility_score\": <number>,\n'
        '  \"market_demand\": \"<text>\",\n'
        '  \"competition\": \"<text>\",\n'
        '  \"revenue_potential\": \"<text>\",\n'
        '  \"risk_level\": \"<text>\",\n'
        '  \"recommendation\": \"<text>\"\n'
        "}"
    )
    raw = client.chat(system_prompt=SYSTEM_PROMPT, user_prompt=user_prompt)

    feasibility_score = baseline_score
    sections = {
        "market_demand": "",
        "competition": "",
        "revenue_potential": "",
        "risk_level": "",
        "recommendation": "",
    }

    try:
        import json

        parsed = json.loads(raw)
        feasibility_score = float(parsed.get("feasibility_score", feasibility_score))
        for key in sections.keys():
            if key in parsed:
                sections[key] = str(parsed[key])
    except Exception:
        # Fall back to simple textual sections.
        sections["market_demand"] = (
            f"Demand appears around {demand_score:.1f}/10 based on search and community signals."
        )
        sections["competition"] = (
            f"Competition is {competition_level}; you will need clear differentiation to stand out."
        )
        sections["revenue_potential"] = (
            "Revenue potential looks reasonable for a SaaS product in a growing market, "
            "assuming strong execution and distribution."
        )
        sections["risk_level"] = (
            f"Overall risk is around {risk_score:.1f}/10; key risks include competition and execution."
        )
        sections["recommendation"] = (
            "Proceed with a lean validation sprint: run user interviews and a small MVP before scaling investment."
        )

    feasibility_score = max(0.0, min(10.0, feasibility_score))

    report = (
        f"Business Idea: {state.idea}\n\n"
        f"Market Demand: {sections['market_demand']}\n\n"
        f"Competition: {sections['competition']}\n\n"
        f"Revenue Potential: {sections['revenue_potential']}\n\n"
        f"Risk Level: {sections['risk_level']}\n\n"
        f"Feasibility Score: {feasibility_score:.1f}/10\n\n"
        f"Recommendation: {sections['recommendation']}"
    )

    return {
        "feasibility_score": feasibility_score,
        "final_report": report,
    }


__all__ = ["feasibility_score_node"]


