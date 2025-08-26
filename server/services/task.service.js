const TASK = require("../model/task.model.js");
const AppError = require("../utils/AppError.js");

//create a task
exports.createTask = async (data) => {
  try {
    let  task= new TASK(data);
    await task.save();
    return {
      success: true,
      message: "Task created successfully",
      data: null,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//fetch  task by id

exports.fetchTaskById = async (id) => {
  try {
    let task = await TASK.findById(id).populate("assignEmp");
    if (!task) throw new AppError("Task Not Found", 404);
    return {
      success: true,
      message: "Task data fetched successfully",
      data: task,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};


//fetch  task by employee id

exports.fetchTaskByEmpId = async (empId) => {
  try {
    let task = await TASK.find({assignEmp:empId}).populate("assignEmp");
    if (!task) throw new AppError("Task Not Found", 404);
    return {
      success: true,
      message: "Task data fetched successfully",
      data: task,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//fetch all task data

exports.fetchAllTask = async () => {
  try {
    let tasks = await TASK.find().populate("assignEmp");
    return {
      success: true,
      message: "Tasks data fetched successfully",
      data: tasks,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//update employee data by id

exports.updateTask = async (id, data) => {
  try {
    let task = await TASK.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!task) throw new AppError("task data not found", 404);
    return {
      success: true,
      message: "Employee data updated successfully",
      data:task,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//delete a task by id

exports.deleteTask = async (id) => {
  try {
    let task = await TASK.findByIdAndDelete(id);
    if (!task) throw new AppError("Task data not found", 404);
    return {
      success: true,
      message: "Task data deleted successfully",
      data: task,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};
