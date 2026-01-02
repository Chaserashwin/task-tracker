# Deployment Guide - Task Tracker

This guide covers deploying both frontend and backend to production.

## Option 1: Deploy to Render (Recommended - Free Tier)

### Backend Deployment to Render

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render account** at https://render.com

3. **Deploy Backend:**

   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name:** task-tracker-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

4. **Add Environment Variables:**

   - In Render dashboard, go to Environment
   - Add:
     ```
     MONGODB_URI=your_mongodb_uri
     PORT=5000
     NODE_ENV=production
     ```

5. **Frontend .env Update:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Frontend Deployment to Vercel

1. **Create Vercel account** at https://vercel.com

2. **Import Project:**

   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Select `frontend` folder as root

3. **Configure:**

   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables:**

   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.onrender.com/api`

5. **Deploy** - Vercel will auto-deploy on git push

## Option 2: Deploy to Heroku (Backend)

### Prerequisites

- Heroku account
- Heroku CLI installed

### Steps

1. **Create Heroku app:**

   ```bash
   cd backend
   heroku login
   heroku create your-app-name
   ```

2. **Add MongoDB URI:**

   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set NODE_ENV=production
   ```

3. **Deploy:**

   ```bash
   git push heroku main
   ```

4. **View logs:**
   ```bash
   heroku logs --tail
   ```

## Option 3: Deploy to AWS (Full Stack)

### Backend with EC2 + RDS

- Create EC2 instance
- Install Node.js and dependencies
- Deploy backend code
- Set environment variables
- Use RDS for MongoDB Atlas (or install MongoDB locally)

### Frontend with S3 + CloudFront

- Build frontend: `npm run build`
- Upload `dist` folder to S3
- Use CloudFront for CDN
- Update API URL to backend

## Option 4: Deploy Locally with Docker

### Create Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t task-tracker-backend .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=your_mongodb_uri \
  task-tracker-backend
```

## MongoDB Atlas Setup

1. **Create Account:** https://www.mongodb.com/cloud/atlas

2. **Create Project & Cluster:**

   - Click "Create a Project"
   - Create Shared Cluster (Free)
   - Choose region

3. **Create Database User:**

   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username and password
   - Add IP Address (allow all: 0.0.0.0/0)

4. **Get Connection String:**

   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your DB user password

5. **Connection String Format:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
   ```

## Deployment Checklist

### Before Deployment

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] API endpoints verified
- [ ] Frontend builds without errors
- [ ] Responsive design tested
- [ ] All features working

### After Deployment

- [ ] Backend health endpoint responds
- [ ] Frontend loads correctly
- [ ] API endpoints accessible
- [ ] Create task works
- [ ] Fetch tasks works
- [ ] Update task works
- [ ] Delete task works
- [ ] Filters and sorting work
- [ ] Form validation works
- [ ] Notifications display
- [ ] Error handling works

## Performance Tips

1. **Enable Gzip Compression:**

   ```javascript
   // In backend server.js
   const compression = require("compression");
   app.use(compression());
   ```

2. **Add Caching Headers:**

   ```javascript
   app.use((req, res, next) => {
     res.setHeader("Cache-Control", "max-age=3600");
     next();
   });
   ```

3. **Database Indexing:**

   ```javascript
   // In Task.js
   taskSchema.index({ status: 1 });
   taskSchema.index({ priority: 1 });
   taskSchema.index({ dueDate: 1 });
   ```

4. **Frontend Optimization:**
   - Tree-shaking enabled in Vite
   - Image optimization
   - Code splitting
   - Lazy loading

## Monitoring

### Backend Monitoring

- Use services like:
  - New Relic
  - DataDog
  - Sentry (for error tracking)

### Frontend Monitoring

- Google Analytics
- Sentry
- LogRocket

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install backend dependencies
        run: cd backend && npm install

      - name: Install frontend dependencies
        run: cd frontend && npm install

      - name: Build frontend
        run: cd frontend && npm run build

      - name: Deploy backend
        run: cd backend && npm start
```

## Troubleshooting Deployment

### CORS Errors

- Check backend CORS configuration
- Verify frontend API URL
- Ensure backend is running

### MongoDB Connection Failed

- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Verify username/password

### Build Failures

- Check Node.js version
- Verify all dependencies installed
- Check build scripts in package.json

### 404 Errors

- Verify routes configuration
- Check API endpoint URLs
- Ensure backend is serving API

## Cost Estimation

### Free Tier Options

- **Render:** 750 hours/month free
- **Vercel:** Unlimited free builds
- **MongoDB Atlas:** Shared cluster free
- **Total:** ~$0/month (with limits)

### Paid Options

- Backend: $5-20/month
- Frontend: Already free on Vercel
- Database: $0-100+/month depending on usage

## Security Best Practices

1. **Use HTTPS everywhere**
2. **Never commit .env files**
3. **Use strong MongoDB passwords**
4. **Enable MongoDB IP whitelist**
5. **Use environment variables for secrets**
6. **Validate all inputs**
7. **Use CORS properly**
8. **Keep dependencies updated**

## Domain & DNS Setup

1. **Buy domain** from GoDaddy, Namecheap, etc.
2. **Update DNS records:**
   ```
   CNAME: www → your-vercel-deployment
   A: → Render backend IP
   ```
3. **Update API URL** in frontend .env

## Post-Deployment

- [ ] Monitor application daily
- [ ] Check error logs
- [ ] Monitor database usage
- [ ] Get user feedback
- [ ] Plan feature updates
- [ ] Schedule maintenance windows
