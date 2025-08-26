import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: 5,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Admin App. All rights reserved.
      </Typography>
    </Box>
  );
}
