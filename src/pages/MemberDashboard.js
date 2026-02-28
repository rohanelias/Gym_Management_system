import React, { useState, useEffect, useContext } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Card, 
  CardContent, 
  Divider,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import StatCard from "../components/StatCard";
import { getUserProfile } from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { AttendanceChart } from "../components/DashboardCharts";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

const dashboardStyles = {
  container: {
    height: "100vh",
    p: 3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  welcomeHeader: {
    mb: 2,
    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)",
    p: 2,
    borderRadius: 2,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  contentGrid: {
    flexGrow: 1,
    minHeight: 0,
  },
  card: {
    height: "100%",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
};

export default function MemberDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const profile = await getUserProfile(user.id);
        setData(profile);
      } catch (error) {
        console.error("Failed to fetch member dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: "Attendance (30d)",
      value: data?.attendance_count?.toString() || "0",
      icon: <EventAvailableIcon sx={{ fontSize: 28, color: "#10b981" }} />,
      color: "rgba(16, 185, 129, 0.1)"
    },
    {
      title: "Assigned Trainer",
      value: data?.trainer_name || "None",
      icon: <PersonIcon sx={{ fontSize: 28, color: "#2563eb" }} />,
      color: "rgba(37, 99, 235, 0.1)"
    },
    {
        title: "Recent Payment",
        value: data?.recent_activity?.[0] ? `₹${data.recent_activity[0].Amount}` : "None",
        icon: <HistoryIcon sx={{ fontSize: 28, color: "#facc15" }} />,
        color: "rgba(250, 204, 21, 0.1)"
    }
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Paper sx={dashboardStyles.welcomeHeader}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#f8fafc", mb: 0.5 }}>
            Welcome back, {data?.name}! 👋
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Your fitness summary and recent activity
          </Typography>
        </Paper>
      </motion.div>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
              <Paper sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2
              }}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: stat.color, display: 'flex' }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, display: 'block' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#f8fafc", fontWeight: 700, lineHeight: 1 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={dashboardStyles.contentGrid}>
        <Grid item xs={12} sx={{ height: '100%' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} style={{ height: '100%' }}>
            <Paper sx={{ ...dashboardStyles.card, p: 2 }}>
               <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Weekly Progress</Typography>
               <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
                  <AttendanceChart />
               </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
