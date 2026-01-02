import React from "react";

const FilterSort = ({ filters, onFilterChange, onSortChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Filter & Sort
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label
            htmlFor="priorityFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Priority
          </label>
          <select
            id="priorityFilter"
            value={filters.priority || ""}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy || ""}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Created Date (Newest)</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
