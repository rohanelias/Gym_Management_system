import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StarsIcon from "@mui/icons-material/Stars";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { getPlans } from "../api";
import { motion } from "framer-motion";

const planStyles = {
  container: {
    p: { xs: 2, md: 4 },
    minHeight: "calc(100vh - 72px)",
  },
  card: (isElite) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    background: isElite
      ? "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(30, 41, 59, 0.9) 100%)"
      : "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: isElite
      ? "2px solid #2563eb"
      : "1px solid rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  }),
  price: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#2563eb",
    my: 2,
  },
};

const iconMap = {
  Basic: <FitnessCenterIcon sx={{ fontSize: 40, color: "#94a3b8" }} />,
  Premium: <StarsIcon sx={{ fontSize: 40, color: "#facc15" }} />,
  Elite: <WorkspacePremiumIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
};

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        // Ensure data is an array
        setPlans(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={planStyles.container}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 800, mb: 1, color: "#f8fafc", textAlign: "center" }}
      >
        Membership Plans
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "#94a3b8", mb: 6, textAlign: "center", fontWeight: 400 }}
      >
        Choose the perfect tier for your fitness journey
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={planStyles.card(plan.name === "Elite")}>
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      {iconMap[plan.name] || <FitnessCenterIcon />}
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mt: 2, color: "#f8fafc" }}
                      >
                        {plan.name}
                      </Typography>
                      <Typography sx={planStyles.price}>
                        ₹{plan.price}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "#94a3b8" }}
                        >
                          /mo
                        </Typography>
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                    <List sx={{ mb: 4 }}>
                      {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon
                              sx={{
                                fontSize: 20,
                                color:
                                  plan.name === "Elite" ? "#2563eb" : "#10b981",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: "body2",
                              sx: { color: "#cbd5e1" },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <Box sx={{ p: 4, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={plan.name === "Elite" ? "contained" : "outlined"}
                      size="large"
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      Select {plan.name}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography sx={{ color: "#94a3b8" }}>No plans available at the moment.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Plans;
