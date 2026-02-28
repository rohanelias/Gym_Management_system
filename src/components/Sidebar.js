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
import StarsIcon from "@mui/icons-material/Stars";
import { motion, AnimatePresence } from "framer-motion";

const drawerWidth = 280;

const sidebarStyles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      background: "#0f172a",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
    },
  },
  brand: {
    p: 3,
    fontWeight: 800,
    letterSpacing: 1,
    color: "#f8fafc",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  brandSpan: {
    color: "#2563eb",
  },
  listItemIcon: {
    color: "#94a3b8",
    minWidth: 40,
    transition: "color 0.3s ease",
  },
  listItemText: {
    color: "#f8fafc",
    "& .MuiTypography-root": {
      fontWeight: 500,
      transition: "color 0.3s ease",
    },
  },
  navLink: {
    margin: "4px 12px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      "& .MuiListItemIcon-root": {
        color: "#2563eb",
      },
    },
    "&.active": {
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      "& .MuiListItemIcon-root": {
        color: "#2563eb",
      },
      "& .MuiTypography-root": {
        color: "#2563eb",
        fontWeight: 700,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: "20%",
        height: "60%",
        width: "4px",
        backgroundColor: "#2563eb",
        borderRadius: "0 4px 4px 0",
      },
    },
  },
  logoutContainer: {
    mt: "auto",
    pb: 2,
  },
};

function Sidebar() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const getNavLinks = () => {
    const commonLinks = [
      { text: "My Profile", to: "/profile", icon: <AccountCircleIcon /> },
    ];

    const adminLinks = [
      { text: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
      { text: "Members", to: "/members", icon: <PeopleIcon /> },
      { text: "Trainers", to: "/trainers", icon: <FitnessCenterIcon /> },
      { text: "Manage Plans", to: "/manage-plans", icon: <StarsIcon /> },
      { text: "Payment Records", to: "/payments", icon: <PaymentIcon /> },
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
      { text: "Dashboard", to: "/member-dashboard", icon: <DashboardIcon /> },
      { text: "My Workout & Diet", to: "/my-plans", icon: <FitnessCenterIcon /> },
      { text: "Payments", to: "/payments", icon: <PaymentIcon /> },
      { text: "My Profile", to: "/profile", icon: <AccountCircleIcon /> },
    ];

    switch (role) {
      case "admin":
        return [...adminLinks, ...commonLinks];
      case "trainer":
        return [...trainerLinks, ...commonLinks];
      case "member":
        return [...memberLinks];
      default:
        return [];
    }
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={sidebarStyles.drawer}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {/* Animated Background Glow */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.3,
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" sx={sidebarStyles.brand}>
            <FitnessCenterIcon sx={{ color: "#2563eb", fontSize: 32 }} />
            <Box>
              NAMMUDE<span style={sidebarStyles.brandSpan}>GYM</span>
            </Box>
          </Typography>
        </motion.div>
        
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mx: 2 }} />
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2, zIndex: 1 }}>
          <List>
            <AnimatePresence>
              {getNavLinks().map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItem disablePadding>
                    <ListItemButton 
                      component={NavLink} 
                      to={item.to}
                      sx={sidebarStyles.navLink}
                    >
                      <ListItemIcon sx={sidebarStyles.listItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={sidebarStyles.listItemText}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Box>

        <Box sx={sidebarStyles.logoutContainer}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mx: 2, mb: 2 }} />
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Box sx={{ p: 2, mx: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <AccountCircleIcon sx={{ color: '#2563eb' }} />
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          )}
          <List>
            <motion.div whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={handleLogout}
                  sx={{ ...sidebarStyles.navLink, "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)", "& .MuiListItemIcon-root": { color: "#ef4444" } } }}
                >
                  <ListItemIcon sx={sidebarStyles.listItemIcon}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={sidebarStyles.listItemText} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
