#!/bin/bash

echo "========================================"
echo "  HealthPredict - Starting All Services"
echo "========================================"
echo ""
echo "Starting ML Service, Backend API, and Frontend..."
echo ""
echo "- ML Service:    http://localhost:8000"
echo "- Backend API:   http://localhost:5000"
echo "- Frontend:      http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo "========================================"
echo ""

npm run dev:all
