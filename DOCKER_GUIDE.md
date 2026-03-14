# Docker Setup Guide

## Prerequisites

- Docker installed and running
- `.env` file with `GROQ_API_KEY` configured

## Quick Commands

### Build Docker Image

```bash
cd ai-business-validator

# Build the image
docker build -t ai-validator:latest .

# Optional: Build with custom tag
docker build -t ai-validator:v1.0 .
```

### Run with Docker Compose (Recommended)

```bash
# Start all services (API + UI + MCP Server)
docker-compose up

# Start in background mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Run Individual Services with Docker

#### **Option 1: Run API Backend Only**

```bash
docker run --rm \
  --name ai-validator-api \
  -p 8001:8001 \
  -e GROQ_API_KEY=your_api_key_here \
  -v $(pwd):/app \
  ai-validator:latest \
  python -m app.main
```

#### **Option 2: Run Streamlit UI Only**

```bash
docker run --rm \
  --name ai-validator-ui \
  -p 8501:8501 \
  -e GROQ_API_KEY=your_api_key_here \
  -v $(pwd):/app \
  ai-validator:latest \
  streamlit run ui/streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

#### **Option 3: Run MCP Server Only**

```bash
docker run --rm \
  --name ai-validator-mcp \
  -e GROQ_API_KEY=your_api_key_here \
  -v $(pwd):/app \
  ai-validator:latest \
  python -m mcp_server.server
```

### Run Full Stack (All Services)

```bash
# Using docker-compose (easiest)
docker-compose up

# Alternatively, run containers separately:
docker run -d --name api -p 8001:8001 -e GROQ_API_KEY=$GROQ_API_KEY ai-validator:latest python -m app.main
docker run -d --name ui -p 8501:8501 -e GROQ_API_KEY=$GROQ_API_KEY ai-validator:latest streamlit run ui/streamlit_app.py --server.port 8501 --server.address 0.0.0.0
docker run -d --name mcp -e GROQ_API_KEY=$GROQ_API_KEY ai-validator:latest python -m mcp_server.server
```

---

## Docker Compose File Reference

The `docker-compose.yml` includes three services:

### Service 1: **api** (FastAPI Backend)
- Port: `8001`
- Command: `python -m app.main`
- Runs on: http://localhost:8001

### Service 2: **ui** (Streamlit Frontend)
- Port: `8501`
- Command: `streamlit run ui/streamlit_app.py`
- Runs on: http://localhost:8501
- Depends on: `api` service

### Service 3: **mcp-server** (MCP Server)
- Protocol: stdio
- Command: `python -m mcp_server.server`
- Standalone MCP server for external clients

All services share the same Docker network for inter-service communication.

---

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Docker Compose will automatically load this file.

Alternatively, pass environment variables directly:

```bash
docker run \
  -e GROQ_API_KEY=your_key \
  -e GROQ_MODEL=llama-3.3-70b-versatile \
  ai-validator:latest
```

### Available Environment Variables

```bash
# Required
GROQ_API_KEY=your_api_key

# Optional
GROQ_MODEL=llama-3.3-70b-versatile
```

---

## Usage Examples

### Example 1: Quick Test (All Services)

```bash
cd ai-business-validator

# Build
docker build -t ai-validator:latest .

# Run all services
docker-compose up

# In browser, visit:
# - UI: http://localhost:8501
# - API: http://localhost:8001/docs (Swagger UI)
# - API Health: http://localhost:8001/validate (POST endpoint)

# When done, press Ctrl+C and clean up:
docker-compose down
```

### Example 2: Production Deployment

```bash
# Build with tag
docker build -t ai-validator:v1.0 .

# Run in background
docker-compose up -d

# Check logs
docker-compose logs -f ui

# Stop
docker-compose stop

# Remove
docker-compose down --volumes
```

### Example 3: Custom Configurations

```bash
# Run API on different port
docker run -p 9001:8001 \
  -e GROQ_API_KEY=$GROQ_API_KEY \
  ai-validator:latest \
  python -m app.main
```

---

## Testing the Deployment

### Test API Health

```bash
# Check if API is running
curl http://localhost:8001/docs

# Submit a validation request
curl -X POST http://localhost:8001/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "Build an AI hiring tool"}'
```

### Test UI

Open browser: http://localhost:8501

### Test MCP Server

The MCP server exposes tools via stdio protocol (no HTTP).

---

## Debugging

### View Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs api
docker-compose logs ui
docker-compose logs mcp-server

# Follow logs (tail)
docker-compose logs -f ui
```

### Access Container Shell

```bash
# Get container ID
docker ps

# Access shell
docker exec -it ai-validator-api /bin/bash

# Run Python command in container
docker exec ai-validator-api python -c "from mcp_server import tools; print(tools.market_size('fintech'))"
```

### Rebuild Without Cache

```bash
docker-compose up --build --no-cache
```

---

## Common Issues

### Issue: "Cannot connect to Docker daemon"
**Solution**: Make sure Docker is installed and running.

```bash
# Check Docker status
docker ps

# Start Docker (if not running)
# On Windows/Mac: Open Docker Desktop
# On Linux: sudo systemctl start docker
```

### Issue: "GROQ_API_KEY not found"
**Solution**: Ensure `.env` file exists in the project root with the API key.

```bash
# Create/update .env
echo "GROQ_API_KEY=your_key" > .env

# Or pass as environment variable
docker-compose run -e GROQ_API_KEY=your_key api python -m app.main
```

### Issue: "Port 8001 already in use"
**Solution**: Stop existing containers or use different port.

```bash
# Find what's using port 8001
docker ps

# Stop specific container
docker stop ai-validator-api

# Or use different port
docker run -p 9001:8001 ai-validator:latest python -m app.main
```

### Issue: "Streamlit unable to connect to API"
**Solution**: Ensure API service is running and accessible.

```bash
# Check if API is running
curl http://localhost:8001/docs

# If using docker-compose, ensure api service started first
docker-compose up api  # Start API first
docker-compose up ui   # Then start UI
```

---

## Production Checklist

- [ ] Build image: `docker build -t ai-validator:v1.0 .`
- [ ] Test locally: `docker-compose up`
- [ ] Set `.env` file with production API key
- [ ] Verify all 3 services running: `docker-compose ps`
- [ ] Test API endpoint: `curl http://localhost:8001/docs`
- [ ] Test UI: Visit http://localhost:8501
- [ ] Check logs for errors: `docker-compose logs`
- [ ] Deploy to server/cloud
- [ ] Monitor logs: `docker-compose logs -f`

---

## Useful Docker Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# List Docker images
docker images

# Remove image
docker rmi ai-validator:latest

# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# View container stats
docker stats

# Inspect container
docker inspect ai-validator-api
```

---

## Notes

- Dockerfile uses Python 3.11-slim (optimized for size)
- Docker Compose uses bridge network for inter-service communication
- Volumes are mounted for live code changes (development)
- All services share the same GROQ_API_KEY
- Ports: 8001 (API), 8501 (UI), stdio (MCP)

For more information, see:
- `README.md` - Project overview
- `REAL_TIME_DATA_GUIDE.md` - Data source documentation
- `QUICK_START.md` - Quick reference
