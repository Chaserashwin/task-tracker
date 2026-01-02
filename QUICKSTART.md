# Quick Start Guide

## Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- Git

## Step-by-Step Setup

### 1. Clone/Setup the Project

```bash
cd task-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup (in new terminal)

```bash
cd frontend
npm install
npm run dev
```

App will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/task-tracker
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

### Local MongoDB

```bash
mongod
```

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Use in MONGODB_URI

## API Health Check

```bash
curl http://localhost:5000/api/health
```

## Testing Tasks

### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Task",
    "description": "This is a test task",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Pending"
  }'
```

### Get All Tasks

```bash
curl http://localhost:5000/api/tasks
```

### Get All Tasks with Filters

```bash
curl "http://localhost:5000/api/tasks?status=Pending&priority=High&sortBy=dueDate"
```

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

Build output in `frontend/dist`

### Backend

Production ready - just deploy with Node.js

## Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection tested
- [ ] Frontend API URL updated
- [ ] Tested all CRUD operations
- [ ] Error handling working
- [ ] Notifications displaying
- [ ] Responsive design tested
- [ ] All filters and sorting working
- [ ] Form validation working
