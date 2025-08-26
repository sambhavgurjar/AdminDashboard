import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../thunks/adminThunk.js";


const token = localStorage.getItem("adminToken");
const role = localStorage.getItem("adminRole");

const initialState = {
  isAuthenticated: !!(token && role), 
  token: token || null,
  role: role || null,
  loading: false,
  error: null,
  success: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;
      state.success = false;

      // Clear from localStorage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.token = action.payload?.data?.token || null;
        state.role = action.payload?.data?.role || null;

        // Save in localStorage
        if (state.token) {
          localStorage.setItem("adminToken", state.token);
        }
        if (state.role) {
          localStorage.setItem("adminRole", state.role);
        }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Admin login failed";
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
