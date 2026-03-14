FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .

# Install with retry logic and use reliable PyPI mirror
RUN pip install --no-cache-dir \
    --index-url https://pypi.org/simple/ \
    --default-timeout=1000 \
    --retries 5 \
    -r requirements.txt

# Copy project files
COPY . .

# Expose ports
EXPOSE 8001 8501

# Default: Run FastAPI backend
CMD ["python", "-m", "app.main"]