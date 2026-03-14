<<<<<<< HEAD
## AI Business Idea Validator Agent

AI Business Idea Validator Agent is a production-style Python project that uses **LangGraph**, **LangChain**, **Groq LLM**, **FastAPI**, **Streamlit**, and an **MCP (Model Context Protocol) server** to analyze startup ideas and generate structured feasibility reports.

The system validates startup ideas through a multi-step LangGraph workflow that parses the idea, performs **real-time market research** via free public APIs, analyzes competitors, validates demand, evaluates risk, and produces a final feasibility score and recommendation.

---

### 🚀 What's New: Real-Time Data Integration

The MCP tools now fetch **real-time data** from public APIs:
- **Market Size**: Wikipedia API for industry analysis
- **Competitors**: Curated database + keyword matching
- **Search Trends**: Google Trends (pytrends) + Wikipedia content analysis
- **Startups**: Curated startup database by category

See [REAL_TIME_DATA_GUIDE.md](REAL_TIME_DATA_GUIDE.md) for detailed documentation.

---

### Folder structure

- **app/**
  - `main.py` – FastAPI server entrypoint.
  - `api.py` – FastAPI app and `/validate` endpoint.
- **agents/**
  - `idea_parser.py` – LLM-based idea parser node.
  - `market_research.py` – Market research node using real-time APIs.
  - `competitor_analysis.py` – Competitor analysis node using real-time data + LLM.
  - `demand_validation.py` – Demand validation node using real-time trends.
  - `risk_analysis.py` – Risk analysis node using LLM reasoning.
  - `feasibility_score.py` – Final feasibility scoring and report generation node.
- **graph/**
  - `workflow.py` – LangGraph `StateGraph` workflow definition and helper runner.
- **mcp_server/**
  - `server.py` – MCP server exposing business analysis tools.
  - `tools.py` – Tool implementations with real-time data fetching.
  - `real_data.py` – Real-time API integrations (Wikipedia, Google Trends, etc.).
- **llm/**
  - `groq_client.py` – Reusable Groq LLM client wrapper.
- **schemas/**
  - `state.py` – Typed LangGraph state model.
- **ui/**
  - `streamlit_app.py` – Streamlit dashboard for running validations.
- `.env` – Environment variables (e.g. `GROQ_API_KEY`).
- `requirements.txt` – Python dependencies.
- `REAL_TIME_DATA_GUIDE.md` – Detailed guide on real-time data sources.

---

### Prerequisites

- Python **3.11+**
- A Groq API key with access to `llama3-70b-8192` or compatible model.
- Internet connection for real-time API calls (Wikipedia, Google Trends)

---

### Installation

```bash
cd ai-business-validator
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create and populate `.env`:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

---

### Running the MCP server

The MCP server exposes business analysis tools powered by **real-time APIs**:

- `market_size(industry)` → Wikipedia-based market analysis
- `find_competitors(product)` → Curated competitor discovery
- `search_trends(keyword)` → Google Trends demand scoring
- `startup_lookup(category)` → Startup database lookup

Run the MCP server:

```bash
cd ai-business-validator
python -m mcp_server.server
```

This starts an MCP server named `ai-business-validator-mcp` that can be consumed by MCP-compatible clients. The tools use real-time APIs with graceful fallbacks to mocked data if APIs are unavailable.

---

### Running the FastAPI API server

The FastAPI app exposes a single main endpoint:

- **POST** `/validate`

**Request body:**

```json
{
  "idea": "Build an AI tool that automatically applies to jobs on LinkedIn."
}
```

**Response body (example):**

```json
{
  "idea": "Build an AI tool that automatically applies to jobs on LinkedIn.",
  "parsed_idea": {
    "product": "AI job application automation",
    "target_users": "job seekers",
    "industry": "recruitment technology",
    "business_model": "SaaS"
  },
  "market_data": {
    "industry": "recruitment technology",
    "market_size": "$34B",
    "growth_rate": "9% CAGR",
    "source": "Wikipedia + industry analysis"
  },
  "competitors": ["LazyApply", "Teal HQ", "Simplify"],
  "competitor_analysis": {
    "competition_level": "high",
    "competitor_list": ["LazyApply", "Teal HQ", "Simplify"],
    "competition_summary": "..."
  },
  "demand_analysis": {
    "keyword": "AI job application automation",
    "demand_score": 8.5,
    "trend_summary": "...",
    "source": "Google Trends (Real)"
  },
  "risk_analysis": {
    "risk_score": 6.0,
    "risk_summary": "..."
  },
  "feasibility_score": 7.4,
  "final_report": "Business Idea: ...\n\nMarket Demand: ...\n..."
}
```

Run the API server:

```bash
cd ai-business-validator
python -m app.main
```

The server will start on `http://localhost:8001`.

---

### Running the Streamlit UI

The Streamlit dashboard lets you submit startup ideas and visualize the analysis.

Run:

```bash
cd ai-business-validator
streamlit run ui/streamlit_app.py
```

By default, the UI attempts to call `http://localhost:8001/validate`. If the API is not available, it falls back to running the LangGraph workflow directly in-process.

Features:

- Text area input for your startup idea.
- Market research section (market size and growth).
- Competitor list and competition summary.
- Demand validation with demand score and trend summary.
- Risk analysis with risk score and narrative.
- Final feasibility score and a structured, human-readable report.

---

### Example usage (end-to-end)

1. Ensure your `.env` is configured with a valid `GROQ_API_KEY`.
2. (Optional) Run the MCP server:
   ```bash
   python -m mcp_server.server
   ```
3. Start the FastAPI backend:
   ```bash
   python -m app.main
   ```
4. Start the Streamlit UI:
   ```bash
   streamlit run ui/streamlit_app.py
   ```
5. Open the Streamlit URL (usually `http://localhost:8501`), enter a startup idea such as:
   > Build an AI tool that automatically applies to jobs on LinkedIn.
6. Click **Validate Idea** to see the full feasibility report with real-time market data.

---

### Real-Time Data Features

✅ **Market Data**: Fetches from Wikipedia with automatic growth rate inference  
✅ **Competitors**: Curated database with keyword-based matching  
✅ **Search Trends**: Google Trends 12-month analysis with trend velocity  
✅ **Startups**: Industry-mapped startup database  
✅ **Caching**: 15-minute TTL to reduce API calls  
✅ **Fallbacks**: Graceful degradation if APIs unavailable  
✅ **No API Keys**: Uses only free public APIs

See [REAL_TIME_DATA_GUIDE.md](REAL_TIME_DATA_GUIDE.md) for full details.

---

### Implementation notes

- The workflow is implemented with `StateGraph` from LangGraph using the typed `BusinessIdeaState` model.
- LLM calls are made through a reusable Groq client wrapper in `llm/groq_client.py`.
- Real-time data is fetched via `mcp_server/real_data.py` with smart fallbacks to mocked data.
- The MCP tools provide both real-time and mocked data based on API availability.
- LangChain is used to manage prompts for the LLM nodes, while LangGraph orchestrates the multi-step reasoning and state propagation.

=======
## AI Business Idea Validator Agent

AI Business Idea Validator Agent is a production-style Python project that uses **LangGraph**, **LangChain**, **Groq LLM**, **FastAPI**, **Streamlit**, and an **MCP (Model Context Protocol) server** to analyze startup ideas and generate structured feasibility reports.

The system validates startup ideas through a multi-step LangGraph workflow that parses the idea, performs market research via MCP tools, analyzes competitors, validates demand, evaluates risk, and produces a final feasibility score and recommendation.

---

### Folder structure

- **app/**
  - `main.py` – FastAPI server entrypoint.
  - `api.py` – FastAPI app and `/validate` endpoint.
- **agents/**
  - `idea_parser.py` – LLM-based idea parser node.
  - `market_research.py` – Market research node using MCP tools.
  - `competitor_analysis.py` – Competitor analysis node using MCP tools + LLM.
  - `demand_validation.py` – Demand validation node using MCP tools + LLM.
  - `risk_analysis.py` – Risk analysis node using LLM reasoning.
  - `feasibility_score.py` – Final feasibility scoring and report generation node.
- **graph/**
  - `workflow.py` – LangGraph `StateGraph` workflow definition and helper runner.
- **mcp_server/**
  - `server.py` – MCP server exposing business analysis tools.
  - `tools.py` – Tool implementations (mock data).
- **llm/**
  - `groq_client.py` – Reusable Groq LLM client wrapper.
- **schemas/**
  - `state.py` – Typed LangGraph state model.
- **ui/**
  - `streamlit_app.py` – Streamlit dashboard for running validations.
- `.env` – Environment variables (e.g. `GROQ_API_KEY`).
- `requirements.txt` – Python dependencies.

---

### Prerequisites

- Python **3.11**
- A Groq API key with access to `llama3-70b-8192` (or compatible) model.

---

### Installation

```bash
cd ai-business-validator
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create and populate `.env`:

```bash
cp .env .env.local  # or edit .env directly
```

Set:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

---

### Running the MCP server

The MCP server exposes the following tools:

- `market_size(industry)`
- `find_competitors(product)`
- `search_trends(keyword)`
- `startup_lookup(category)`

These tools currently return mocked but structured data and can be swapped out later for real APIs or databases.

Run the MCP server:

```bash
cd ai-business-validator
python -m mcp_server.server
```

This starts an MCP server named `ai-business-validator-mcp` that can be consumed by MCP-compatible clients. Inside the main application, the same logic is reused directly via `mcp_server.tools` for simplicity.

---

### Running the FastAPI API server

The FastAPI app exposes a single main endpoint:

- **POST** `/validate`

**Request body:**

```json
{
  "idea": "Build an AI tool that automatically applies to jobs on LinkedIn."
}
```

**Response body (example shape):**

```json
{
  "idea": "Build an AI tool that automatically applies to jobs on LinkedIn.",
  "parsed_idea": {
    "product": "AI job application automation",
    "target_users": "job seekers",
    "industry": "recruitment technology",
    "business_model": "SaaS"
  },
  "market_data": {
    "industry": "recruitment technology",
    "market_size": "$34B",
    "growth_rate": "9% CAGR"
  },
  "competitors": ["LazyApply", "Teal HQ", "Simplify"],
  "competitor_analysis": {
    "competition_level": "high",
    "competitor_list": ["LazyApply", "Teal HQ", "Simplify"],
    "competition_summary": "..."
  },
  "demand_analysis": {
    "keyword": "AI job application automation",
    "demand_score": 8.5,
    "trend_summary": "...",
    "raw_trend_signals": { "...": "..." }
  },
  "risk_analysis": {
    "risk_score": 6.0,
    "risk_summary": "..."
  },
  "feasibility_score": 7.4,
  "final_report": "Business Idea: ...\n\nMarket Demand: ...\n..."
}
```

Run the API server:

```bash
cd ai-business-validator
python -m app.main
```

The server will start on `http://localhost:8000`.

---

### Running the Streamlit UI

The Streamlit dashboard lets you submit startup ideas and visualize the analysis.

Run:

```bash
cd ai-business-validator
streamlit run ui/streamlit_app.py
```

By default, the UI attempts to call `http://localhost:8000/validate`. If the API is not available, it falls back to running the LangGraph workflow directly in-process.

Features:

- Text area input for your startup idea.
- Market research section (market size and growth).
- Competitor list and competition summary.
- Demand validation with demand score and trend summary.
- Risk analysis with risk score and narrative.
- Final feasibility score and a structured, human-readable report.

---

### Example usage (end-to-end)

1. Ensure your `.env` is configured with a valid `GROQ_API_KEY`.
2. (Optional) Run the MCP server:
   ```bash
   python -m mcp_server.server
   ```
3. Start the FastAPI backend:
   ```bash
   python -m app.main
   ```
4. Start the Streamlit UI:
   ```bash
   streamlit run ui/streamlit_app.py
   ```
5. Open the Streamlit URL (usually `http://localhost:8501`), enter a startup idea such as:
   > Build an AI tool that automatically applies to jobs on LinkedIn.
6. Click **Validate Idea** to see the full feasibility report.

---

### Implementation notes

- The workflow is implemented with `StateGraph` from LangGraph using the typed `BusinessIdeaState` model.
- LLM calls are made through a reusable Groq client wrapper in `llm/groq_client.py`.
- The MCP tools currently provide mocked data but follow clear interfaces, making it easy to plug in real data sources later.
- LangChain is used to manage prompts for the LLM nodes, while LangGraph orchestrates the multi-step reasoning and state propagation.

>>>>>>> 103f64eb19940fabee3f17394154bae666add5ad
