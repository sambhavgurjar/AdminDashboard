import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";
import { fetchAllEmp } from "../redux/thunks/empThunk";
import { fetchAllTasks } from "../redux/thunks/taskThunk";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { emps, loading: empLoading } = useSelector((state) => state.emp);
  const { tasks, loading: taskLoading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchAllEmp());
    dispatch(fetchAllTasks());
  }, [dispatch]);

  if (empLoading || taskLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Employee stats
  const totalEmployees = emps.length;
  const activeEmployees = emps.filter((e) => e.status === "Active").length;
  const inactiveEmployees = emps.filter((e) => e.status === "Inactive").length;

  // Task stats
  const totalTasks = tasks.length;
  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    completed: "success",
    "in-progress": "info",
    pending: "warning",
  };

  const priorityColors = {
    High: "error",
    Medium: "warning",
    Low: "success",
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Employee Stats */}
        {[
          { label: "Total Employees", value: totalEmployees, color: "primary" },
          {
            label: "Active Employees",
            value: activeEmployees,
            color: "success",
          },
          {
            label: "Inactive Employees",
            value: inactiveEmployees,
            color: "error",
          },
          { label: "Total Tasks", value: totalTasks, color: "secondary" },
        ].map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              sx={{
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                boxShadow: 2,
                p: 2,
              }}
            >
              <Typography variant="h6">{stat.label}</Typography>
              <Typography
                variant="h3"
                color={`${stat.color}.main`}
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Tasks by Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: 150,
              p: 2,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tasks by Status
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {Object.entries(tasksByStatus).map(([status, count]) => (
                <Chip
                  key={status}
                  label={`${status}: ${count}`}
                  color={statusColors[status] || "default"}
                  size="medium"
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Tasks by Priority */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              height: 150,
              p: 2,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tasks by Priority
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {Object.entries(tasksByPriority).map(([priority, count]) => (
                <Chip
                  key={priority}
                  label={`${priority}: ${count}`}
                  color={priorityColors[priority] || "default"}
                  size="medium"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
