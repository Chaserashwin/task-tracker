#!/bin/bash

# Task Tracker - Full Stack Startup Script
# This script starts both backend and frontend servers

echo "🚀 Task Tracker - Starting Full Stack Application"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if MongoDB is running (optional)
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB not found in PATH (you can still use MongoDB Atlas)${NC}"
fi

# Start Backend
echo ""
echo -e "${YELLOW}Starting Backend Server...${NC}"
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Backend .env file not found!${NC}"
    echo "Please create backend/.env with your MongoDB URI:"
    echo "  MONGODB_URI=your_mongodb_uri"
    echo "  PORT=5000"
    echo "  NODE_ENV=development"
    exit 1
fi

npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
sleep 2

# Start Frontend
echo ""
echo -e "${YELLOW}Starting Frontend Development Server...${NC}"
cd ../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
sleep 2

# Print URLs
echo ""
echo "=================================================="
echo -e "${GREEN}✓ Application Started Successfully!${NC}"
echo "=================================================="
echo ""
echo "Frontend URL:  http://localhost:5173"
echo "Backend URL:   http://localhost:5000"
echo "API Base URL:  http://localhost:5000/api"
echo ""
echo "To stop the application, press Ctrl+C"
echo ""

# Keep script running and handle exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait
