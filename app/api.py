from typing import Any, Dict

from fastapi import FastAPI
from pydantic import BaseModel

from graph.workflow import build_workflow


class IdeaRequest(BaseModel):
    idea: str


class ValidationResponse(BaseModel):
    idea: str
    parsed_idea: Dict[str, Any] | None = None
    market_data: Dict[str, Any] | None = None
    competitors: list[str] | None = None
    competitor_analysis: Dict[str, Any] | None = None
    demand_analysis: Dict[str, Any] | None = None
    risk_analysis: Dict[str, Any] | None = None
    feasibility_score: float | None = None
    final_report: str | None = None


app = FastAPI(title="AI Business Idea Validator Agent")
_graph = build_workflow()


@app.post("/validate", response_model=ValidationResponse)
async def validate_idea(payload: IdeaRequest) -> ValidationResponse:
    """Run the LangGraph workflow to validate a startup idea."""
    result = _graph.invoke({"idea": payload.idea})

    # result may be a dict or a pydantic model depending on LangGraph version
    if hasattr(result, "model_dump"):
        data = result.model_dump()
    elif hasattr(result, "dict"):
        data = result.dict()
    else:
        data = dict(result)

    return ValidationResponse(**data)


__all__ = ["app"]

