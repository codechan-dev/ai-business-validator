# Real-Time Data Integration Guide

## Overview

The MCP tools now fetch **real-time data** from public APIs instead of returning mocked data. The system gracefully falls back to mocked data if APIs are unavailable.

## Data Sources

### 1. Market Size Analysis (`market_size`)
- **Primary Source**: Wikipedia API
- **Data Extracted**: Industry overviews, market context, growth indicators
- **How It Works**: 
  - Fetches Wikipedia article for the industry
  - Extracts market size mentions using regex patterns
  - Infers growth rate from content sentiment
  - Returns: `{"market_size": "$XXB", "growth_rate": "X% CAGR"}`
- **Fallback**: Mocked data for common industries

**Example:**
```python
from mcp_server import tools
result = tools.market_size("fintech")
# Returns: {
#   "industry": "fintech",
#   "market_size": "Market size data unavailable",
#   "growth_rate": "8-12% CAGR",
#   "source": "Wikipedia + industry analysis"
# }
```

### 2. Competitor Discovery (`find_competitors`)
- **Primary Source**: Keyword-based competitor mapping
- **Secondary Source**: DuckDuckGo (with fallback to curated database)
- **How It Works**:
  - Matches product against known competitor keywords
  - Returns companies in the same market space
  - Uses curated startup database for accuracy
- **Fallback**: Predefined competitor lists for common markets

**Example:**
```python
result = tools.find_competitors("AI job application automation")
# Returns: ["LazyApply", "Teal", "Simplify", "ApplyBuddy", "Jobvite"]
```

### 3. Search Trends (`search_trends`)
- **Primary Source**: Google Trends via `pytrends` library
- **Secondary Source**: Wikipedia content analysis (keyword frequency, sentiment)
- **How It Works**:
  - Fetches 12-month Google search interest data
  - Calculates trend velocity (growth/decline %)
  - Analyzes related queries
  - Scores demand on 1-10 scale based on interest level + trend
- **Fallback**: Wikipedia-based or estimated scoring

**Example:**
```python
result = tools.search_trends("AI hiring automation")
# Returns: {
#   "keyword": "AI hiring automation",
#   "demand_score": 7.8,
#   "signals": [
#     "📈 Growing interest: 15.3% increase in searches",
#     "Related searches: AI recruitment, hiring automation, ..."
#   ],
#   "trend_velocity_percent": 15.3,
#   "source": "Google Trends (Real)"
# }
```

### 4. Startup Lookup (`startup_lookup`)
- **Primary Source**: Curated startup database
- **Secondary Source**: Wikipedia + industry research
- **How It Works**:
  - Maps category to known startups by industry
  - Returns sorted list of notable companies
  - Includes count and source attribution
- **Coverage**: recruitment, fintech, healthtech, AI, SaaS

**Example:**
```python
result = tools.startup_lookup("recruitment technology")
# Returns: {
#   "category": "recruitment technology",
#   "startups": ["Eightfold.ai", "Greenhouse", "Hired", "Lever", ...],
#   "count": 7,
#   "source": "Curated startup database + Wikipedia"
# }
```

## Caching Strategy

All API responses are cached for **15 minutes** using `cachetools.TTLCache`:
- Reduces API calls and respects rate limits
- Improves response times for repeated queries
- Automatically expires stale data

```python
# Cache is automatically managed
# Same keyword within 15 min returns cached result
trends1 = tools.search_trends("AI hiring")  # Calls API
trends2 = tools.search_trends("AI hiring")  # Returns cached
```

## Error Handling & Fallbacks

The system implements **graceful degradation**:

1. **Try Real API** → If successful, return real data
2. **Try Secondary Method** → Use alternative source if primary fails
3. **Use Fallback Mock** → Return mocked data with source attribution
4. **Provide Signal** → Each result includes `"source"` field indicating data origin

Examples of sources:
- `"source": "Google Trends (Real)"` → Real API succeeded
- `"source": "Wikipedia Analysis (Real)"` → Real but from alt source
- `"source": "Estimated"` → All real APIs failed
- `"source": "Mocked data (real API unavailable)"` → Complete fallback

## Dependencies

The real-time integration requires:

```
pytrends>=4.9.2          # Google Trends
wikipedia>=1.4.0         # Wikipedia API
beautifulsoup4>=4.12.0   # HTML parsing (future use)
requests>=2.31.0         # HTTP requests
cachetools>=5.3.0        # Response caching
```

These are already in `requirements.txt`.

## Configuration

No additional configuration needed! The system:
- ✅ Works with no API keys required
- ✅ Uses only free public APIs
- ✅ Handles rate limiting gracefully
- ✅ Respects API Terms of Service

## Testing

Run the included test scripts:

```bash
# Test individual tools
python test_real_data.py

# Test full workflow integration
python test_workflow.py
```

## Future Enhancements

To add more advanced data sources:

1. **SerpAPI** (requires API key): Better search results
   ```python
   # Install: pip install google-search-results
   from serpapi import GoogleSearch
   ```

2. **Crunchbase** (freemium): Startup funding data
   ```python
   # Register at: https://www.crunchbase.com/api
   ```

3. **NewsAPI**: Real-time news for trend signals
   ```python
   # pip install newsapi
   ```

4. **Twitter/X API**: Social media trend analysis
   ```python
   # Install: pip install tweepy
   ```

5. **GitHub API**: Open-source project trends
   ```python
   # pip install PyGithub
   ```

## Troubleshooting

**Q: Google Trends returns error 400?**
A: Google blocks automated requests sometimes. The system falls back to Wikipedia analysis automatically. Wait 24 hours before retrying.

**Q: Competitors list seems generic?**
A: Current implementation uses keyword matching. To improve, integrate SerpAPI or build a custom database of your target industries.

**Q: Market size shows "N/A"?**
A: Wikipedia may not have the specific market size. Consider adding industry reports API or Statista integration.

**Q: No real data being fetched?**
A: Check that libraries are installed: `pip install -r requirements.txt`. Check network connectivity. Verify API endpoints are accessible.

## Data Attribution

All data sources used in this system are free and publicly available:
- Google Trends (Google) - freely accessible
- Wikipedia (Wikimedia Foundation) - CC-BY-SA licensed
- DuckDuckGo (DuckDuckGo Inc.) - respects privacy
- Curated startup database - internally maintained

Remember to check each API's Terms of Service before using in production.
