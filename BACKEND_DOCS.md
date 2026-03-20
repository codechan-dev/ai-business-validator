# AI Business Idea Validator - Backend Documentation

## 🔌 Backend Architecture

The backend is built with FastAPI, LangGraph, and Python for a powerful, scalable AI validation engine.

### Tech Stack
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **LangGraph** - Orchestration framework
- **Python 3.9+** - Programming language

### Project Structure

```
backend/
├── main.py                  # FastAPI application
├── schemas.py              # Pydantic request/response models
├── agents/                 # AI agents
│   ├── __init__.py
│   ├── idea_parser.py      # Parse and structure ideas
│   ├── market_research.py  # Market analysis
│   ├── competitor_analysis.py  # Competitor research
│   ├── demand_analysis.py  # Demand validation
│   ├── risk_analysis.py    # Risk assessment
│   └── scoring.py          # Scoring algorithm
├── graph/                  # LangGraph workflow
│   ├── __init__.py
│   └── langgraph_flow.py   # Main validation workflow
├── mcp_tools/              # MCP tool implementations
│   ├── __init__.py
│   ├── reddit.py           # Reddit scraper
│   ├── trends.py           # Google Trends
│   ├── product_hunt.py     # Product Hunt
│   ├── news.py             # News aggregator
│   └── startups.py         # Startup database
├── llm/                    # LLM client
│   ├── __init__.py
│   └── groq_client.py      # Groq API client
├── requirements.txt        # Python dependencies
└── .env.example           # Environment template
```

## 🧠 LangGraph Workflow

### Execution Flow
```
START
  ↓
1. idea_parser (parse_idea_node)
  ├── Extract keywords
  ├── Categorize business
  └── Prepare data
  ↓
2. market_research (market_research_node) [MCP]
  ├── Estimate market size
  ├── Identify trends
  └── Analyze position
  ↓
3. competitor_analysis (competitor_analysis_node) [MCP]
  ├── Find competitors
  ├── Analyze strengths
  └── Identify barriers
  ↓
4. demand_analysis (demand_analysis_node) [MCP]
  ├── Calculate demand level
  ├── Estimate addressable market
  └── Project growth
  ↓
5. risk_analysis (risk_analysis_node)
  ├── Identify risks
  ├── Create mitigations
  └── Score risk level
  ↓
6. scoring (scoring_node)
  ├── Calculate feasibility
  ├── Calculate demand
  ├── Calculate competition
  └── Calculate risk
  ↓
7. fetch_signals_node (Parallel MCP calls)
  ├── Reddit discussions
  ├── Google Trends
  ├── Product Hunt
  ├── News mentions
  └── Startup database
  ↓
8. generate_response
  ├── Create response object
  ├── Format analysis
  └── Return to client
  ↓
END
```

## 🤖 Agents Overview

### 1. Idea Parser (`idea_parser.py`)
**Purpose:** Structure and understand the business idea

**Functions:**
- `parse_idea(idea: str)` - Main parsing function
- `extract_keywords(idea: str)` - Extract key terms
- `categorize_idea(idea: str)` - Categorize business type

**Output:**
```python
{
    "original_idea": "...",
    "keywords": ["ai", "productivity", "remote"],
    "category": "saas",
    "status": "parsed"
}
```

### 2. Market Research (`market_research.py`)
**Purpose:** Analyze market opportunity and size

**Functions:**
- `market_research(parsed_idea)` - Main research function
- `determine_market_size(category)` - Estimate TAM
- `determine_growth_rate(category)` - Growth potential
- `identify_trends(category)` - Current trends

**Output:**
```python
{
    "market_size": "$500B",
    "growth_rate": 23,
    "trends": ["AI Integration", "..."],
    "summary": "...",
    "data_points": [...]
}
```

### 3. Competitor Analysis (`competitor_analysis.py`)
**Purpose:** Understand competitive landscape

**Functions:**
- `competitor_analysis(parsed_idea)` - Main analysis
- `find_competitors(category)` - Identify competitors
- `analyze_market_position(category)` - Market dynamics
- `identify_barriers(category)` - Barriers to entry

**Output:**
```python
{
    "competitors": [{name, market_cap, strength}, ...],
    "market_position": "...",
    "barriers_to_entry": ["..."],
    "summary": "...",
    "competitive_advantages": [...]
}
```

### 4. Demand Analysis (`demand_analysis.py`)
**Purpose:** Validate market demand for the idea

**Functions:**
- `demand_analysis(parsed_idea)` - Main analysis
- `calculate_demand_level(category)` - Demand strength
- `estimate_market_size(category)` - TAM/SAM/SOM
- `estimate_growth(category)` - Growth potential

**Output:**
```python
{
    "demand_level": "Very High",
    "target_market_size": {"tam": "...", "sam": "...", "som": "..."},
    "growth_potential": 85,
    "summary": "...",
    "demand_signals": [...]
}
```

