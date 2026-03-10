import json
import sys
from pathlib import Path

import requests
import streamlit as st

# Ensure project root is on sys.path so `graph` and other top-level modules are importable
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from graph.workflow import run_idea_validation


API_URL = "http://localhost:8001/validate"


def call_api(idea: str):
    """Call the FastAPI backend, falling back to in-process execution if unavailable."""
    try:
        response = requests.post(API_URL, json={"idea": idea}, timeout=20)
        if response.status_code == 200:
            return response.json()
    except Exception:
        pass

    # Fallback: run the graph directly in-process.
    return run_idea_validation(idea)


def main() -> None:
    st.set_page_config(
        page_title="AI Business Idea Validator Agent",
        page_icon="📊",
        layout="wide",
    )

    st.title("AI Business Idea Validator Agent")
    st.markdown(
        "Validate startup ideas using a multi-step LangGraph workflow, MCP tools, and a Groq LLM."
    )

    idea = st.text_area(
        "Enter your startup idea",
        placeholder="Example: Build an AI tool that automatically applies to jobs on LinkedIn.",
        height=140,
    )

    if st.button("Validate Idea", type="primary") and idea.strip():
        with st.spinner("Analyzing idea with AI agents..."):
            result = call_api(idea.strip())

        if not result:
            st.error("No result returned from validator.")
            return

        # High-level KPI-style cards
        kpi_col1, kpi_col2, kpi_col3 = st.columns(3)
        demand_score = (result.get("demand_analysis") or {}).get("demand_score")
        risk_score = (result.get("risk_analysis") or {}).get("risk_score")
        feasibility_score = result.get("feasibility_score")

        with kpi_col1:
            if demand_score is not None:
                st.metric("Market Demand", f"{float(demand_score):.1f}/10")
        with kpi_col2:
            if risk_score is not None:
                st.metric("Risk Level", f"{float(risk_score):.1f}/10")
        with kpi_col3:
            if feasibility_score is not None:
                st.metric("Feasibility Score", f"{float(feasibility_score):.1f}/10")

        st.markdown("---")

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Market & Demand")
            market = result.get("market_data") or {}
            if market and market.get("industry") != "unknown":
                st.markdown(
                    f"**Industry:** {market.get('industry', '—')}  \n"
                    f"**Market size:** {market.get('market_size', '—')}  \n"
                    f"**Growth rate:** {market.get('growth_rate', '—')}"
                )
            else:
                st.markdown("Market data is not yet available for this idea.")

            if result.get("demand_analysis"):
                st.markdown("**Demand insights**")
                st.write(result["demand_analysis"].get("trend_summary", ""))

        with col2:
            st.subheader("Competition & Risk")
            competitors = result.get("competitors") or []
            if competitors:
                st.markdown("**Competitors**")
                st.write(", ".join(competitors))

            if result.get("competitor_analysis"):
                st.markdown("**Competitive landscape**")
                st.write(result["competitor_analysis"].get("competition_summary", ""))

            if result.get("risk_analysis"):
                st.markdown("**Risk assessment**")
                st.write(result["risk_analysis"].get("risk_summary", ""))

        st.markdown("---")

        st.subheader("Full Feasibility Report")
        st.markdown(result.get("final_report") or "")

        with st.expander("Raw JSON (advanced)"):
            st.code(json.dumps(result, indent=2), language="json")


if __name__ == "__main__":
    main()

