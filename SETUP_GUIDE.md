# AI Business Idea Validator - Complete Setup Guide

## 📋 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker & Docker Compose (optional)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv_backend

# Activate virtual environment
# On Windows:
venv_backend\Scripts\activate
# On macOS/Linux:
source venv_backend/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run backend server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at: http://localhost:8000

API Documentation: http://localhost:8000/docs

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:5173

### 3. Docker Setup (Production)

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up --build

# Or run individually
docker build -f Dockerfile.backend -t ai-validator-backend .
docker build -f Dockerfile.frontend -t ai-validator-frontend .

docker run -p 8000:8000 ai-validator-backend
docker run -p 5173:5173 ai-validator-frontend
```

---

## 🏗️ Project Structure

```
ai-business-validator/
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/             # Page components
│   │   ├── charts/            # Recharts components
│   │   ├── services/          # API service layer
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                     # FastAPI + LangGraph
│   ├── main.py               # FastAPI application
│   ├── schemas.py            # Pydantic models
│   ├── agents/               # AI agents
│   │   ├── idea_parser.py
│   │   ├── market_research.py
│   │   ├── competitor_analysis.py
│   │   ├── demand_analysis.py
│   │   ├── risk_analysis.py
│   │   └── scoring.py
│   ├── graph/                # LangGraph workflow
│   │   └── langgraph_flow.py
│   ├── mcp_tools/            # MCP tool implementations
│   │   ├── reddit.py
│   │   ├── trends.py
│   │   ├── product_hunt.py
│   │   ├── news.py
│   │   └── startups.py
│   ├── llm/                  # LLM client
│   │   └── groq_client.py
│   ├── requirements.txt
│   └── .env.example
├── docker-compose.prod.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

---

## 🔌 API Endpoints

### Core Endpoints

#### POST /api/validate
Validate a business idea with comprehensive analysis.

**Request:**
```json
{
  "idea": "AI-powered platform for remote team productivity analytics"
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
    "market": "Market research summary...",
    "competitors": "Competitor analysis...",
    "risks": "Risk assessment...",
    "recommendation": "AI-generated recommendation..."
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

#### GET /api/signals
Get real-time signals from a specific MCP source.

**Parameters:**
- `source` (string): reddit, trends, product_hunt, news, startups
- `query` (string): Search query

**Response:**
```json
[
  {
    "title": "Signal title",
    "summary": "Signal summary",
    "link": "https://...",
    "source": "Data source"
  }
]
```

#### GET /api/health
Health check endpoint.

---

## 🎯 Features

### Frontend Features
- ✅ Landing page with idea input form
- ✅ Real-time validation with loading animation
- ✅ Dashboard with animated score cards (circular progress)
- ✅ Multiple chart types (Radar, Bar, Line) using Recharts
- ✅ Real-time signals panel with MCP data
- ✅ Dropdown to select data sources dynamically
- ✅ Typewriter effect for AI recommendations
- ✅ Dark theme with glassmorphism UI
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)

### Backend Features
- ✅ Multi-step LangGraph workflow
- ✅ 6 AI agents for comprehensive analysis
- ✅ MCP tool integration for real-time data
- ✅ Scoring algorithm (0-100 scale)
- ✅ RESTful API with FastAPI
- ✅ Pydantic data validation
- ✅ CORS enabled for frontend integration
- ✅ Comprehensive error handling
- ✅ Logging for debugging

### MCP Tools
- ✅ Reddit discussions scraper
- ✅ Google Trends data fetcher
- ✅ Product Hunt launches finder
- ✅ News mentions aggregator
- ✅ Startup database connector

---

## 🚀 Workflow

### 1. User Flow
```
User inputs idea 
  ↓
Clicks "Validate"
  ↓
Frontend sends POST /api/validate
  ↓
Backend processes through LangGraph
  ↓
Dashboard displays results
  ↓
User can explore signals & analysis
```

### 2. Backend LangGraph Flow
```
idea_parser
  ↓
├─→ market_research (MCP tools)
├─→ competitor_analysis (MCP tools)
├─→ demand_analysis (MCP tools)
├─→ risk_analysis
  ↓
scoring
  ↓
fetch_signals_node (5 MCP tools in parallel)
  ↓
response generation
```

---

## 📊 Agents Overview

### 1. **Idea Parser**
- Extracts keywords from the idea
- Categorizes the business (SaaS, Marketplace, HealthTech, etc.)
- Prepares data for downstream analysis

### 2. **Market Research Agent**
- Estimates market size (TAM, SAM, SOM)
- Identifies growth trends
- Analyzes market position
- Sources: MCP tools

### 3. **Competitor Analysis Agent**
- Identifies top competitors
- Analyzes their strengths
- Identifies barriers to entry
- Evaluates competitive position

### 4. **Demand Analysis Agent**
- Calculates market demand level
- Estimates addressable market
- Identifies growth potential
- Analyzes customer signals

### 5. **Risk Analysis Agent**
- Identifies key business risks
- Categorizes risk level
- Generates mitigation strategies
- Sources: Market and competitive data

### 6. **Scoring Agent**
- Calculates 4 key scores (0-100):
  - **Feasibility**: Can it be built?
  - **Demand**: Is there customer need?
  - **Competition**: How crowded is the space?
  - **Risk**: What are the dangers?

---

## 🔧 Configuration

### Backend (.env)
```env
GROQ_API_KEY=your_api_key_here
ENVIRONMENT=development
DEBUG=True
DATABASE_URL=sqlite:///./test.db
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=AI Business Idea Validator
```

---

## 📦 Dependencies

### Frontend
- React 18+
- Vite 5+
- TailwindCSS 3+
- Recharts 2+
- Framer Motion 10+
- Axios
- Lucide React

### Backend
- FastAPI 0.104+
- Uvicorn 0.24+
- Pydantic 2.5+
- Python 3.9+

---

## 🧪 Testing

### Backend
```bash
# Using curl
curl -X POST http://localhost:8000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "AI productivity tool for remote teams"}'
```

### Frontend
Open http://localhost:5173 and test with example ideas.

---

## 🚢 Deployment

### Production Checklist
- [ ] Set real GROQ_API_KEY
- [ ] Configure CORS for production domain
- [ ] Set DEBUG=False
- [ ] Use production database (PostgreSQL)
- [ ] Enable HTTPS
- [ ] Set up logging
- [ ] Configure rate limiting
- [ ] Add authentication
- [ ] Set up monitoring/alerts
- [ ] Configure CI/CD pipeline

---

## 🔮 Future Enhancements

- Add real Groq API integration
- Implement user authentication
- Add saved idea history with database
- Export reports to PDF
- Add real-time collaboration
- Integrate with Slack/Discord
- Add email notifications
- Implement caching for signals
- Add A/B testing framework
- Create admin dashboard
- Add analytics tracking

---

## 📚 Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📝 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📧 Support

For issues and questions, please open a GitHub issue or contact support.
