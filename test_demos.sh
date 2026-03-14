#!/bin/bash
# Test script for AI Business Validator
# Tests all three demo scenarios

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         AI Business Validator - Demo Testing                   ║"
echo "║         Testing: Worst, Better, Best Cases                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if API is running
echo "Checking if API is running on http://localhost:8001..."
if ! curl -s http://localhost:8001/docs > /dev/null; then
    echo "❌ API is not running!"
    echo "Start it with: docker-compose up"
    exit 1
fi
echo "✅ API is running"
echo ""

# Test 1: WORST Case
echo "════════════════════════════════════════════════════════════════"
echo "🔴 TEST 1: WORST CASE"
echo "════════════════════════════════════════════════════════════════"
echo "Idea: Hamster social network"
echo "Expected: Feasibility 2-3/10, High Risk"
echo ""

response1=$(curl -s -X POST http://localhost:8001/validate \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Build a social network for hamsters to share photos and connect with other hamsters online"
  }')

echo "Results:"
echo "$response1" | jq '{
  feasibility_score: .feasibility_score,
  demand_score: .demand_analysis.demand_score,
  risk_score: .risk_analysis.risk_score,
  recommendation: .final_report | split("\n")[-2]
}' 2>/dev/null || echo "Failed to parse response"
echo ""

# Test 2: BETTER Case
echo "════════════════════════════════════════════════════════════════"
echo "🟡 TEST 2: BETTER CASE"
echo "════════════════════════════════════════════════════════════════"
echo "Idea: SaaS freelance project management platform"
echo "Expected: Feasibility 5-6/10, Moderate Risk"
echo ""

response2=$(curl -s -X POST http://localhost:8001/validate \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Create a SaaS platform for freelance project management and team collaboration"
  }')

echo "Results:"
echo "$response2" | jq '{
  feasibility_score: .feasibility_score,
  demand_score: .demand_analysis.demand_score,
  risk_score: .risk_analysis.risk_score,
  recommendation: .final_report | split("\n")[-2]
}' 2>/dev/null || echo "Failed to parse response"
echo ""

# Test 3: BEST Case
echo "════════════════════════════════════════════════════════════════"
echo "🟢 TEST 3: BEST CASE"
echo "════════════════════════════════════════════════════════════════"
echo "Idea: AI-powered resume optimization and job matching"
echo "Expected: Feasibility 8-9/10, Low Risk"
echo ""

response3=$(curl -s -X POST http://localhost:8001/validate \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Build an AI-powered resume optimization and job matching platform for job seekers"
  }')

echo "Results:"
echo "$response3" | jq '{
  feasibility_score: .feasibility_score,
  demand_score: .demand_analysis.demand_score,
  risk_score: .risk_analysis.risk_score,
  recommendation: .final_report | split("\n")[-2]
}' 2>/dev/null || echo "Failed to parse response"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════════"
echo "📊 SUMMARY"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Expected Score Ranges:"
echo "  🔴 WORST:  Feasibility 2-3,  Demand 1-2,   Risk 9-10"
echo "  🟡 BETTER: Feasibility 5-6,  Demand 6-7,   Risk 5-6"
echo "  🟢 BEST:   Feasibility 8-9,  Demand 8-9,   Risk 3-4"
echo ""
echo "✅ All tests complete!"
echo ""
