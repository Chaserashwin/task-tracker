import React from "react";

const TaskItem = ({ task, onStatusChange, onDelete, onEdit }) => {
  const isCompleted = task.status === "Completed";
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const statusColors = {
    Pending: "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusToggle = () => {
    const newStatus = isCompleted ? "Pending" : "Completed";
    onStatusChange(task._id, newStatus);
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
        isCompleted ? "border-gray-400" : "border-blue-500"
      } mb-4 transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleStatusToggle}
              className="w-5 h-5 text-blue-600 rounded cursor-pointer"
            />
            <h3
              className={`text-lg font-semibold ${
                isCompleted ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p
              className={`text-sm mb-2 ${
                isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
            <span className="text-xs text-gray-500">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
