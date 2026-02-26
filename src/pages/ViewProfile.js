import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Alert, 
  Avatar, 
  Divider, 
  Chip, 
  CircularProgress, 
  Button 
} from "@mui/material";
import { getUserProfile } from "../api";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentsTable from "./PaymentsTable";
import { motion } from "framer-motion";

const pageStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: { xs: 2, md: 4 },
  },
  profileHeader: {
    p: 4,
    borderRadius: 4,
    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    mb: 4,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    fontSize: "3rem",
    bgcolor: "#2563eb",
    boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    color: "#94a3b8",
    mb: 1,
  },
  sectionTitle: {
    fontWeight: 700,
    color: "#f8fafc",
    mb: 3,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
};

function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setProfile(data);
      } catch (err) {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box sx={pageStyles.container}>
        <Alert severity="error">{error || "User not found"}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)} 
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
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
      value: profile.workout_plan_name || "Basic Plan",
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#818cf8" }} />,
    },
    {
      title: "Diet Plan",
      value: profile.diet_plan_name || "Standard Diet",
      icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: "#facc15" }} />,
    },
  ];

  return (
    <Box sx={pageStyles.container}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 3, color: "#94a3b8", "&:hover": { color: "#f8fafc" } }}
      >
        Back to List
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={pageStyles.profileHeader}>
          <Avatar sx={pageStyles.avatar}>
            {profile.name?.charAt(0) || "U"}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "#f8fafc" }}>
                {profile.name}
              </Typography>
              <Chip 
                label={profile.role?.toUpperCase() || "MEMBER"} 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 600 }}
              />
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={pageStyles.infoItem}>
                  <EmailIcon fontSize="small" />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box sx={pageStyles.infoItem}>
                  <BadgeIcon fontSize="small" />
                  <Typography>ID: #{profile.id}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <StatCard title={stat.title} value={stat.value} icon={stat.icon} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="h5" sx={pageStyles.sectionTitle}>
          Recent Activity & Payments
        </Typography>
        <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />
        <PaymentsTable payments={profile.payments || []} />
      </motion.div>
    </Box>
  );
}

export default ViewProfile;
