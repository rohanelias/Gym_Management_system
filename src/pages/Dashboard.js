import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api";
import { RevenueChart, MemberDistributionChart, AttendanceChart } from "../components/DashboardCharts";
import { motion } from "framer-motion";

const dashboardStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  title: {
    fontWeight: 700,
    color: "#f8fafc",
    mb: 1,
  },
  subtitle: {
    color: "#94a3b8",
    mb: 4,
  },
  chartContainer: {
    p: 3,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: "Active Members",
      value: stats.members.toLocaleString(),
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    },
    {
      title: "Today's Attendance",
      value: stats.attendance.toLocaleString(),
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: "#10b981" }} />,
    },
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "#facc15" }} />,
    },
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ type: "spring", damping: 12 }}>
        <Typography variant="h4" sx={dashboardStyles.title}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={dashboardStyles.subtitle}>
          Real-time gym performance and trends.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Paper sx={dashboardStyles.chartContainer}>
                  <RevenueChart data={stats.revenueTrend} /> 
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Paper sx={dashboardStyles.chartContainer}>
                  <AttendanceChart data={stats.attendanceTrend} />
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Paper sx={dashboardStyles.chartContainer}>
                  <MemberDistributionChart members={stats.members} trainers={stats.trainers} />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {statCards.map((stat, index) => (
              <Grid item xs={12} key={index}>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + (index * 0.1) }}>
                  <StatCard
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