### 5. Risk Analysis (`risk_analysis.py`)
**Purpose:** Identify and assess risks

**Functions:**
- `risk_analysis(parsed_idea, analysis_data)` - Main analysis
- `calculate_risk_level(category)` - Risk categorization
- `identify_risks(category)` - Specific risks
- `generate_mitigations(category)` - Risk strategies
- `calculate_risk_score(category)` - Risk score (0-100)

**Output:**
```python
{
    "risk_level": "Medium",
    "key_risks": ["..."],
    "mitigation_strategies": ["..."],
    "summary": "...",
    "risk_score": 45,
    "risk_factors": [...]
}
```

### 6. Scoring (`scoring.py`)
**Purpose:** Calculate final validation scores

**Functions:**
- `scoring(market, competitor, demand, risk)` - Final scores
- `calculate_feasibility(...)` - 0-100 score
- `calculate_demand(...)` - 0-100 score
- `calculate_competition(...)` - 0-100 score

**Output:**
```python
{
    "feasibility": 78,
    "demand": 85,
    "competition": 60,
    "risk": 40
}
```

## 🔗 MCP Tools

### Reddit (`mcp_tools/reddit.py`)
```python
scrape_reddit(query: str) -> List[Signal]
```
- Finds discussions about the idea
- Returns discussion titles, summaries, links
- Real-world validation signals

### Google Trends (`mcp_tools/trends.py`)
```python
get_trends(query: str) -> List[Signal]
```
- Trend data for search queries
- Growth indicators
- Related searches

### Product Hunt (`mcp_tools/product_hunt.py`)
```python
fetch_launches(query: str) -> List[Signal]
```
- Recent launches in category
- User engagement metrics
- Competitive products

### News (`mcp_tools/news.py`)
```python
fetch_news(query: str) -> List[Signal]
```
- Industry news and reports
- Market validation
- Funding announcements

### Startup Database (`mcp_tools/startups.py`)
```python
fetch_startups(query: str) -> List[Signal]
```
- Startup listings
- Funding information
- Market analysis

## 📊 API Endpoints

### POST /api/validate
**Purpose:** Complete business idea validation

**Request:**
```json
{
  "idea": "AI-powered productivity platform for remote teams"
}
```

**Response:**
```json
{
  "scores": {
    "feasibility": 78,
    "demand": 85,
    "competition": 60,
    "risk": 40
  },
  "analysis": {
    "market": "...",
    "competitors": "...",
    "risks": "...",
    "recommendation": "..."
  },
  "signals": {
    "reddit": [...],
    "trends": [...],
    "product_hunt": [...],
    "news": [...],
    "startups": [...]
  }
}
```

### GET /api/signals
**Purpose:** Fetch signals from specific source

**Parameters:**
- `source` (reddit|trends|product_hunt|news|startups)
- `query` (search query)

### GET /api/health
**Purpose:** Health check

## 🛠️ Setup Instructions

### Installation
```bash
cd backend
python -m venv venv_backend
source venv_backend/bin/activate  # or: venv\Scripts\activate
pip install -r requirements.txt
```

### Configuration
```bash
cp .env.example .env
# Edit .env with your API keys
```

### Running
```bash
uvicorn main:app --reload
```

### Production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 Data Models (Pydantic)

### ValidateRequest
```python
idea: str (required, 10-1000 chars)
```

### ValidateResponse
```python
scores: ScoresResponse
analysis: AnalysisResponse
signals: SignalsResponse
```

### ScoresResponse
```python
feasibility: int (0-100)
demand: int (0-100)
competition: int (0-100)
risk: int (0-100)
```

## 🔐 Security

- Input validation with Pydantic
- CORS enabled (adjust for production)
- Error handling and logging
- Environment variable protection
- Rate limiting ready (implement in production)

## 🧪 Testing

### Using curl
```bash
curl -X POST http://localhost:8000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"idea":"Your idea here"}'
```

### Using Python
```python
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        "http://localhost:8000/api/validate",
        json={"idea": "Your idea"}
    )
    print(response.json())
```

## 🚀 Performance Considerations

- Async/await for I/O operations
- Parallel MCP tool calls
- Response caching capability
- Database indexing for history
- Request validation before processing

## 📈 Monitoring

- Access logging
- Error tracking
- Performance metrics
- Signal quality monitoring

## 🔮 Future Enhancements

- [ ] Real Groq API integration
- [ ] Database storing for idea history
- [ ] User authentication
- [ ] Advanced caching
- [ ] Real data source integration
- [ ] Webhook support
- [ ] Batch processing
- [ ] Custom scoring rules
- [ ] Multi-language support
- [ ] Industry-specific templates

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Python async/await](https://docs.python.org/3/library/asyncio.html)

## 🤝 Contributing

1. Create feature branch
2. Follow code style
3. Add tests
4. Document changes
5. Submit PR

## 📧 Support

For issues or questions, please open a GitHub issue.
