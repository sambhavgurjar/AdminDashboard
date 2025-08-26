import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTaskById,
  fetchAllTasks,
  fetchTasksByEmpId,
  updateTask,
  deleteTask,
} from "../thunks/taskThunk.js";

const initialState = {
  tasks: [],
  targetTask: null,
  empTasks: [],
  createTaskSuccess: null,
  fetchTaskSuccess: null,
  fetchAllTasksSuccess: null,
  fetchEmpTasksSuccess: null,
  updateTaskSuccess: null,
  deleteTaskSuccess: null,
  loading: false,
  error: false,
  message: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskStatus: (state) => {
      state.createTaskSuccess = null;
      state.fetchTaskSuccess = null;
      state.fetchAllTasksSuccess = null;
      state.fetchEmpTasksSuccess = null;
      state.updateTaskSuccess = null;
      state.deleteTaskSuccess = null;
      state.error = false;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Create Task
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.createTaskSuccess = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload?.data);
        state.createTaskSuccess = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.createTaskSuccess = false;
        state.message = action.payload;
      });

    // Fetch Task by ID
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.fetchTaskSuccess = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.targetTask = action.payload?.data || null;
        state.fetchTaskSuccess = true;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.fetchTaskSuccess = false;
        state.message = action.payload;
      });

    // Fetch All Tasks
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.fetchAllTasksSuccess = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload?.data || [];
        state.fetchAllTasksSuccess = true;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.fetchAllTasksSuccess = false;
        state.message = action.payload;
      });

    // Fetch Tasks by Employee ID
    builder
      .addCase(fetchTasksByEmpId.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.fetchEmpTasksSuccess = null;
      })
      .addCase(fetchTasksByEmpId.fulfilled, (state, action) => {
        state.loading = false;
        state.empTasks = action.payload?.data || [];
        state.fetchEmpTasksSuccess = true;
      })
      .addCase(fetchTasksByEmpId.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.fetchEmpTasksSuccess = false;
        state.message = action.payload;
      });

    // Update Task
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.updateTaskSuccess = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload?.data?.id
        );
        if (index !== -1) state.tasks[index] = action.payload?.data;
        state.updateTaskSuccess = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.updateTaskSuccess = false;
        state.message = action.payload;
      });

    // Delete Task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.deleteTaskSuccess = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
          state.loading = false;
          
        state.tasks = state.tasks.filter((t) => t._id !== action.payload?.data?._id);
        state.deleteTaskSuccess = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.deleteTaskSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { clearTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
