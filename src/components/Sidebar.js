import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaymentIcon from "@mui/icons-material/Payment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const drawerWidth = 240;

const sidebarStyles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      background: "#0f172a",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },
  brand: {
    p: 2,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#f8fafc",
  },
  brandSpan: {
    color: "#2563eb",
  },
  listItemIcon: {
    color: "#94a3b8",
  },
  listItemText: {
    color: "#f8fafc",
  },
  logoutContainer: {
    mt: "auto",
  },
};

function Sidebar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const getNavLinks = () => {
    const commonLinks = [
      { text: "Profile", to: "/profile", icon: <AccountCircleIcon /> },
    ];

    const adminLinks = [
      { text: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
      { text: "Members", to: "/members", icon: <PeopleIcon /> },
      { text: "Trainers", to: "/trainers", icon: <FitnessCenterIcon /> },
      { text: "Payments", to: "/payments", icon: <PaymentIcon /> },
      { text: "Attendance", to: "/attendance", icon: <EventAvailableIcon /> },
    ];

    const trainerLinks = [
      { text: "Dashboard", to: "/trainer-dashboard", icon: <DashboardIcon /> },
      { text: "My Members", to: "/trainer-members", icon: <PeopleIcon /> },
      {
        text: "Workout Plans",
        to: "/trainer-workouts",
        icon: <FitnessCenterIcon />,
      },
      { text: "Diet Plans", to: "/trainer-diets", icon: <RestaurantMenuIcon /> },
      { text: "Attendance", to: "/attendance", icon: <EventAvailableIcon /> },
    ];

    const memberLinks = [
      { text: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
      { text: "Payments", to: "/payments", icon: <PaymentIcon /> },
    ];

    switch (role) {
      case "admin":
        return [...adminLinks, ...commonLinks];
      case "trainer":
        return [...trainerLinks, ...commonLinks];
      case "member":
        return [...memberLinks, ...commonLinks];
      default:
        return [];
    }
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={sidebarStyles.drawer}>
      <Typography variant="h5" sx={sidebarStyles.brand}>
        NAMMUDE<span style={sidebarStyles.brandSpan}>GYM</span>
      </Typography>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        {getNavLinks().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={NavLink} to={item.to}>
              <ListItemIcon sx={sidebarStyles.listItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={sidebarStyles.listItemText}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={sidebarStyles.logoutContainer}>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={sidebarStyles.listItemIcon}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={sidebarStyles.listItemText} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
