from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class BusinessIdeaState(BaseModel):
    """Typed state used throughout the LangGraph workflow."""

    idea: str = Field(..., description="Original business idea provided by the user.")

    parsed_idea: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Structured representation of the idea (product, target_users, industry, business_model).",
    )

    market_data: Optional[Dict[str, Any]] = Field(
        default=None, description="Market research data such as market size and growth rate."
    )

    competitors: Optional[List[str]] = Field(
        default=None, description="List of discovered competitors for the idea."
    )

    competitor_analysis: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Summary of competition landscape, including competition_level and competitor_list.",
    )

    demand_analysis: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Demand validation information including demand_score and trend_summary.",
    )

    risk_analysis: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Risk evaluation including risk_score and risk_summary.",
    )

    feasibility_score: Optional[float] = Field(
        default=None,
        description="Overall startup feasibility score between 0 and 10.",
    )

    final_report: Optional[str] = Field(
        default=None,
        description="Human-readable feasibility report generated at the end of the workflow.",
    )


__all__ = ["BusinessIdeaState"]

