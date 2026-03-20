# Docker Quick Commands

## ⚡ START ENTIRE PROJECT - Single Command

**This command starts EVERYTHING (Frontend + Backend + All Servers):**

```bash
docker-compose up --build
```

**That's it!** This single command will:
- ✅ Build React Frontend (port 5173)
- ✅ Start FastAPI Backend (port 8001)  
- ✅ Run MCP Data Server
- ✅ Show all logs in real-time

Then open these in your browser:
- **Frontend Dashboard**: http://localhost:5173
- **API Documentation**: http://localhost:8001/docs

### Other Single-Command Variations

```bash
# Start in background (doesn't show logs but keeps running)
docker-compose up --build -d

# Start and follow logs
docker-compose up --build

# Stop everything
docker-compose down

# Restart everything
docker-compose restart

# Clean reset (remove all data)
docker-compose down -v
docker-compose up --build
```

---

## TL;DR - Run Full Project (All Services)

### ⚡ Quick Start - 3 Steps to Full Project

```bash
# 1. Navigate to project
cd ai-business-validator

# 2. Create .env file with your GROQ API key
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# 3. Start everything (React Frontend + Backend + Data Tools)
docker-compose up --build

# 4. Open in browser when ready
# 🖥️  FRONTEND (React App):     http://localhost:5173
# ⚙️   BACKEND (API Docs):      http://localhost:8001/docs
# 🌍 BACKEND (API Endpoint):    http://localhost:8001/validate

# 5. Stop when done
Ctrl+C
docker-compose down
```

### Project Architecture

Three main components that run together:

- **FRONTEND** - React + TypeScript dashboard (port 5173) where users submit business ideas
- **BACKEND** - FastAPI server (port 8001) that validates ideas using LangGraph agents
- **DATA TOOLS** - MCP Server that gathers real-time market research data

### What Gets Started

| Component | Service | Port | Technology |
|-----------|---------|------|-----------|
| **Frontend** | UI | 5173 | React + Vite + TypeScript |
| **Backend** | API | 8001 | FastAPI + LangGraph workflow |
| **Data Tools** | MCP Server | Stdio | Real-time news, trends, Reddit, etc |

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│          FRONTEND (UI)                  │
│  Port 5173 - React + Vite               │
│  ├─ Dashboard.tsx & Landing.tsx pages  │
│  ├─ Real-time validation results       │
│  ├─ Interactive Recharts visualizations│
│  └─ Tailwind CSS styled components     │
└────────────────┬────────────────────────┘
                 │ HTTP API calls
                 ↓
┌─────────────────────────────────────────┐
│          BACKEND (API)                  │
│  Port 8001 - FastAPI Server            │
│  ├─ /validate endpoint                 │
│  ├─ LangGraph workflow orchestration   │
│  ├─ Business validation logic          │
│  └─ /docs - Swagger API documentation │
└────────────────┬────────────────────────┘
                 │ Uses
                 ↓
┌─────────────────────────────────────────┐
│         MCP SERVER (Data Tools)         │
│  Stdio Protocol                        │
│  ├─ Market research (news, trends)     │
│  ├─ Competitor analysis                │
│  ├─ Reddit sentiment analysis          │
│  ├─ Product Hunt data                  │
│  └─ Startup ecosystem data             │
└─────────────────────────────────────────┘
```

---

## Alternative: Run Individual Services (Optional)

If you only need specific components:

```bash
# Run backend API only (processes validation logic)
docker-compose up api

# Run frontend React app only (requires backend API running first)
docker-compose up ui

# Run MCP Server only (provides real-time data)
docker-compose up mcp-server

# Run backend + MCP (no UI)
docker-compose up api mcp-server

