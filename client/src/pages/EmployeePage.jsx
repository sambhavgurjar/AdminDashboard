import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearEmpStatus } from "../redux/slices/empSlice";
import { fetchAllEmp, deleteEmp } from "../redux/thunks/empThunk";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, AssignmentTurnedIn, Delete, ListAlt } from "@mui/icons-material";

export default function EmployeePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    emps,
    loading,
    error,
    deleteEmpSuccess,
    createEmpSuccess,
    updateEmpSuccess,
    message,
  } = useSelector((state) => state.emp);

  const [open, setOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Filter state
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllEmp());
  }, [dispatch]);

  useEffect(() => {
    if (error && message) {
      setSnackbarMsg(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      dispatch(clearEmpStatus());
    } else if (createEmpSuccess) {
      setSnackbarMsg("Employee created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearEmpStatus());
    } else if (updateEmpSuccess) {
      setSnackbarMsg("Employee updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearEmpStatus());
    } else if (deleteEmpSuccess) {
      setSnackbarMsg("Employee deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(clearEmpStatus());
    }
  }, [
    error,
    message,
    createEmpSuccess,
    updateEmpSuccess,
    deleteEmpSuccess,
    dispatch,
  ]);

  const handleAdd = () => {
    navigate("/admin/employees/form");
  };

  const handleEdit = (emp) => {
    navigate(`/admin/employees/edit/${emp._id}`);
  };

  const handleAssignTask = (emp) => {
    navigate(`/admin/tasks/form/${emp._id}`);
  };

  const handleTaskList = (emp) => {
    navigate("/admin/tasks", { state: { employeeName: emp?.name } });
  };

  const handleDeleteClick = (emp) => {
    setSelectedEmp(emp);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmp) {
      dispatch(deleteEmp(selectedEmp._id));
    }
    setOpen(false);
    setSelectedEmp(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setSelectedEmp(null);
  };

  // Filter employees by name
  const filteredEmps = emps.filter((emp) =>
    emp?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Employees
        </Typography>
        <TextField
          size="small"
          label="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ flex: 1, maxWidth: { xs: "100%", sm: 300 } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add New Employee
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredEmps.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No employees found
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Add a new employee to get started.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Employee
          </Button>
        </Paper>
      ) : isMobile ? (
        // Mobile: Show as Cards
        <Grid container spacing={2}>
          {filteredEmps.map((emp) => (
            <Grid item xs={12} key={emp?._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{emp?.name}</Typography>
                  <Typography>Email: {emp?.email}</Typography>
                  <Typography>Phone: {emp?.phone}</Typography>
                  <Typography>Department: {emp?.depart}</Typography>
                  <Typography>Status: {emp?.status}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => handleEdit(emp)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleAssignTask(emp)}
                  >
                    <AssignmentTurnedIn />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleTaskList(emp)}>
                    <ListAlt />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(emp)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Desktop: Show Table
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                <TableCell>
                  <b>Department</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmps.map((emp) => (
                <TableRow key={emp?._id}>
                  <TableCell>{emp?.name}</TableCell>
                  <TableCell>{emp?.email}</TableCell>
                  <TableCell>{emp?.phone}</TableCell>
                  <TableCell>{emp?.depart}</TableCell>
                  <TableCell>{emp?.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(emp)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleAssignTask(emp)}
                    >
                      <AssignmentTurnedIn />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => handleTaskList(emp)}
                    >
                      <ListAlt />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(emp)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee <b>{selectedEmp?.name}</b>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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
