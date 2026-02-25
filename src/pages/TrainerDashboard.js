import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StatCard from "../components/StatCard";
import { getTrainerMembers } from "../api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
  },
  headerCell: {
    color: "#94a3b8",
    fontWeight: 600,
  },
  bodyCell: {
    color: "#e2e8f0",
  },
};

const stats = [
  {
    title: "Assigned Members",
    value: "25",
    icon: <PeopleIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    title: "Workout Plans",
    value: "10",
    icon: <AssignmentIcon sx={{ fontSize: 40, color: "#f97316" }} />,
  },
  {
    title: "Diet Plans",
    value: "8",
    icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: "#10b981" }} />,
  },
];

function TrainerDashboard() {
  const [members, setMembers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const trainerId = user?.id || 2;
        const data = await getTrainerMembers(trainerId);
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [user]);

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

export default TrainerDashboard;