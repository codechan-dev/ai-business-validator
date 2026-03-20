# Multi-stage production build
# Stage 1: Build frontend
FROM node:20-alpine as frontend-builder

WORKDIR /app

# Copy frontend files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install && npm install --save-dev terser

# Copy frontend source and config
COPY frontend/src ./src
COPY frontend/index.html ./
COPY frontend/vite.config.ts ./
COPY frontend/tsconfig.json ./
COPY frontend/tsconfig.node.json ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./

# Build frontend
ENV VITE_API_URL=/api
RUN npm run build

# Stage 2: Python backend with frontend
FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/dist ./frontend/dist

# Expose port
EXPOSE 8000

# Run backend server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
