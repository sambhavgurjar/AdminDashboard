import {
  createEmp,
  fetchAllEmp,
  fetchEmpById,
  updateEmp,
  deleteEmp,
} from "../thunks/empThunk.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emps: [],
  targetEmp: null,
  fetchEmpSuccess: null,
  fetchAllEmpSuccess: null,
  updateEmpSuccess: null,
  deleteEmpSuccess: null,
  createEmpSuccess: null,
  loading: false,
  error: false,
  message: null,
};

const empSlice = createSlice({
  name: "emp",
  initialState,
  reducers: {
    clearEmpStatus: (state) => {
      state.fetchEmpSuccess = null;
      state.fetchAllEmpSuccess = null;
      state.updateEmpSuccess = null;
      state.deleteEmpSuccess = null;
      state.createEmpSuccess = null;
      state.error = false;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Employees
    builder
      .addCase(fetchAllEmp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.fetchAllEmpSuccess = null;
      })
      .addCase(fetchAllEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.emps = action.payload?.data || [];
        state.fetchAllEmpSuccess = true;
      })
      .addCase(fetchAllEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.fetchAllEmpSuccess = false;
        state.message = action.payload;
      });

    // Fetch Employee by ID
    builder
      .addCase(fetchEmpById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.fetchEmpSuccess = null;
      })
      .addCase(fetchEmpById.fulfilled, (state, action) => {
        state.loading = false;
        state.targetEmp = action.payload?.data || null;
        state.fetchEmpSuccess = true;
      })
      .addCase(fetchEmpById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.fetchEmpSuccess = false;
        state.message = action.payload;
      });

    // Create Employee
    builder
      .addCase(createEmp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.createEmpSuccess = null;
      })
      .addCase(createEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.emps.push(action.payload?.data);
        state.createEmpSuccess = true;
      })
      .addCase(createEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.createEmpSuccess = false;
        state.message = action.payload;
      });

    // Update Employee
    builder
      .addCase(updateEmp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.updateEmpSuccess = null;
      })
      .addCase(updateEmp.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.emps.findIndex(
          (emp) => emp.id === action.payload?.data?.id
        );
        if (index !== -1) state.emps[index] = action.payload?.data;
        state.updateEmpSuccess = true;
      })
      .addCase(updateEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.updateEmpSuccess = false;
        state.message = action.payload;
      });

    // Delete Employee
    builder
      .addCase(deleteEmp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.deleteEmpSuccess = null;
      })
      .addCase(deleteEmp.fulfilled, (state, action) => {
        state.loading = false;
        //   console.log(action.payload);

        state.emps = state.emps.filter(
          (emp) => emp._id !== action.payload?.data?._id
        );
        state.deleteEmpSuccess = true;
      })
      .addCase(deleteEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.deleteEmpSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { clearEmpStatus } = empSlice.actions;
export default empSlice.reducer;
