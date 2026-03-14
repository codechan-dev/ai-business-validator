# Quick Start: Real-Time MCP Data

## Installation (One-Time)
```bash
cd ai-business-validator
pip install -r requirements.txt
```

## Running the Full System

### Terminal 1: FastAPI Backend
```bash
python -m app.main
# Server runs on http://localhost:8001
```

### Terminal 2: Streamlit UI  
```bash
streamlit run ui/streamlit_app.py
# Open http://localhost:8501 in browser
```

### Optional Terminal 3: MCP Server
```bash
python -m mcp_server.server
# Starts MCP server for external clients
```

## Testing

### Quick Tool Test
```python
from mcp_server import tools

# Test market data
print(tools.market_size("fintech"))

# Test competitors  
print(tools.find_competitors("AI hiring"))

# Test trends
print(tools.search_trends("machine learning"))

# Test startups
print(tools.startup_lookup("recruitment"))
```

### Full Workflow Test
```python
from graph.workflow import run_idea_validation

result = run_idea_validation("Build an AI job application tool")
print(f"Feasibility: {result['feasibility_score']}/10")
print(f"Market: {result['market_data']['market_size']}")
print(f"Competitors: {result['competitors']}")
print(f"Demand: {result['demand_analysis']['demand_score']}/10")
```

## Data Sources Used

| Tool | API | Status |
|------|-----|--------|
| `market_size()` | Wikipedia | ✅ Active |
| `find_competitors()` | Curated DB | ✅ Active |
| `search_trends()` | Google Trends | ✅ Fallback to Wikipedia |
| `startup_lookup()` | Curated DB | ✅ Active |

All APIs are **free** and **no API keys required**.

## Response Format

Each tool now includes a `source` field:

```json
{
  "keyword": "AI hiring",
  "demand_score": 7.5,
  "signals": ["...", "..."],
  "source": "Google Trends (Real)"  ← Shows data origin
}
```

Possible sources:
- `"Google Trends (Real)"` - Real API call succeeded
- `"Wikipedia Analysis (Real)"` - Real but from alternative source  
- `"Estimated"` - Real APIs failed, using estimation
- `"Mocked data"` - Fallback (uncommon with free APIs)

## Caching

Responses are cached for **15 minutes**:
- First call → Fetches from API
- Same query within 15 min → Returns cached result
- After 15 min → Refreshes from API

## Troubleshooting

**Google Trends gives 400 error?**
- System auto-falls back to Wikipedia analysis
- Retry after 24 hours

**Want better competitor data?**
- See `REAL_TIME_DATA_GUIDE.md` for SerpAPI integration

**Want more startup data?**
- See `REAL_TIME_DATA_GUIDE.md` for Crunchbase integration

**Need market data for specific industry?**
- Wikipedia usually has industry overviews
- If not found, check `REAL_TIME_DATA_GUIDE.md` for Statista integration

## Environment Setup

The `.env` file should contain:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

That's it! All other APIs are free and require no keys.

## Documentation

- **Full Details**: See `REAL_TIME_DATA_GUIDE.md`
- **Architecture**: See `README.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`

---

**All ready to go!** Run the three terminals above and you have a fully functional real-time business validator. 🚀
