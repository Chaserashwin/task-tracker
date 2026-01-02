# Task Tracker - API Testing Guide

## Using Postman or cURL

### Health Check

```bash
curl http://localhost:5000/api/health
```

### 1. Create a Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Pending"
  }'
```

**Response:**

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "High",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "status": "Pending",
    "createdAt": "2024-01-02T10:00:00.000Z",
    "updatedAt": "2024-01-02T10:00:00.000Z"
  }
}
```

### 2. Get All Tasks

```bash
curl http://localhost:5000/api/tasks
```

### 3. Get All Tasks with Filters

```bash
# Filter by status
curl "http://localhost:5000/api/tasks?status=Pending"

# Filter by priority
curl "http://localhost:5000/api/tasks?priority=High"

# Filter by multiple criteria
curl "http://localhost:5000/api/tasks?status=Pending&priority=High"

# Sort by due date
curl "http://localhost:5000/api/tasks?sortBy=dueDate"

# Combined
curl "http://localhost:5000/api/tasks?status=Pending&sortBy=dueDate"
```

### 4. Get Single Task

```bash
curl http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

### 5. Update Task Status

```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439011/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Completed"
  }'
```

### 6. Update Entire Task

```bash
curl -X PUT http://localhost:5000/api/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task Title",
    "description": "Updated description",
    "priority": "Medium",
    "dueDate": "2024-12-25",
    "status": "Completed"
  }'
```

### 7. Delete Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

## Error Responses

### Validation Error

```json
{
  "message": "Task title is required"
}
```

### Not Found Error

```json
{
  "message": "Task not found"
}
```

### Invalid ID Error

```json
{
  "message": "Invalid task ID"
}
```

### Server Error

```json
{
  "message": "Error creating task",
  "error": "error details"
}
```

## Status Codes

| Code | Meaning                        |
| ---- | ------------------------------ |
| 200  | OK - Request successful        |
| 201  | Created - Resource created     |
| 400  | Bad Request - Validation error |
| 404  | Not Found - Resource not found |
| 500  | Server Error - Internal error  |

## Test Data Examples

### Low Priority Task

```json
{
  "title": "Review code",
  "description": "Check pull requests",
  "priority": "Low",
  "dueDate": "2024-12-15",
  "status": "Pending"
}
```

### Medium Priority Task

```json
{
  "title": "Team meeting",
  "description": "Weekly sync with team",
  "priority": "Medium",
  "dueDate": "2024-12-08",
  "status": "Pending"
}
```

### High Priority Task

```json
{
  "title": "Fix critical bug",
  "description": "Production issue causing downtime",
  "priority": "High",
  "dueDate": "2024-12-04",
  "status": "Pending"
}
```

## Testing Scenarios

### Scenario 1: Full Workflow

1. Create a task
2. Get all tasks
3. Update task status to Completed
4. Get all tasks again
5. Delete the task

### Scenario 2: Filtering

1. Create multiple tasks with different priorities
2. Create multiple tasks with different statuses
3. Test filters individually
4. Test combined filters

### Scenario 3: Error Handling

1. Create task without title (should fail)
2. Create task without due date (should fail)
3. Update non-existent task (should fail)
4. Delete non-existent task (should fail)

### Scenario 4: Sorting

1. Create tasks with different due dates
2. Get tasks sorted by due date
3. Verify order is correct

## Postman Collection

Save as `postman_collection.json`:

```json
{
  "info": {
    "name": "Task Tracker API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Create Task",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/tasks",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Task Title\",\n  \"description\": \"Description\",\n  \"priority\": \"High\",\n  \"dueDate\": \"2024-12-31\",\n  \"status\": \"Pending\"\n}"
        }
      }
    },
    {
      "name": "Get All Tasks",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/tasks"
      }
    },
    {
      "name": "Get Task by ID",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/tasks/{{task_id}}"
      }
    },
    {
      "name": "Update Task Status",
      "request": {
        "method": "PATCH",
        "url": "{{base_url}}/tasks/{{task_id}}/status",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"Completed\"\n}"
        }
      }
    },
    {
      "name": "Update Task",
      "request": {
        "method": "PUT",
        "url": "{{base_url}}/tasks/{{task_id}}",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Updated Title\",\n  \"description\": \"Updated Description\",\n  \"priority\": \"Medium\",\n  \"dueDate\": \"2024-12-25\",\n  \"status\": \"Pending\"\n}"
        }
      }
    },
    {
      "name": "Delete Task",
      "request": {
        "method": "DELETE",
        "url": "{{base_url}}/tasks/{{task_id}}"
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "task_id",
      "value": ""
    }
  ]
}
```

## Performance Testing

Use Apache JMeter or LoadRunner:

- Create 1000 tasks
- Make concurrent requests
- Monitor response times
- Check database performance

## Integration Testing Notes

- Test with real MongoDB connection
- Test all CRUD operations
- Test validation on all fields
- Test error scenarios
- Test concurrent requests
- Test database transactions
