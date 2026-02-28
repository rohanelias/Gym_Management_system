import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api";
import { RevenueChart, MemberDistributionChart, AttendanceChart } from "../components/DashboardCharts";
import { motion } from "framer-motion";
import HistoryIcon from "@mui/icons-material/History";
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
  header: {
    mb: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontWeight: 800,
    color: "#f8fafc",
    lineHeight: 1.2,
  },
  subtitle: {
    color: "#94a3b8",
  },
  mainGrid: {
    flexGrow: 1,
    minHeight: 0, // Allow content to shrink
  },
  chartPaper: {
    p: 2,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  recentPayments: {
    p: 2,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  }
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
      title: "Members",
      value: stats.members.toLocaleString(),
      icon: <PeopleIcon sx={{ fontSize: 28, color: "#2563eb" }} />,
      color: "rgba(37, 99, 235, 0.1)"
    },
    {
      title: "Attendance",
      value: stats.attendance.toLocaleString(),
      icon: <EventAvailableIcon sx={{ fontSize: 28, color: "#10b981" }} />,
      color: "rgba(16, 185, 129, 0.1)"
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 28, color: "#facc15" }} />,
      color: "rgba(250, 204, 21, 0.1)"
    },
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.header}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" sx={dashboardStyles.title}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={dashboardStyles.subtitle}>
            Gym performance overview
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper sx={{
                p: "12px 20px",
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
          ))}
        </Box>
      </Box>

      <Grid container spacing={2} sx={dashboardStyles.mainGrid}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={12} sx={{ height: '60%' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ height: '100%' }}>
                <Paper sx={dashboardStyles.chartPaper}>
                  <RevenueChart data={stats.revenueTrend} />
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={6} sx={{ height: '40%' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ height: '100%' }}>
                <Paper sx={dashboardStyles.chartPaper}>
                  <AttendanceChart data={stats.attendanceTrend} />
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={6} sx={{ height: '40%' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ height: '100%' }}>
                <Paper sx={dashboardStyles.chartPaper}>
                  <MemberDistributionChart members={stats.members} trainers={stats.trainers} />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} style={{ height: '100%' }}>
            <Paper sx={dashboardStyles.recentPayments}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <HistoryIcon sx={{ color: "#facc15", fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: "#f8fafc", fontWeight: 700 }}>
                  Recent Payments
                </Typography>
              </Box>
              <List sx={{ 
                flexGrow: 1, 
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }
              }}>
                {stats.recentPayments?.map((payment) => (
                  <ListItem key={payment.PID} sx={{ px: 0, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <ListItemAvatar sx={{ minWidth: 48 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: "rgba(37, 99, 235, 0.1)", color: "#2563eb" }}>
                        {payment.member_name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="body2" sx={{ color: "#f8fafc", fontWeight: 600 }}>{payment.member_name}</Typography>}
                      secondary={<Typography variant="caption" sx={{ color: "#94a3b8" }}>{payment.PaymentDate}</Typography>}
                    />
                    <Typography variant="body2" sx={{ color: "#10b981", fontWeight: 700 }}>
                      ₹{payment.Amount}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
