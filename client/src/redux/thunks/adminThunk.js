import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios.js";
import ErrorHandler from "../../services/ErrorHandler.js";

// Admin Login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, thunk) => {
    try {
      const res = await axios.post("/admin/login", credentials);

      return thunk.fulfillWithValue(res?.data);
    } catch (err) {
      console.log(err);

      return thunk.rejectWithValue(ErrorHandler(err, "Failed to login admin"));
    }
  }
);
