import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterSort from "./components/FilterSort";
import EditTaskModal from "./components/EditTaskModal";
import { Notification } from "./components/Notification";
import { apiClient } from "./api/client";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch tasks on component mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.getAllTasks(filters);
      setTasks(response.tasks || []);
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleCreateTask = async (taskData) => {
    setIsLoading(true);
    try {
      await apiClient.createTask(taskData);
      showNotification("Task created successfully!", "success");
      fetchTasks();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await apiClient.updateTaskStatus(taskId, newStatus);
      showNotification("Task status updated!", "success");
      fetchTasks();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await apiClient.deleteTask(taskId);
        showNotification("Task deleted successfully!", "success");
        fetchTasks();
      } catch (error) {
        showNotification(error.message, "error");
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedTask = async (taskData) => {
    try {
      await apiClient.updateTask(editingTask._id, taskData);
      showNotification("Task updated successfully!", "success");
      setIsEditModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortValue,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Tracker
          </h1>
          <p className="text-gray-600">
            Organize and manage your daily tasks efficiently
          </p>
        </header>

        {/* Notification */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            duration={3000}
          />
        )}

        {/* Task Form */}
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />

        {/* Filter and Sort */}
        <FilterSort
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isLoading={isLoading}
        />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveEditedTask}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
