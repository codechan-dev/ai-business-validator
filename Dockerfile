FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .

# Simple pip install (removed problematic options)
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Expose ports
EXPOSE 8001 8501

# Default: Run FastAPI backend
CMD ["python", "-m", "app.main"]
