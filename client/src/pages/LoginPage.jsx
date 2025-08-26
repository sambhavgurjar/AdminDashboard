import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../redux/thunks/adminThunk";
import { adminLogout } from "../redux/slices/adminSlice";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });

  const { loading, error, success } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminLogout());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(adminLogin(formData));

    if (adminLogin.fulfilled.match(result)) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setTimeout(() => dispatch(adminLogout()), 2000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        {/* Alerts */}
        <Box sx={{ mb: 2 }}>
          {loading && (
            <Alert severity="info">
              Logging in... <CircularProgress size={20} sx={{ ml: 1 }} />
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Login successful!</Alert>}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Admin ID"
            type="text"
            name="adminId"
            value={formData.adminId}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            disabled={loading} 
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