# Rebuild a specific service
docker-compose up --build api
docker-compose up --build ui
```

---

## Common Commands

| Task | Command | What It Does |
|------|---------|--------------|
| **START EVERYTHING** 🚀 | `docker-compose up --build` | Builds & starts Frontend + Backend + All servers |
| **Start in background** | `docker-compose up -d --build` | Starts in background (won't show logs) |
| **Stop everything** | `docker-compose down` | Stops all containers |
| **Restart everything** | `docker-compose restart` | Restarts all running containers |
| **View all logs** | `docker-compose logs -f` | Shows live logs from all services |
| **View backend logs** | `docker-compose logs -f api` | Shows API server logs only |
| **View React frontend logs** | `docker-compose logs -f ui` | Shows React app logs only |
| **Check status** | `docker-compose ps` | Shows which containers are running |
| **Clean reset** | `docker-compose down -v && docker-compose up --build` | Removes all data and starts fresh |

---

## First Time Setup

### Step 1: Create .env File
```bash
cd ai-business-validator
echo "GROQ_API_KEY=gsk_your_actual_key_here" > .env
```

### Step 2: Run This One Command (Starts Everything)
```bash
docker-compose up --build
```

This single command will:
1. ✅ Build the React frontend (TypeScript + Vite)
2. ✅ Build the Python backend (FastAPI + LangGraph)
3. ✅ Start the MCP data server
4. ✅ Start all services on your machine
5. ✅ Show all logs in real-time

### Step 3: Wait for Startup Messages
Look for these in the logs:
```
✓ ai-validator-api    | INFO:     Uvicorn running on http://0.0.0.0:8001
✓ ai-validator-ui     | Accepting connections at http://0.0.0.0:5173
```

### Step 4: Open in Browser
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001/docs

### What Gets Started

1. **Node.js build stage** - Compiles React/TypeScript with Vite
2. **Backend (FastAPI)** starts on port 8001
3. **Frontend (React)** serves on port 5173 (after backend ready)
4. **MCP Server** starts in background for data tools
5. **Everything is connected** and ready to use!

---

## What Gets Deployed

### Frontend (React Service - Port 5173)
```
React + TypeScript + Vite
├─ Dashboard.tsx - Main validation interface
├─ Landing.tsx - Home/intro page
├─ Recharts visualizations (Bar, Line, Radar charts)
├─ Built-in API proxy for backend communication
├─ Tailwind CSS for styling
└─ Hot module reloading in development
```

### Backend (API Service - Port 8001)
```
FastAPI Server
├─ POST /validate - Main validation endpoint
├─ Executes LangGraph workflow
├─ Agents:
│  ├─ Idea Parser - Analyzes business concept
│  ├─ Market Research - Gathers market data
│  ├─ Competitor Analysis - Studies competitors
│  ├─ Demand Validation - Validates market demand
│  ├─ Risk Analysis - Identifies risks
│  └─ Feasibility Scoring - Calculates final score
├─ Integrates with MCP Server for real-time data
└─ Swagger UI at http://localhost:8001/docs
```

### Data Tools (MCP Server - Stdio)
```
MCP Server
├─ Market Research Tool
├─ News & Trends Tool
├─ Reddit Sentiment Analysis
├─ Product Hunt Integration
├─ Startup Ecosystem Data
└─ Runs in background, no visible interface
```

## Environment Variables

The **only required** environment variable is `GROQ_API_KEY`.

### Setup .env File

```bash
# Option 1: Create .env file in project root
echo "GROQ_API_KEY=gsk_your_actual_key_here" > .env

# Option 2: Or manually edit and create .env with:
GROQ_API_KEY=gsk_your_actual_key_here
GROQ_MODEL=llama-3.3-70b-versatile  # (optional, defaults to this)
```

### Get Your GROQ API Key

1. Go to https://console.groq.com/keys
2. Create a new API key
3. Copy it and paste into `.env`

---

## Verify It's Working

After seeing "Accepting connections" message in terminal:

```bash
# 1. Check FRONTEND (React) is responsive
curl http://localhost:5173
# Should return React/HTML page

# 2. Check BACKEND (API) is responsive
curl http://localhost:8001/docs
# Should return Swagger/OpenAPI documentation

# 3. Test BACKEND endpoint with sample idea
curl -X POST http://localhost:8001/validate `
  -H "Content-Type: application/json" `
  -d '{\"idea\": \"Build an AI hiring tool\"}'

# 4. View all running containers
docker-compose ps

# 5. Check logs if anything fails
docker-compose logs ui    # Frontend (React) logs
docker-compose logs api   # Backend logs
```

Expected output:
```
NAME                  STATUS
ai-validator-api      Up (Backend)
ai-validator-ui       Up (Frontend)
ai-validator-mcp      Up (Data Tools)
```

---

## Quick Verification Checklist

- [ ] Backend API shows "Uvicorn running on http://0.0.0.0:8001" 
- [ ] Frontend shows "Accepting connections at http://0.0.0.0:5173"
- [ ] Open http://localhost:5173 - should load React dashboard
- [ ] Open http://localhost:8001/docs - should show API documentation
- [ ] `docker-compose ps` shows all 3 containers as "Up"
- [ ] React page shows Landing page or Dashboard component
- [ ] Submit a test idea in React UI - should get validation results back from backend
- [ ] Check browser console (F12) for any JavaScript errors

## Troubleshooting

### "React UI Not Visible / Can't Access Frontend"

✅ **First, verify both containers are running:**
```bash
docker-compose ps
# Should show all 3 containers as "Up"
```

✅ **Then open your browser to:**
```
http://localhost:5173
```

If still not visible, try these:

```bash
# 1. Check if UI container is actually running and healthy
docker-compose logs ui --tail=20

# 2. Look for "Accepting connections at http://0.0.0.0:5173" message
# If you see this, React UI is ready - just open http://localhost:5173

# 3. If UI logs show errors, check backend first
docker-compose logs api --tail=20

# 4. If backend has "Application startup complete", UI should be able to connect
# Try restarting just the frontend
docker-compose restart ui

# 5. Check if port 5173 is accessible locally
curl http://localhost:5173
# or from PowerShell
curl -Uri http://localhost:5173

# 6. If nothing works, rebuild and restart
docker-compose down
docker-compose up --build
```

