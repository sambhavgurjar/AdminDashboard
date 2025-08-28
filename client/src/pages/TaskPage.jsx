import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { fetchAllTasks, deleteTask } from "../redux/thunks/taskThunk";
import { clearTaskStatus } from "../redux/slices/taskSlice";

export default function TaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tasks,
    loading,
    error,
    createTaskSuccess,
    updateTaskSuccess,
    deleteTaskSuccess,
    message,
  } = useSelector((state) => state.task);
// console.log(tasks);

  const employeeNameFromState = location.state?.employeeName || "";

  const [search, setSearch] = useState(employeeNameFromState);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error && message) {
      setSnackbarMsg(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      dispatch(clearTaskStatus());
    } else if (createTaskSuccess) {
      setSnackbarMsg("Task created!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearTaskStatus());
    } else if (updateTaskSuccess) {
      setSnackbarMsg("Task updated!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearTaskStatus());
    } else if (deleteTaskSuccess) {
      setSnackbarMsg("Task deleted!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearTaskStatus());
    }
  }, [
    error,
    message,
    createTaskSuccess,
    updateTaskSuccess,
    deleteTaskSuccess,
    dispatch,
  ]);

  const handleAddTask = () => {
    navigate("/admin/tasks/form");
  };

  const handleEditTask = (task) => {
    navigate(`/admin/tasks/edit/${task._id}`);
  };

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task._id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesEmployee = task?.assignEmp?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;

    return matchesEmployee && matchesStatus && matchesPriority;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header with Title, Filters, and Add Button */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Left - Title */}
        <Typography
          variant="h4"
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          Tasks
        </Typography>

        {/* Center - Filters (Employee, Status, Priority) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search by Employee"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: "100%", sm: "200px" } }}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: { xs: "100%", sm: "150px" } }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          <TextField
            select
            label="Priority"
            size="small"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            sx={{ width: { xs: "100%", sm: "150px" } }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
        </Box>

        {/* Right - Add Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Loading / Empty */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Try adjusting filters or add a new task.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {task?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {task?.description}
                  </Typography>
                  <Typography variant="body2">
                    <b>Employee:</b> {task?.assignEmp?.name}
                  </Typography>
                  <Typography variant="body2">
                    <b>Deadline:</b>{" "}
                    {new Date(task?.deadline).toLocaleDateString()}
                  </Typography>
                  <Box
                    sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`Priority: ${task?.priority}`}
                      color={
                        task?.priority === "High"
                          ? "error"
                          : task?.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                    <Chip
                      label={task?.status}
                      color={
                        task?.status === "completed"
                          ? "success"
                          : task?.status === "in-progress"
                          ? "info"
                          : "default"
                      }
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditTask(task)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteTask(task)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
