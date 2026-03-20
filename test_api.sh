#!/bin/bash
# Test script for AI Business Idea Validator

echo "🧪 Testing AI Business Idea Validator"
echo "========================================"
echo ""

API_URL="http://localhost:8000/api"

# Test 1: Health Check
echo "1️⃣ Health Check"
curl -s "${API_URL}/health" | python -m json.tool
echo ""
echo ""

# Test 2: Validate SaaS Idea
echo "2️⃣ Validating SaaS Idea"
curl -s -X POST "${API_URL}/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "AI-powered platform for remote team productivity analytics with real-time monitoring and insights"
  }' | python -m json.tool
echo ""
echo ""

# Test 3: Validate Healthcare Idea
echo "3️⃣ Validating Healthcare Idea"
curl -s -X POST "${API_URL}/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Telemedicine platform for preventive healthcare in rural areas"
  }' | python -m json.tool
echo ""
echo ""

# Test 4: Get Reddit Signals
echo "4️⃣ Fetching Reddit Signals"
curl -s "${API_URL}/signals?source=reddit&query=AI+productivity" | python -m json.tool
echo ""
echo ""

# Test 5: Get Trends Signals
echo "5️⃣ Fetching Google Trends Signals"
curl -s "${API_URL}/signals?source=trends&query=remote+work" | python -m json.tool
echo ""
echo ""

echo "✅ All tests completed!"
