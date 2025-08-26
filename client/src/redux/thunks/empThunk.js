import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios.js";
import ErrorHandler from "../../services/ErrorHandler";

// create employee
export const createEmp = createAsyncThunk("emp/create", async (data, thunk) => {
  try {
    const res = await axios.post("/employees", data);
    return thunk.fulfillWithValue(res?.data);
  } catch (err) {
    return thunk.rejectWithValue(
      ErrorHandler(err, "Failed to create employee")
    );
  }
});

// fetch employee by id
export const fetchEmpById = createAsyncThunk(
  "emp/fetchById",
  async (id, thunk) => {
    try {
      const res = await axios.get(`/employees/${id}`);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(
        ErrorHandler(err, "Failed to fetch employee")
      );
    }
  }
);

// fetch all employees
export const fetchAllEmp = createAsyncThunk(
  "emp/fetchAll",
  async (_, thunk) => {
    try {
      const res = await axios.get("/employees");
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(
        ErrorHandler(err, "Failed to fetch employees")
      );
    }
  }
);

// update employee
export const updateEmp = createAsyncThunk(
  "emp/update",
  async ({ id, empData }, thunk) => {
    try {
      const res = await axios.put(`/employees/${id}`, empData);
      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      return thunk.rejectWithValue(
        ErrorHandler(err, "Failed to update employee")
      );
    }
  }
);

// delete employee
export const deleteEmp = createAsyncThunk("emp/delete", async (id, thunk) => {
  try {
    const res = await axios.delete(`/employees/${id}`);
    return thunk.fulfillWithValue(res?.data);
  } catch (err) {
    return thunk.rejectWithValue(
      ErrorHandler(err, "Failed to delete employee")
    );
  }
});