### "React App Shows Blank Page or Errors"
```bash
# 1. Check browser console for JavaScript errors (F12)
# 2. Check for common issues:
#    - Backend not responding: check http://localhost:8001/docs
#    - CORS issues: verify API proxy in vite.config.ts
#    - Build errors: check frontend logs

# Clear browser cache and hard refresh
# Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Check React app logs for build or runtime errors
docker-compose logs ui -f

# Check if React build succeeded
docker logs ai-validator-ui | grep -i "error\|failed\|warn"

# Test API connectivity from React container
docker exec ai-validator-ui curl http://api:8001/docs
```

### "Port 8001 already in use"
```bash
# Stop existing containers
docker-compose down

# Or use different port
docker run -p 9001:8001 ai-validator:latest python -m app.main
```

### "GROQ_API_KEY not set"
```bash
# Create .env file
echo "GROQ_API_KEY=your_key" > .env

# Or pass as environment variable
docker-compose run -e GROQ_API_KEY=your_key up
```

### "UI can't connect to API"
```bash
# Make sure API started first
docker-compose up api

# Then in another terminal
docker-compose up ui

# Or just use:
docker-compose up  # Starts all in correct order
```

### "React App Can't Connect to Backend API"
```bash
# 1. Verify backend is running
docker-compose logs api | grep "Uvicorn running"

# 2. Check React container can reach API internally
docker exec ai-validator-ui curl http://api:8001/docs

# 3. Verify API is accessible from your machine
curl http://localhost:8001/docs

# 4. Check React app logs for API call errors
docker-compose logs ui -f

# 5. Restart frontend if backend was restarted
docker-compose restart ui

# 6. Or start services in order
docker-compose up api      # Start backend first
# Wait for "Uvicorn running" message
# Then in another terminal:
docker-compose up ui       # Start React frontend
```

### "Frontend shows blank page or errors"
```bash
# Check frontend logs for connection errors
docker-compose logs ui

# Common issue: backend not started yet
# Wait longer for backend to initialize
docker-compose logs api | grep "Uvicorn running"

# Try clearing Streamlit cache
docker-compose exec ui streamlit cache clear

# Restart frontend
docker-compose restart ui
```

### "Backend API not responding"
```bash
# Check if backend started successfully
docker-compose logs api

# Look for "Uvicorn running on http://0.0.0.0:8001"
# If not present, check for errors in logs

# Try accessing API documentation
curl http://localhost:8001/docs

# If that fails, restart backend
docker-compose restart api
```

---

## Docker Compose Breakdown

### Services Configuration

```yaml
services:
  api:              # FastAPI BACKEND (port 8001)
    build: .
    command: python -m app.main
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}

  ui:               # React FRONTEND (port 5173)
    build:
      context: .
      dockerfile: Dockerfile.frontend
    depends_on:
      - api         # Waits for backend to start first

  mcp-server:       # DATA TOOLS (Stdio protocol)
    build: .
    command: python -m mcp_server.server
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
```

---

## Useful Docker Commands

### Viewing Logs

```bash
# View logs for BACKEND (FastAPI)
docker-compose logs api

# View logs for FRONTEND (Streamlit)
docker-compose logs ui

# View logs for DATA TOOLS
docker-compose logs mcp-server

# Follow logs in real-time (all services)
docker-compose logs -f

# Follow logs for specific service
docker-compose logs -f api
```

### Container Management

```bash
# View all running containers
docker-compose ps

# Stop frontend without stopping backend
docker-compose stop ui

# Stop backend (causes frontend to lose connection)
docker-compose stop api

# Restart just the backend
docker-compose restart api

# Get a shell inside backend container
docker exec -it ai-validator-api /bin/bash

# Run Python command inside backend
docker exec ai-validator-api python -c "import app; print('Backend working')"

# View container resource usage
docker stats
```

---

## Production Tips

### Backend (API)
- Use tags for versioning: `docker build -t ai-validator:v1.0 .`
- Set resource limits: `-m 2g` for backend memory
- Use `--restart=always` for auto-restart on failure
- Monitor with health checks
- Keep `.env.production` separate from development

### Frontend (React)
- Pre-build React app with `npm run build` before deployment
- Use nginx or similar reverse proxy for SSL/TLS in production
- Set appropriate cache headers for static assets
- Use environment-specific API URLs (.env files)
- Enable gzip compression for production builds

### Data Tools (MCP Server)
- Run isolated from frontend/backend for scalability
- Implement rate limiting for API calls
- Cache market data results when possible

### All Services
- Use environment-specific docker-compose files (dev/prod)
- Implement proper logging and monitoring
- Set up health checks for automatic recovery

---

## Links

- **Full Docker Guide**: `DOCKER_GUIDE.md`
- **Project README**: `README.md`
- **Quick Start**: `QUICK_START.md`
- **Real-Time Data Guide**: `REAL_TIME_DATA_GUIDE.md`

---

**Questions? See DOCKER_GUIDE.md for comprehensive documentation.**
