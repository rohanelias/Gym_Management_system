import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Paper, Alert } from "@mui/material";
import { getUserProfile } from "../api";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PaymentsTable from "./PaymentsTable";

const pageStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  title: {
    fontWeight: 700,
    color: "#e2e8f0",
    mb: 3,
  },
};

function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setProfile(data);
      } catch (error) {
        setStatus({ severity: "error", message: "Failed to fetch user profile" });
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <Box sx={pageStyles.container}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const stats = [
    {
      title: "Assigned Trainer",
      value: profile.trainer_name || "None",
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#38bdf8" }} />,
    },
    {
      title: "Workout Plan",
      value: "View Plan",
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#818cf8" }} />,
    },
    {
      title: "Diet Plan",
      value: "View Plan",
      icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: "#facc15" }} />,
    },
  ];

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        {profile.name}'s Profile
      </Typography>

      {status && (
        <Alert
          severity={status.severity}
          sx={{ mb: 2 }}
          onClose={() => setStatus(null)}
        >
          {status.message}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StatCard title={stat.title} value={stat.value} icon={stat.icon} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ ...pageStyles.title, mb: 2 }}>
        Payment History
      </Typography>
      <PaymentsTable payments={profile.payments || []} />
    </Box>
  );
}

export default ViewProfile;
