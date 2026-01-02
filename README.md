# Task Tracker - Full Stack MERN Application

A comprehensive task management web application built with the MERN stack (MongoDB, Express, React, Node.js) using Vite and Tailwind CSS.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Complete Setup Guide](SETUP_GUIDE.md)** - Detailed step-by-step setup
- **[API Testing Guide](API_TESTING.md)** - API endpoints and testing
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[Environment Variables](ENVIRONMENT_VARIABLES.md)** - Configuration guide

## Features

### Core Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Task Title, Description, Priority, Due Date, Status
- ✅ Client-side validation with clear error messages
- ✅ Responsive design for all screen sizes
- ✅ Dynamic updates without full page reload

### Bonus Features

- ✅ Filter tasks by Status and Priority
- ✅ Sort tasks by Due Date and Priority
- ✅ Success and error notifications
- ✅ Reusable components and clean project structure
- ✅ Environment variable usage
- ✅ Edit tasks functionality
- ✅ Checkbox to mark tasks as complete

## Tech Stack

### Frontend

- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool
- **Tailwind CSS 4.1.0** - Styling framework
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 8.0.0** - ODM (Object Document Mapper)
- **CORS 2.8.5** - Cross-Origin Resource Sharing

## Project Structure

```
task-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   └── tasks.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── client.js
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskItem.jsx
    │   │   ├── FilterSort.jsx
    │   │   ├── EditTaskModal.jsx
    │   │   └── Notification.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (Local or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create .env file:**

   ```bash
   cp .env.example .env
   ```

4. **Update .env with your MongoDB URI:**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create .env file:**

   ```bash
   cp .env.example .env
   ```

4. **Update .env (optional, default is localhost:5000):**

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Create a Task

- **POST** `/tasks`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description (optional)",
    "priority": "Low|Medium|High",
    "dueDate": "2024-12-31",
    "status": "Pending|Completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task created successfully",
    "task": { ... }
  }
  ```

#### 2. Get All Tasks

- **GET** `/tasks?status=Pending&priority=High&sortBy=dueDate`
- **Query Parameters (all optional):**
  - `status`: Filter by status (Pending or Completed)
  - `priority`: Filter by priority (Low, Medium, or High)
  - `sortBy`: Sort by field (dueDate or priority)
- **Response:**
  ```json
  {
    "message": "Tasks retrieved successfully",
    "count": 5,
    "tasks": [ ... ]
  }
  ```

#### 3. Get a Single Task

- **GET** `/tasks/:id`
- **Response:**
  ```json
  {
    "message": "Task retrieved successfully",
    "task": { ... }
  }
  ```

#### 4. Update Task Status

- **PATCH** `/tasks/:id/status`
- **Request Body:**
  ```json
  {
    "status": "Completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task updated successfully",
    "task": { ... }
  }
  ```

#### 5. Update Entire Task

- **PUT** `/tasks/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task updated successfully",
    "task": { ... }
  }
  ```

#### 6. Delete a Task

- **DELETE** `/tasks/:id`
- **Response:**
  ```json
  {
    "message": "Task deleted successfully",
    "task": { ... }
  }
  ```

## Database Schema

### Task Model

```javascript
{
  _id: ObjectId,
  title: String (required, max 100),
  description: String (optional, max 500),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  dueDate: Date (required),
  status: String (enum: ['Pending', 'Completed'], default: 'Pending'),
  createdAt: Date (timestamp),
  updatedAt: Date (timestamp)
}
```

## Frontend Components

### TaskForm

- Form to create new tasks
- Client-side validation
- Disabled submit button until validation passes
- Error message display

### TaskList

- Displays all tasks
- Shows loading state
- Shows empty state message

### TaskItem

- Individual task card
- Checkbox to toggle completion status
- Shows task details (title, description, priority, status, due date)
- Edit and Delete buttons

### FilterSort

- Filter tasks by status and priority
- Sort tasks by different criteria

### EditTaskModal

- Modal dialog for editing tasks
- Form validation
- Save and Cancel buttons

### Notification

- Toast notification for success/error messages
- Auto-dismiss after 3 seconds

## Validation

### Frontend Validation

- Task title is required
- Due date is required and must be valid
- Form submit button is disabled until validation passes
- Real-time error clearing as user types

### Backend Validation

- All required fields validation
- Data type validation
- Enum validation for priority and status
- Max length validation for title and description
- MongoDB schema validation

## Error Handling

### Frontend

- Try-catch blocks for API calls
- User-friendly error messages via notifications
- Form validation errors displayed inline

### Backend

- Validation error responses with 400 status
- Not found errors with 404 status
- Server errors with 500 status
- Error details included in response

## Deployment

### Backend Deployment (Heroku example)

1. **Create a Heroku account** and install Heroku CLI

2. **Create a new app:**

   ```bash
   heroku create task-tracker-backend
   ```

3. **Set environment variables:**

   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set NODE_ENV=production
   ```

4. **Push to Heroku:**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel example)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Update environment variables in Vercel dashboard**

## Performance Optimizations

- React.useState for state management
- Efficient re-rendering
- Event debouncing for filters
- Optimized API calls
- Responsive images and assets

## Security Considerations

- Input validation on both frontend and backend
- Environment variables for sensitive data
- CORS configuration
- MongoDB injection prevention through Mongoose
- Error messages don't expose sensitive information

## Future Enhancements

- User authentication and authorization
- Multiple user support with task sharing
- Recurring tasks
- Task reminders and notifications
- Calendar view
- Task categories/tags
- Export tasks as PDF/CSV
- Dark mode theme
- Real-time updates using WebSockets
- Task dependencies

## Troubleshooting

### MongoDB Connection Error

- Verify MongoDB URI is correct
- Check if MongoDB service is running
- Ensure network access in MongoDB Atlas

### Frontend API Connection Error

- Verify backend server is running on port 5000
- Check CORS configuration
- Verify VITE_API_URL in .env

### CORS Error

- Ensure backend has CORS middleware enabled
- Check frontend API URL matches backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📬 Author

**Ashwin Jaiswal**
Full-Stack Developer (MERN)

## License

MIT License - feel free to use this project for personal or commercial purposes.
