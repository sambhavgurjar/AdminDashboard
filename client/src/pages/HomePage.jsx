import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        Admin Login
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Access the admin dashboard to manage employees and tasks.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login as Admin
        </Button>
      </Box>
    </Container>
  );
}
