const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (!dueDate) {
      return res.status(400).json({ message: "Due date is required" });
    }

    // Check if due date is valid
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    // Validate priority
    if (priority && !["Low", "Medium", "High"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "Priority must be Low, Medium, or High" });
    }

    // Validate status
    if (status && !["Pending", "Completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Pending or Completed" });
    }

    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : "",
      priority: priority || "Medium",
      dueDate: dueDateObj,
      status: status || "Pending",
    });

    const savedTask = await task.save();
    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { status, priority, sortBy } = req.query;

    // Build filter object
    const filter = {};
    if (status && ["Pending", "Completed"].includes(status)) {
      filter.status = status;
    }
    if (priority && ["Low", "Medium", "High"].includes(priority)) {
      filter.priority = priority;
    }

    // Build sort object
    let sortObj = { createdAt: -1 }; // Default sort by creation date (newest first)
    if (sortBy === "dueDate") {
      sortObj = { dueDate: 1 }; // Sort by due date ascending
    } else if (sortBy === "priority") {
      sortObj = { priority: 1 }; // Sort by priority
    }

    const tasks = await Task.find(filter).sort(sortObj);
    res.status(200).json({
      message: "Tasks retrieved successfully",
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving tasks", error: error.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task retrieved successfully",
      task: task,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res
      .status(500)
      .json({ message: "Error retrieving task", error: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["Pending", "Completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Pending or Completed" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: task,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Update entire task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    // Validate inputs
    if (title !== undefined && (!title || title.trim() === "")) {
      return res.status(400).json({ message: "Task title cannot be empty" });
    }

    if (dueDate !== undefined) {
      const dueDateObj = new Date(dueDate);
      if (isNaN(dueDateObj.getTime())) {
        return res.status(400).json({ message: "Invalid due date format" });
      }
    }

    if (priority && !["Low", "Medium", "High"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "Priority must be Low, Medium, or High" });
    }

    if (status && !["Pending", "Completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Pending or Completed" });
    }

    // Build update object
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (status !== undefined) updateData.status = status;

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: task,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: task,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};
