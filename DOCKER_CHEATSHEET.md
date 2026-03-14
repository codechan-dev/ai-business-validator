# Docker & Project Command Cheat Sheet

## 🚀 One-Time Setup

```bash
# Navigate to project
cd ai-business-validator

# Create .env with your API key
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Build the Docker image
docker build -t ai-validator:latest .
```

## ▶️ Running Services

### Start All Services (Recommended)
```bash
docker-compose up
```
Then open:
- **API**: http://localhost:8001/docs
- **UI**: http://localhost:8501

### Start in Background
```bash
docker-compose up -d
```

### Stop All Services
```bash
docker-compose down
```

## 📊 Monitoring

### View All Logs (Live)
```bash
docker-compose logs -f
```

### View Specific Service Logs
```bash
docker-compose logs -f api       # API logs
docker-compose logs -f ui        # UI logs
docker-compose logs -f mcp-server # MCP logs
```

### Check Running Services
```bash
docker-compose ps
```

### View Resource Usage
```bash
docker stats
```

## 🔧 Service Management

### Restart Specific Service
```bash
docker-compose restart api        # Restart API
docker-compose restart ui         # Restart UI
```

### Stop Specific Service
```bash
docker-compose stop api
docker-compose start api
```

### View Service Details
```bash
docker-compose config             # View compose configuration
docker inspect ai-validator-api   # Inspect API container
```

## 🐚 Container Access

### Access Container Shell
```bash
docker exec -it ai-validator-api /bin/bash
```

### Run Python in Container
```bash
docker exec ai-validator-api python -c "from mcp_server import tools; print(tools.market_size('fintech'))"
```

### Run Command in Container
```bash
docker exec ai-validator-api curl http://localhost:8001/docs
```

## 🧹 Cleanup

### Stop and Remove Containers
```bash
docker-compose down
```

### Remove Stopped Containers
```bash
docker container prune
```

### Remove Unused Images
```bash
docker image prune
```

### Remove Everything (Careful!)
```bash
docker-compose down -v      # Remove volumes too
docker system prune -a       # Remove all unused
```

## 🔍 Debugging

### Check Docker Version
```bash
docker --version
docker-compose --version
```

### Check Docker Status
```bash
docker ps                    # Running containers
docker ps -a                 # All containers
docker images               # All images
```

### View Container Logs
```bash
docker logs ai-validator-api     # Show logs
docker logs -f ai-validator-api  # Follow logs
docker logs --tail 50 ai-validator-api  # Last 50 lines
```

### Test Connectivity
```bash
# From host
curl http://localhost:8001/docs
curl http://localhost:8501

# From container
docker exec ai-validator-api curl http://api:8001/docs
```

## 🚀 Production Commands

### Build with Version Tag
```bash
docker build -t ai-validator:v1.0 .
```

### Run in Production
```bash
docker run -d \
  --restart=always \
  --name ai-validator \
  -p 8001:8001 \
  -e GROQ_API_KEY=$PROD_KEY \
  ai-validator:v1.0 \
  python -m app.main
```

### Monitor Production
```bash
docker logs -f ai-validator     # View logs
docker stats ai-validator       # View resources
docker inspect ai-validator     # View details
```

## 📋 Common Scenarios

### I need to rebuild
```bash
docker-compose down
docker build -t ai-validator:latest .
docker-compose up
```

### Port is already in use
```bash
# Stop containers
docker-compose down

# Or find what's using it
docker ps
docker stop <container_id>
```

### Need to check API health
```bash
curl http://localhost:8001/docs
# Or in container
docker exec ai-validator-api curl http://localhost:8001/docs
```

### Want to see real-time logs
```bash
docker-compose logs -f
# Then in another terminal, interact with the app
```

### Need to update code and test
```bash
# Edit code (volumes auto-sync)
# Restart service
docker-compose restart api

# Check logs
docker-compose logs -f api
```

### Environment variable issues
```bash
# Check env vars in running container
docker exec ai-validator-api env | grep GROQ

# Update and restart
docker-compose down
# Edit .env
docker-compose up
```

## 🎯 Useful Command Combinations

### Full restart workflow
```bash
docker-compose down
docker build -t ai-validator:latest .
docker-compose up
```

### Check everything is working
```bash
docker-compose ps              # All running?
docker-compose logs | tail -20 # Any errors?
curl http://localhost:8001/docs # API responding?
```

### Development workflow
```bash
docker-compose up -d           # Start in background
docker-compose logs -f         # Watch logs in foreground
# Edit code...
docker-compose restart api     # Restart to apply changes
```

### Backup and restore
```bash
# Backup database/data
docker cp ai-validator-api:/app/data ./backup

# Restore
docker cp ./backup ai-validator-api:/app/data
```

## 📚 For More Information

- **Quick Start**: See QUICK_START.md
- **Full Docker Guide**: See DOCKER_GUIDE.md
- **Detailed Commands**: See DOCKER_COMMANDS.md
- **Project Docs**: See README.md

---

**Pro Tip**: Bookmark this file for quick reference while developing!
