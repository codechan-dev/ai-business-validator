# Docker Quick Commands

## TL;DR - Just Run These

### Option A: Docker Compose (Recommended - All Services)

```bash
cd ai-business-validator

# 1. Build the image
docker build -t ai-validator:latest .

# 2. Start all services (API + UI + MCP Server)
docker-compose up

# 3. Open browser
# API: http://localhost:8001/docs
# UI:  http://localhost:8501

# 4. Stop when done
Ctrl+C
docker-compose down
```

### Option B: Docker Run - API Only

```bash
docker run --rm \
  -p 8001:8001 \
  -e GROQ_API_KEY=your_api_key \
  ai-validator:latest
```

### Option C: Docker Run - UI Only

```bash
docker run --rm \
  -p 8501:8501 \
  -e GROQ_API_KEY=your_api_key \
  ai-validator:latest \
  streamlit run ui/streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

---

## Common Commands

| Task | Command |
|------|---------|
| **Build image** | `docker build -t ai-validator:latest .` |
| **Start all services** | `docker-compose up` |
| **Start in background** | `docker-compose up -d` |
| **Stop all services** | `docker-compose down` |
| **View logs** | `docker-compose logs -f` |
| **List running containers** | `docker ps` |
| **Stop specific container** | `docker-compose stop api` |
| **Rebuild without cache** | `docker-compose up --build --no-cache` |
| **Run command in container** | `docker exec ai-validator-api python -c "..."` |
| **Access container shell** | `docker exec -it ai-validator-api /bin/bash` |

---

## Setup Steps (First Time)

```bash
# 1. Navigate to project
cd ai-business-validator

# 2. Create .env file with API key
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# 3. Build Docker image
docker build -t ai-validator:latest .

# 4. Start services
docker-compose up

# 5. Wait for startup messages, then visit:
# - UI: http://localhost:8501
# - API Docs: http://localhost:8001/docs
```

---

## What Gets Deployed

```
ai-validator-api (Port 8001)
├─ FastAPI backend
├─ LangGraph workflow
└─ Real-time MCP tools

ai-validator-ui (Port 8501)
├─ Streamlit dashboard
└─ Connects to API at http://api:8001

ai-validator-mcp (Stdio protocol)
└─ Standalone MCP server
```

---

## Environment Variables

Create `.env` file:

```bash
GROQ_API_KEY=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
GROQ_MODEL=llama-3.3-70b-versatile  # optional
```

Or pass via command line:

```bash
docker-compose run -e GROQ_API_KEY=your_key up
```

---

## Verify It's Working

### Check API Health

```bash
curl http://localhost:8001/docs
```

Should return Swagger UI documentation.

### Test API Endpoint

```bash
curl -X POST http://localhost:8001/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "Build an AI hiring tool"}'
```

### Check Running Containers

```bash
docker-compose ps
```

Expected output:
```
NAME                      STATUS
ai-validator-api          Up
ai-validator-ui           Up
ai-validator-mcp          Up
```

---

## Troubleshooting

### "Cannot connect to Docker daemon"
```bash
# Make sure Docker is running
# Windows/Mac: Open Docker Desktop app
# Linux: sudo systemctl start docker
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

---

## Docker Compose Breakdown

```yaml
services:
  api:              # FastAPI backend (port 8001)
    command: python -m app.main

  ui:               # Streamlit UI (port 8501)
    command: streamlit run ui/streamlit_app.py --server.port 8501

  mcp-server:       # MCP server (stdio)
    command: python -m mcp_server.server
```

---

## Useful Docker Commands

```bash
# View all running containers
docker ps

# View logs for specific service
docker-compose logs api

# Follow logs in real-time
docker-compose logs -f ui

# Get a shell inside container
docker exec -it ai-validator-api /bin/bash

# Run Python inside container
docker exec ai-validator-api python -c "from mcp_server import tools; print(tools.market_size('fintech'))"

# Stop specific service
docker-compose stop api

# Restart specific service
docker-compose restart api

# Remove all stopped containers
docker container prune

# View container resource usage
docker stats
```

---

## Production Tips

- Use tags for versioning: `docker build -t ai-validator:v1.0 .`
- Use `.env.production` for production credentials
- Run with `--no-volume` flags to prevent code changes
- Use `--restart=always` for auto-restart
- Set resource limits: `-m 2g` for memory
- Use health checks to monitor services

---

## Links

- **Full Docker Guide**: `DOCKER_GUIDE.md`
- **Project README**: `README.md`
- **Quick Start**: `QUICK_START.md`
- **Real-Time Data Guide**: `REAL_TIME_DATA_GUIDE.md`

---

**Questions? See DOCKER_GUIDE.md for comprehensive documentation.**
