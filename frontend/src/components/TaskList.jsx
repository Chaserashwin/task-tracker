import React from "react";

const TaskList = ({ tasks, onStatusChange, onDelete, onEdit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">
          No tasks found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={task.status === "Completed"}
                    onChange={() =>
                      onStatusChange(
                        task._id,
                        task.status === "Completed" ? "Pending" : "Completed"
                      )
                    }
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <h3
                    className={`text-lg font-semibold ${
                      task.status === "Completed"
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                {task.description && (
                  <p
                    className={`text-sm mb-2 ${
                      task.status === "Completed"
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 items-center mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === "Completed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
        ))}
      </div>
    </div>
  );
};

export default TaskList;
