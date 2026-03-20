# Test script for Windows PowerShell

$API_URL = "http://localhost:8000/api"

Write-Host "🧪 Testing AI Business Idea Validator" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣ Health Check" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "$API_URL/health" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
Write-Host ""

# Test 2: Validate SaaS Idea
Write-Host "2️⃣ Validating SaaS Idea" -ForegroundColor Yellow
$body = @{
    idea = "AI-powered platform for remote team productivity analytics with real-time monitoring"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "$API_URL/validate" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
$response.Content | ConvertFrom-Json | ConvertTo-Json
Write-Host ""

# Test 3: Get Reddit Signals
Write-Host "3️⃣ Fetching Reddit Signals" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "$API_URL/signals?source=reddit&query=AI+productivity" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
Write-Host ""

Write-Host "✅ All tests completed!" -ForegroundColor Green
