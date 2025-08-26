import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import {  useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/adminSlice";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isToken, setIsToken] = useState(localStorage.getItem("adminToken") || null);
  const [isRole, setIsRole] = useState(localStorage.getItem("adminRole") || null);


  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Employees", icon: <PeopleIcon />, path: "/admin/employees" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/admin/tasks" },
  ];

  useEffect(() => {
    if (!isToken ||  isRole !== "admin") {
      dispatch(adminLogout());
      navigate("/login", { replace: true });
    }
  }, [dispatch,isToken,isRole,navigate]);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login", { replace: true });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Admin Panel
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ color: "inherit" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger Menu (Mobile) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Typography
                key={item.text}
                component={Link}
                to={item.path}
                variant="button"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {item.text}
              </Typography>
            ))}
            <Typography
              variant="button"
              onClick={handleLogout}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "error.light",
              }}
            >
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
