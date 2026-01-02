# Environment Variables Configuration

## Backend Environment Variables

### File: `backend/.env`

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Detailed Explanation

#### MONGODB_URI

- **Purpose:** MongoDB connection string
- **Development:** Use local MongoDB or MongoDB Atlas
- **Production:** Use MongoDB Atlas (recommended)
- **Format:** `mongodb+srv://username:password@host/database?options`

**Examples:**

Local MongoDB:

```
MONGODB_URI=mongodb://localhost:27017/task-tracker
```

MongoDB Atlas (Cloud):

```
MONGODB_URI=mongodb+srv://admin:password123@cluster0.abc123.mongodb.net/task-tracker?retryWrites=true&w=majority
```

#### PORT

- **Purpose:** Server listening port
- **Default:** 5000
- **Range:** 1024-65535 (use ports > 1024 to avoid permission issues)

#### NODE_ENV

- **Purpose:** Environment mode
- **Values:** `development` or `production`
- **Development:** Enables detailed error messages and hot reload
- **Production:** Optimized performance, minimal logging

#### CORS_ORIGIN

- **Purpose:** Allow cross-origin requests from specific domain
- **Development:** `http://localhost:5173` (Vite default)
- **Production:** Your frontend domain (e.g., `https://yourdomain.com`)

---

## Frontend Environment Variables

### File: `frontend/.env`

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Detailed Explanation

#### VITE_API_URL

- **Purpose:** Backend API base URL
- **Development:** `http://localhost:5000/api`
- **Production:** Production backend URL (e.g., `https://api.yourdomain.com/api`)
- **Note:** Must match backend deployment URL

---

## Environment Specific Configurations

### Development Environment

**Backend (.env):**

```bash
MONGODB_URI=mongodb://localhost:27017/task-tracker
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**

```bash
VITE_API_URL=http://localhost:5000/api
```

### Production Environment (Render/Heroku)

**Backend (.env):**

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Frontend (.env):**

```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Securing Environment Variables

### Best Practices

1. **Never commit .env files to Git**

   ```bash
   # Already in .gitignore, but verify:
   echo ".env" >> .gitignore
   ```

2. **Use .env.example for templates**

   ```bash
   # Shows team what variables are needed
   cp .env .env.example
   # Then remove sensitive values from .env.example
   ```

3. **Different secrets per environment**

   - Development: Local/test values
   - Staging: Real but non-critical
   - Production: Real, critical values

4. **Rotate sensitive data regularly**

   - Change MongoDB passwords quarterly
   - Rotate API keys when team members leave
   - Monitor access logs

5. **Use environment-specific secrets**
   - Never use production secrets in development
   - Keep production secrets in secure vault
   - Use services like AWS Secrets Manager, Vault, etc.

---

## Setting Up MongoDB Connection

### Local MongoDB

1. **Install MongoDB**

   - macOS: `brew install mongodb-community`
   - Windows: Download from mongodb.com
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB**

   ```bash
   mongod
   ```

3. **Connection String**
   ```
   MONGODB_URI=mongodb://localhost:27017/task-tracker
   ```

### MongoDB Atlas (Cloud - Recommended)

1. **Create Account**

   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**

   - Create a shared cluster (free tier)
   - Choose your region

3. **Create Database User**

   - Security → Database Access
   - Add username and password
   - Select "Read and write to any database"

4. **Get Connection String**

   - Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

5. **Add IP Whitelist**
   - Security → Network Access
   - Add IP address (0.0.0.0/0 for development only)
   - For production: Use specific IPs

**Example Connection String:**

```
mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/task-tracker?retryWrites=true&w=majority
```

---

## Deployment-Specific Instructions

### Render

1. **Create Environment Variables:**

   - Dashboard → Environment
   - Add each variable:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB URI
   - Click Save

2. **Redeploy** after adding variables

### Vercel (Frontend)

1. **Project Settings**

   - Settings → Environment Variables
   - Add: `VITE_API_URL` → Your backend URL
   - Select environments: Production, Preview, Development

2. **Deploy** - Changes take effect on next push

### Heroku (Backend)

```bash
# Set single variable
heroku config:set MONGODB_URI=your_mongodb_uri

# Set multiple variables
heroku config:set NODE_ENV=production CORS_ORIGIN=https://yourdomain.com

# View all variables
heroku config

# Remove variable
heroku config:unset MONGODB_URI
```

---

## Testing Environment Variables

### Backend

```javascript
// In your server.js, add:
console.log("Environment:", process.env.NODE_ENV);
console.log("API Port:", process.env.PORT);
console.log("CORS Origin:", process.env.CORS_ORIGIN);
```

### Frontend

```javascript
// In your App.jsx, add:
console.log("API URL:", import.meta.env.VITE_API_URL);
```

---

## Troubleshooting

### "Cannot connect to MongoDB"

- Check MONGODB_URI is correct
- Verify IP address is whitelisted in MongoDB Atlas
- Test connection string in MongoDB Compass

### "API Connection Failed"

- Check VITE_API_URL matches backend URL
- Verify backend is running
- Check CORS configuration
- Look for typos in variable names

### "Variable is undefined"

- Ensure .env file exists and is saved
- Restart development server
- Use correct variable name prefix (`VITE_` for frontend)
- Check for trailing spaces

### "CORS Error"

- Add CORS_ORIGIN to backend .env
- Verify frontend URL matches CORS_ORIGIN
- Clear browser cache
- Check browser console for exact origin

---

## Environment Variable Reference

| Variable     | Type   | Required | Default                   | Environment |
| ------------ | ------ | -------- | ------------------------- | ----------- |
| MONGODB_URI  | String | Yes      | -                         | Backend     |
| PORT         | Number | No       | 5000                      | Backend     |
| NODE_ENV     | String | No       | development               | Backend     |
| CORS_ORIGIN  | String | No       | http://localhost:5173     | Backend     |
| VITE_API_URL | String | No       | http://localhost:5000/api | Frontend    |

---

## Security Checklist

- [ ] .env not committed to Git
- [ ] .env.example exists without secrets
- [ ] Different secrets per environment
- [ ] Production secrets are strong
- [ ] MongoDB Atlas IP whitelist configured
- [ ] CORS_ORIGIN set correctly
- [ ] No hardcoded secrets in code
- [ ] Team knows not to share .env files
