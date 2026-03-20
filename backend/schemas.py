from typing import Optional
from pydantic import BaseModel, Field

class ValidateRequest(BaseModel):
    """Request model for idea validation"""
    idea: str = Field(..., min_length=10, max_length=1000)

class ScoresResponse(BaseModel):
    """Response model for validation scores"""
    feasibility: int = Field(..., ge=0, le=100)
    demand: int = Field(..., ge=0, le=100)
    competition: int = Field(..., ge=0, le=100)
    risk: int = Field(..., ge=0, le=100)

class SignalResponse(BaseModel):
    """Individual signal item"""
    title: str
    summary: str
    link: Optional[str] = None
    source: Optional[str] = None

class AnalysisResponse(BaseModel):
    """Detailed analysis"""
    market: str
    competitors: str
    risks: str
    recommendation: str

class SignalsResponse(BaseModel):
    """All signals from different sources"""
    reddit: list[SignalResponse] = []
    trends: list[SignalResponse] = []
    product_hunt: list[SignalResponse] = []
    news: list[SignalResponse] = []
    startups: list[SignalResponse] = []

class ValidateResponse(BaseModel):
    """Complete validation response"""
    scores: ScoresResponse
    analysis: AnalysisResponse
    signals: SignalsResponse
