const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = {
  // Create a new task
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create task");
    }
    return data;
  },

  // Get all tasks
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);

    const response = await fetch(`${API_BASE_URL}/tasks?${params.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch tasks");
    }
    return data;
  },

  // Get a single task by ID
  getTaskById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch task");
    }
    return data;
  },

  // Update task status
  updateTaskStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update task status");
    }
    return data;
  },

  // Update entire task
  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update task");
    }
    return data;
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete task");
    }
    return data;
  },
};
