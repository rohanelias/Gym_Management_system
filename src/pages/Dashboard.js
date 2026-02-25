import { Box, Typography, Grid, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StatCard from "../components/StatCard";

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
    alignItems: "center",
    justifyContent: "center",
  },
};

const stats = [
  {
    title: "Total Members",
    value: "1,200",
    icon: <PeopleIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    title: "Active Trainers",
    value: "15",
    icon: <FitnessCenterIcon sx={{ fontSize: 40, color: "#f97316" }} />,
  },
  {
    title: "Monthly Revenue",
    value: "₹8,50,000",
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "#10b981" }} />,
  },
];

export default function Dashboard() {
  return (
    <Box sx={dashboardStyles.container}>
      <Typography variant="h4" sx={dashboardStyles.title}>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={dashboardStyles.subtitle}>
        Welcome back, let's get to work!
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={dashboardStyles.chartContainer}>
            <Typography variant="h6" sx={{ color: "#94a3b8" }}>
              Chart will be displayed here
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} key={index}>
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}