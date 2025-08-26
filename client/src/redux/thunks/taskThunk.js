import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios.js";
import ErrorHandler from "../../services/ErrorHandler";

// Create Task
export const createTask = createAsyncThunk(
  "task/create",
  async (data, thunk) => {
    try {
      const res = await axios.post("/tasks", data);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(ErrorHandler(err, "Failed to create task"));
    }
  }
);

// Fetch Task by ID
export const fetchTaskById = createAsyncThunk(
  "task/fetchById",
  async (id, thunk) => {
    try {
      const res = await axios.get(`/tasks/${id}`);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(ErrorHandler(err, "Failed to fetch task"));
    }
  }
);

// Fetch All Tasks
export const fetchAllTasks = createAsyncThunk(
  "task/fetchAll",
  async (_, thunk) => {
    try {
      const res = await axios.get("/tasks");
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(ErrorHandler(err, "Failed to fetch tasks"));
    }
  }
);

// Fetch Tasks by Employee ID
export const fetchTasksByEmpId = createAsyncThunk(
  "task/fetchByEmp",
  async (empId, thunk) => {
    try {
      const res = await axios.get(`/tasks/employee/${empId}`);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(
        ErrorHandler(err, "Failed to fetch tasks for employee")
      );
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, taskData }, thunk) => {
    try {
      const res = await axios.put(`/tasks/${id}`, taskData);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(ErrorHandler(err, "Failed to update task"));
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk("task/delete", async (id, thunk) => {
  try {
    const res = await axios.delete(`/tasks/${id}`);
    return thunk.fulfillWithValue(res?.data);
  } catch (err) {
    return thunk.rejectWithValue(ErrorHandler(err, "Failed to delete task"));
  }
});
