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

const dashboardStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  welcomeHeader: {
    mb: 4,
    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)",
    p: 4,
    borderRadius: 2,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  planCard: {
    height: "100%",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    borderRadius: 2,
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
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: "#10b981" }} />,
    },
    {
      title: "Assigned Trainer",
      value: data?.trainer_name || "None",
      icon: <PersonIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    },
    {
        title: "Recent Payment",
        value: data?.payments?.[0] ? `₹${data.payments[0].Amount}` : "None",
        icon: <HistoryIcon sx={{ fontSize: 40, color: "#facc15" }} />,
    }
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
        <Paper sx={dashboardStyles.welcomeHeader}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#f8fafc", mb: 1 }}>
            Welcome back, {data?.name}! 👋
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 400 }}>
            Ready to crush your goals today?
          </Typography>
        </Paper>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1, type: "spring" }}>
              <StatCard title={stat.title} value={stat.value} icon={stat.icon} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card sx={dashboardStyles.planCard}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <FitnessCenterIcon sx={{ color: '#f97316' }} />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Workout Plan</Typography>
                </Box>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="body1" sx={{ color: '#e2e8f0', minHeight: 100, whiteSpace: 'pre-wrap' }}>
                  {data?.workout_plan}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card sx={dashboardStyles.planCard}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <RestaurantMenuIcon sx={{ color: '#10b981' }} />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Diet Plan</Typography>
                </Box>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="body1" sx={{ color: '#e2e8f0', minHeight: 100, whiteSpace: 'pre-wrap' }}>
                  {data?.diet_plan}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Paper sx={{ ...dashboardStyles.planCard, p: 3 }}>
               <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Weekly Progress</Typography>
               <AttendanceChart />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
