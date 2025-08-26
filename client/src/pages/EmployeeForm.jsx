import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createEmp, updateEmp, fetchEmpById } from "../redux/thunks/empThunk";
import { clearEmpStatus } from "../redux/slices/empSlice";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { targetEmp, error, message } = useSelector((state) => state.emp);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    depart: "",
    status: "Active",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // fetch data if editing
  useEffect(() => {
    if (id) {
      dispatch(fetchEmpById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (targetEmp && id) {
      setFormData({
        name: targetEmp.name || "",
        email: targetEmp.email || "",
        phone: targetEmp.phone || "",
        depart: targetEmp.depart || "",
        status: targetEmp.status || "Active",
      });
    }
  }, [targetEmp, id]);

  useEffect(() => {
    if (error && message) {
      setOpenSnackbar(true);
    }
  }, [error, message]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    dispatch(clearEmpStatus());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits and max 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (formData.phone.length !== 10) {
      setPhoneError(true);
      return;
    }

    if (id) {
      let result = await dispatch(updateEmp({ id, empData: formData }));
      if (updateEmp.fulfilled.match(result)) {
        navigate("/admin/employees");
      }
    } else {
      let result = await dispatch(createEmp(formData));
      if (createEmp.fulfilled.match(result)) {
        navigate("/admin/employees");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Update Employee" : "Add New Employee"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 50 }} // max length for name
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }} // max length for email
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={phoneError}
            helperText={phoneError ? "Phone must be 10 digits" : ""}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            name="depart"
            value={formData.depart}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 50 }} // max length for department
          />

          {/* Status */}
          <TextField
            select
            fullWidth
            margin="normal"
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
