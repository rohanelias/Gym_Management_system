import React, { useEffect, useState, useContext } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  CircularProgress 
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StatCard from "../components/StatCard";
import { getTrainerMembers, getWorkoutPlans, getDietPlans } from "../api";
import { AuthContext } from "../context/AuthContext";
import { AttendanceChart } from "../components/DashboardCharts";

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
  tableContainer: {
    p: 3,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    mb: 4,
  },
  chartPaper: {
    p: 3,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  headerCell: {
    color: "#94a3b8",
    fontWeight: 600,
  },
  bodyCell: {
    color: "#e2e8f0",
  },
};

function TrainerDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ workout: 0, diet: 0 });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainerId = user?.id || 1;
        const [membersData, workoutData, dietData] = await Promise.all([
          getTrainerMembers(trainerId),
          getWorkoutPlans(trainerId),
          getDietPlans(trainerId),
        ]);
        setMembers(Array.isArray(membersData) ? membersData : []);
        setCounts({
          workout: Array.isArray(workoutData) ? workoutData.length : 0,
          diet: Array.isArray(dietData) ? dietData.length : 0,
        });
      } catch (error) {
        console.error("Failed to fetch trainer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: "Assigned Members",
      value: members.length.toLocaleString(),
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    },
    {
      title: "Workout Plans",
      value: counts.workout.toLocaleString(),
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#f97316" }} />,
    },
    {
      title: "Diet Plans",
      value: counts.diet.toLocaleString(),
      icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: "#10b981" }} />,
    },
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <Typography variant="h4" sx={dashboardStyles.title}>
        Trainer Dashboard
      </Typography>
      <Typography variant="body1" sx={dashboardStyles.subtitle}>
        Manage your assigned members, plans and attendance
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={dashboardStyles.tableContainer}>
            <Typography variant="h6" sx={{ mb: 2, color: "#f8fafc" }}>
              Assigned Members
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={dashboardStyles.headerCell}>ID</TableCell>
                  <TableCell sx={dashboardStyles.headerCell}>Name</TableCell>
                  <TableCell sx={dashboardStyles.headerCell}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.length > 0 ? (
                  members.map((m) => (
                    <TableRow key={m.id} hover>
                      <TableCell sx={dashboardStyles.bodyCell}>{m.id}</TableCell>
                      <TableCell sx={dashboardStyles.bodyCell}>{m.name}</TableCell>
                      <TableCell sx={dashboardStyles.bodyCell}>{m.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      sx={{ py: 4, color: "#94a3b8" }}
                    >
                      No members assigned
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper sx={dashboardStyles.chartPaper}>
            <AttendanceChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {statCards.map((stat, index) => (
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

export default TrainerDashboard;
