import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  updateTask,
  fetchTaskById,
} from "../redux/thunks/taskThunk";
import { clearTaskStatus } from "../redux/slices/taskSlice";
import { fetchAllEmp } from "../redux/thunks/empThunk";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

export default function TaskForm() {
  const { empid, taskid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { emps } = useSelector((state) => state.emp);
  const { targetTask, error, message } = useSelector((state) => state.task);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignEmp: empid || "",
    deadline: "",
    priority: "Medium",
    status: "pending",
  });

  const [openMsg, setOpenMsg] = useState(false);
  const [employeeCheck, setEmployeeCheck] = useState(true);

  useEffect(() => {
    dispatch(fetchAllEmp());
  }, [dispatch]);

  useEffect(() => {
    if (!emps || emps.length === 0) {
      setEmployeeCheck(false);
    } else {
      setEmployeeCheck(true);
    }
  }, [emps]);

  // Fetch task for edit
  useEffect(() => {
    if (taskid) {
      dispatch(fetchTaskById(taskid));
    }
  }, [dispatch, taskid]);

  // Populate form when editing
  useEffect(() => {
    if (taskid && targetTask) {
      setTaskData({
        title: targetTask.title || "",
        description: targetTask.description || "",
        assignEmp: targetTask.assignEmp?._id || "",
        deadline: targetTask.deadline
          ? new Date(targetTask.deadline).toISOString().split("T")[0]
          : "",
        priority: targetTask.priority || "Medium",
        status: targetTask.status || "pending",
      });
    }
  }, [taskid, targetTask]);

  useEffect(() => {
    if (message) {
      setOpenMsg(true);
      setTimeout(() => {
        setOpenMsg(false);
        dispatch(clearTaskStatus());
      }, 2500);
    }
  }, [message, dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "title" && e.target.value.length > 50) return;
    if (e.target.name === "description" && e.target.value.length > 200) return;

    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeCheck) {
      alert("Please add employees first! All fields are required.");
      return;
    }

    if (taskid) {
      dispatch(updateTask({ id: taskid, taskData }));
    } else {
      dispatch(createTask(taskData));
    }

    navigate("/admin/tasks");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        mb: 5,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        {taskid ? "Edit Task" : "Create / Assign Task"}
      </Typography>

      {!employeeCheck && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No employees found. Please add employees first!
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Title */}
        <TextField
          label={`Title (max 50 chars)`}
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          fullWidth
          inputProps={{ maxLength: 50 }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "secondary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "success.main",
              },
            },
          }}
        />

        {/* Description */}
        <TextField
          label={`Description (max 200 chars)`}
          name="description"
          value={taskData.description}
          onChange={handleChange}
          multiline
          required
          rows={3}
          fullWidth
          inputProps={{ maxLength: 200 }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "secondary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "success.main",
              },
            },
          }}
        />

        {/* Assign Employee */}
        <FormControl fullWidth required disabled={!employeeCheck}>
          <InputLabel>Assign Employee</InputLabel>
          <Select
            name="assignEmp"
            value={taskData.assignEmp}
            onChange={handleChange}
            required
            label="Assign Employee"
            sx={{
              "& .MuiSelect-select": { padding: "10px 14px" },
            }}
          >
            {emps.map((emp) => (
              <MenuItem key={emp._id} value={emp._id}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Deadline */}
        <TextField
          type="date"
          name="deadline"
          label="Deadline"
          required
          InputLabelProps={{ shrink: true }}
          value={taskData.deadline}
          onChange={handleChange}
          fullWidth
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
        />

        {/* Priority */}
        <FormControl fullWidth>
          <InputLabel sx={{ backgroundColor: "#fff", px: 1 }}>
            Priority
          </InputLabel>
          <Select
            name="priority"
            value={taskData.priority}
            required
            onChange={handleChange}
            sx={{ "& .MuiSelect-select": { padding: "10px 14px" } }}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel sx={{ backgroundColor: "#fff", px: 1 }}>
            Status
          </InputLabel>
          <Select
            name="status"
            required
            value={taskData.status}
            onChange={handleChange}
            sx={{ "& .MuiSelect-select": { padding: "10px 14px" } }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!employeeCheck}
          >
            {taskid ? "Update Task" : "Save Task"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openMsg}
        autoHideDuration={2500}
        onClose={() => setOpenMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => setOpenMsg(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
