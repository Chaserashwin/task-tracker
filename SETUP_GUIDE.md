# Complete Setup Guide - Task Tracker

Complete step-by-step guide to get Task Tracker running from scratch.

## Prerequisites

Before starting, ensure you have:

- [ ] Node.js v16 or higher ([Download](https://nodejs.org))
- [ ] npm or yarn (comes with Node.js)
- [ ] Git installed ([Download](https://git-scm.com))
- [ ] A MongoDB account (local or MongoDB Atlas)
- [ ] A text editor (VS Code recommended)

### Verify Installation

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check Git
git --version
```

---

## Step 1: Project Setup

### Clone/Download Project

```bash
# Navigate to your projects folder
cd "path/to/your/projects"

# Navigate to task-tracker directory
cd "task-tracker"
```

### Verify Structure

```bash
ls -la
# Should show:
# backend/
# frontend/
# README.md
# QUICKSTART.md
# etc.
```

---

## Step 2: MongoDB Setup

### Option A: Local MongoDB

1. **Install MongoDB Community**

   - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB**

   ```bash
   mongod
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/task-tracker
   ```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free Account**

   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up with email
   - Create free organization and project

2. **Create Cluster**

   - Click "Build a Cluster"
   - Select "Shared Cluster" (Free)
   - Choose region closest to you
   - Click "Create Cluster"

3. **Create Database User**

   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `admin` (or preferred username)
   - Password: Generate strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**

   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow access from anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses
   - Click "Confirm"

5. **Get Connection String**

   - Click "Clusters" → "Connect"
   - Select "Connect your application"
   - Choose "Node.js" driver
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `task-tracker`

   Example:

   ```
   mongodb+srv://admin:YourPassword123@cluster0.abc123.mongodb.net/task-tracker?retryWrites=true&w=majority
   ```

---

## Step 3: Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Create Environment File

```bash
# Copy example file
cp .env.example .env

# Edit .env file with your editor
```

### Configure .env

Edit `backend/.env`:

```bash
# Using Local MongoDB
MONGODB_URI=mongodb://localhost:27017/task-tracker
PORT=5000
NODE_ENV=development

# OR Using MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.xxx.mongodb.net/task-tracker?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Test Backend

```bash
# Start development server
npm run dev
```

Expected output:

```
Server is running on port 5000
MongoDB connected successfully
```

**Success!** Press `Ctrl+C` to stop. Keep it running for next step.

---

## Step 4: Frontend Setup

### In a New Terminal Window

```bash
# Navigate to frontend
cd frontend
npm install
```

### Create Environment File

```bash
# Copy example file
cp .env.example .env
```

### Configure .env

`frontend/.env` should contain:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Test Frontend

```bash
# Start development server
npm run dev
```

Expected output:

```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:5173/
```

**Open in browser:** http://localhost:5173

---

## Step 5: Application Testing

### Quick Test Workflow

1. **Create a Task**

   - Title: "My First Task"
   - Description: "Testing the application"
   - Priority: High
   - Due Date: Tomorrow
   - Click "Create Task"

2. **Expected Behavior**

   - Success notification appears
   - Task appears in the list below
   - Task shows all details

3. **Update Task**

   - Click "Edit" on the task
   - Change title to "Updated Task Title"
   - Click "Save Changes"
   - Success notification
   - Task title updated

4. **Mark as Complete**

   - Check the checkbox next to task
   - Task text becomes strikethrough
   - Status changes to "Completed"

5. **Delete Task**

   - Click "Delete"
   - Confirm deletion
   - Task disappears
   - Success notification

6. **Test Filters**
   - Create multiple tasks with different priorities
   - Filter by Status → see only Pending/Completed
   - Filter by Priority → see only High/Medium/Low
   - Sort by Due Date

---

## Step 6: API Testing (Optional)

### Using cURL

```bash
# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Pending"
  }'

# Get all tasks
curl http://localhost:5000/api/tasks

# Delete task (replace ID)
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE
```

### Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Import the collection from `API_TESTING.md`
3. Test each endpoint

---

## Step 7: Build for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend Build

Backend is already production-ready. Just use:

```bash
npm start
```

---

## Step 8: Deployment

### Quick Deployment (Render + Vercel)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Steps:**

1. Push to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Update environment variables

---

## Startup Commands Quick Reference

### Option A: Start Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Option B: Use Startup Scripts

**Windows:**

```bash
start.bat
```

**macOS/Linux:**

```bash
bash start.sh
```

---

## Directory Structure After Setup

```
task-tracker/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env (created)
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── node_modules/
│   ├── dist/ (after build)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env (created)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
├── DEPLOYMENT.md
└── ENVIRONMENT_VARIABLES.md
```

---

## Troubleshooting

### Backend Issues

**"Cannot find module 'mongoose'"**

```bash
cd backend
npm install
```

**"Port 5000 already in use"**

```bash
# Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

**"MongoDB connection failed"**

- Verify MONGODB_URI is correct
- For MongoDB Atlas: Check IP whitelist
- For Local MongoDB: Ensure mongod is running

### Frontend Issues

**"API call fails"**

- Backend must be running on port 5000
- Check VITE_API_URL in .env
- Check browser console for CORS errors

**"Port 5173 already in use"**

```bash
# Kill process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

**"npm install fails"**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Performance Tips

1. **Use MongoDB Atlas** for production (better performance)
2. **Enable compression** in Express
3. **Use indexes** on frequently queried fields
4. **Optimize images** before deployment
5. **Use CDN** for frontend assets

---

## Security Checklist

- [ ] Never commit .env files
- [ ] Use strong MongoDB passwords
- [ ] Enable MongoDB IP whitelist
- [ ] Use HTTPS in production
- [ ] Validate all inputs
- [ ] Keep dependencies updated
- [ ] Regular database backups

---

## Next Steps

1. **Customize the Application**

   - Modify styling with Tailwind
   - Add new features
   - Extend database schema

2. **Deploy to Production**

   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Set up CI/CD pipeline
   - Monitor application

3. **Learn More**
   - MongoDB docs: https://docs.mongodb.com
   - Express docs: https://expressjs.com
   - React docs: https://react.dev
   - Tailwind docs: https://tailwindcss.com

---

## Getting Help

- Check [QUICKSTART.md](QUICKSTART.md) for quick setup
- See [API_TESTING.md](API_TESTING.md) for API details
- Read [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for config help
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment

---

## Success Criteria

✅ Application is working if:

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend API responds at http://localhost:5000/api/health
- [ ] Can create tasks in UI
- [ ] Can see tasks in UI
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] Filters and sorting work
- [ ] Notifications appear
- [ ] Validation works (required fields)
- [ ] No console errors

**Congratulations! Your Task Tracker is ready to use!** 🎉
