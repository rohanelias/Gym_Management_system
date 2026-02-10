import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip
} from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

function StatCard({ title, value }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
        backgroundColor: "#ffffff"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Paper>
  );
}

function Dashboard() {
  const { role } = useContext(AuthContext);

  // Only show this dashboard to USERS
  if (role !== "user") return null;

  /* Mock data (replace with backend later) */
  const membership = {
    plan: "Gold",
    status: "Active",
    expiry: "30 Mar 2026"
  };

  const trainerName = "Rahul Sharma";

  const workoutPlan = [
    { day: "Monday", workout: "Chest & Triceps" },
    { day: "Tuesday", workout: "Back & Biceps" },
    { day: "Wednesday", workout: "Legs" },
    { day: "Thursday", workout: "Shoulders" },
    { day: "Friday", workout: "Core & Cardio" }
  ];

  const weeklyActivity = [3, 4, 5, 4, 6, 2, 0];

  return (
    <Box sx={{ p: 4, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Dashboard
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Track your workouts, progress, and membership
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <StatCard title="Membership Status" value={membership.status} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Trainer" value={trainerName} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Plan" value={membership.plan} />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Workout Plan */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Workout Plan
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {workoutPlan.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5
                }}
              >
                <Typography variant="body2">{item.day}</Typography>
                <Chip
                  label={item.workout}
                  color="primary"
                  size="small"
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Weekly Activity Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Weekly Activity
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <BarChart
              height={250}
              series={[
                {
                  data: weeklyActivity,
                  label: "Workout Days",
                  color: "#2563eb"
                }
              ]}
              xAxis={[
                {
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  scaleType: "band"
                }
              ]}
            />
          </Paper>
        </Grid>

        {/* Membership Details */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Membership Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Plan
                </Typography>
                <Typography fontWeight={600}>
                  {membership.plan}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography fontWeight={600}>
                  {membership.status}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Expiry Date
                </Typography>
                <Typography fontWeight={600}>
                  {membership.expiry}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
