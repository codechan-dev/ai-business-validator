# 🚀 AI Business Idea Validator

A production-ready SaaS web application that validates business ideas using AI, LangGraph, and real-time market data.

## 🎯 Key Features

### 📊 Comprehensive Analysis
- **Feasibility Score** (0-100): Can your idea be built?
- **Market Demand** (0-100): Is there real customer need?
- **Competition Analysis** (0-100): How crowded is your space?
- **Risk Assessment** (0-100): What are the dangers?

### 📈 Visual Dashboard
- Circular progress meters for each metric
- Radar chart showing capability profile
- Bar chart comparing to competitors
- Line chart showing market trends
- Animated transitions and typewriter effects

### 📡 Real-Time Data
- Reddit discussions about your idea
- Google Trends data and search volume
- Product Hunt launches in your category
- News mentions and industry reports
- Startup database insights

### 🎨 Modern UI
- Dark theme with glassmorphism
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Clean, intuitive navigation

## 🏗️ Tech Stack

### Frontend
- **React 18** + Vite for fast development
- **TailwindCSS** for styling
- **Recharts** for interactive charts
- **Framer Motion** for animations
- **Axios** for API communication

### Backend
- **FastAPI** for high-performance API
- **LangGraph** for multi-step workflows
- **Pydantic** for data validation
- **MCP Tools** for real-time data collection
- **Groq LLM** for AI insights

### Infrastructure
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Uvicorn** ASGI server

## 🚀 Quick Start

### Option 1: Local Development

**Backend:**
```bash
cd backend
python -m venv venv_backend
source venv_backend/bin/activate  # or: venv_backend\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Option 2: Docker

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📋 API Endpoints

### POST /api/validate
Validate a business idea

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
    "recommendation": "AI recommendation..."
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
Fetch signals from a specific source

**Parameters:** `source`, `query`

### GET /api/health
Health check

## 🧠 How It Works

### LangGraph Workflow
```
1. Parse Idea → Extract keywords, categorize
2. Market Research → Estimate market size, trends
3. Competitor Analysis → Identify competitors, barriers
4. Demand Analysis → Validate customer need
5. Risk Analysis → Identify key risks, mitigations
6. Scoring → Calculate 4-metric scores
7. Signals → Fetch real-time data from 5 MCP tools
```

### AI Agents
1. **Idea Parser** - Structure and categorize the idea
2. **Market Research Agent** - Analyze market opportunity
3. **Competitor Analysis Agent** - Research competition
4. **Demand Analysis Agent** - Validate market demand
5. **Risk Analysis Agent** - Identify and score risks
6. **Scoring Agent** - Calculate final metrics

## 🎨 UI Components

### Landing Page
- Gradient background with animated elements
- Large textarea for idea input
- Example ideas for quick testing
- Loading animation during analysis

### Dashboard
- Score cards with circular progress
- Multi-chart analysis section
- Real-time signals panel with dropdown
- Detailed analysis panels
- AI recommendations with typewriter effect

## 📦 Project Structure

```
ai-business-validator/
├── frontend/
│   ├── src/
│   │   ├── components/      (React components)
│   │   ├── pages/          (Landing, Dashboard)
│   │   ├── charts/         (Recharts visualizations)
│   │   ├── services/       (API service layer)
│   │   ├── App.tsx
│   │   └── types.ts
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── main.py             (FastAPI app)
│   ├── schemas.py          (Pydantic models)
│   ├── agents/             (AI agents)
│   ├── graph/              (LangGraph workflow)
│   ├── mcp_tools/          (Data collection tools)
│   ├── llm/                (LLM client)
│   └── requirements.txt
├── docker-compose.prod.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── SETUP_GUIDE.md
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
GROQ_API_KEY=your_api_key_here
ENVIRONMENT=development
DEBUG=True
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000/api
```

## 🧪 Testing

### Using curl
```bash
curl -X POST http://localhost:8000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"idea":"AI productivity tool for remote teams"}'
```

### Using frontend
1. Go to http://localhost:5173
2. Enter a business idea
3. Click "Validate"
4. See results appear

## 📊 Sample Ideas to Test

1. "AI-powered platform for remote team productivity analytics"
2. "Sustainable fashion e-commerce with AI style recommendations"
3. "Healthcare chatbot for preventive medical advice"

## 🚀 Deployment

### Production Checklist
- [ ] Set real GROQ_API_KEY
- [ ] Configure CORS for your domain
- [ ] Set DEBUG=False
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Set up logging and monitoring
- [ ] Configure rate limiting
- [ ] Add authentication/authorization
- [ ] Set up CI/CD pipeline
- [ ] Configure backup strategy

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔮 Roadmap

- [ ] Real Groq API integration
- [ ] User authentication and profiles
- [ ] Save and share validations
- [ ] PDF export functionality
- [ ] Real-time collaboration
- [ ] Slack/Discord integration
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Custom scoring rules
- [ ] Browser extension

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md)
- [API Documentation](http://localhost:8000/docs) (when running)
- [Frontend Architecture](./frontend/README.md)
- [Backend Architecture](./backend/README.md)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 💬 Support

- Open an issue for bugs
- Check existing issues for questions
- Read documentation first

## 🙏 Acknowledgments

- Inspired by successful SaaS validation tools
- Built with beautiful dashboards in mind
- Powered by latest AI and web technologies

---

Made with ❤️ for founders and business innovators.
