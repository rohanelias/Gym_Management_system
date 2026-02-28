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
  Avatar,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { getUserProfile } from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const pageStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  header: {
    mb: 4,
    p: 3,
    borderRadius: 2,
    background: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  planCard: {
    height: "100%",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    borderRadius: 3,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      borderColor: "rgba(37, 99, 235, 0.4)",
    }
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function MyPlans() {
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
        console.error("Failed to fetch plans:", error);
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

  return (
    <Box sx={pageStyles.container} component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Paper sx={pageStyles.header}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#f8fafc" }}>
            My Fitness Journey
          </Typography>
          <Typography variant="body1" sx={{ color: "#94a3b8", mt: 1 }}>
            View your personalized workout and nutrition guides.
          </Typography>
        </Paper>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card sx={pageStyles.planCard}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "rgba(249, 115, 22, 0.1)", p: 1 }}>
                    <FitnessCenterIcon sx={{ color: '#f97316', fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>Workout Routine</Typography>
                </Box>
                <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.05)' }} />
                <Typography variant="body1" sx={{ color: '#e2e8f0', minHeight: 200, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {data?.workout_plan || "Your trainer hasn't assigned a workout plan yet."}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card sx={pageStyles.planCard}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "rgba(16, 185, 129, 0.1)", p: 1 }}>
                    <RestaurantMenuIcon sx={{ color: '#10b981', fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>Diet & Nutrition</Typography>
                </Box>
                <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.05)' }} />
                <Typography variant="body1" sx={{ color: '#e2e8f0', minHeight: 200, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {data?.diet_plan || "Your trainer hasn't assigned a diet plan yet."}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
