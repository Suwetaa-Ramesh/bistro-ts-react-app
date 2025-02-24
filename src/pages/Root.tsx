import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const navLinks = [
  {
    title: "Bistros",
    path: "/bistros",
  },
  {
    title: "Add a bistro location",
    path: "/bistros/new",
  },
  {
    title: "Employees",
    path: "/employees",
  },
  {
    title: "Add an employee",
    path: "/employees/new",
  },
];
const Root = () => {
  const [showNavigationDrawer, setNavigationDrawer] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/bistros");
    }
  }, [navigate, location.pathname]);

  return (
    <Box>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setNavigationDrawer(!showNavigationDrawer)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bistro Employee Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={showNavigationDrawer}
        anchor="left"
        onClose={() => setNavigationDrawer(false)}
      >
        <Toolbar />
        <List sx={{ width: 240 }}>
          {navLinks.map(({ title, path }) => (
            <ListItem key={title} sx={{ p: 0 }}>
              <ListItemButton component="a" href={path} sx={{ py: 2 }}>
                <ListItemText>{title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ mt: "64px", p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
