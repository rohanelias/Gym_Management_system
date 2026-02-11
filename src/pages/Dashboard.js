import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid } from "@mui/material";
import IconCard from "../components/IconCard";

function Dashboard() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  if (role !== "Member") return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 3, md: 6 },
        py: 5,
        background:
          "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)"
      }}
    >
      {/* Header */}
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ mb: 1 }}
      >
        Welcome Back 👋
      </Typography>

      <Typography
        variant="body1"
        sx={{ opacity: 0.7, mb: 5 }}
      >
        Everything you need for your fitness journey
      </Typography>

      {/* Icon Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <IconCard
            icon="🏋️‍♂️"
            title="Workouts"
            subtitle="Training plans by your coach"
            accent="linear-gradient(135deg,#667eea,#764ba2)"
            onClick={() => navigate("/member/workouts")}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <IconCard
            icon="🥗"
            title="Diet"
            subtitle="Personalized nutrition"
            accent="linear-gradient(135deg,#43cea2,#185a9d)"
            onClick={() => navigate("/member/diet")}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <IconCard
            icon="📊"
            title="Progress"
            subtitle="Track your growth"
            accent="linear-gradient(135deg,#f7971e,#ffd200)"
            onClick={() => navigate("/member/progress")}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <IconCard
            icon="👤"
            title="Membership"
            subtitle="Plan & validity"
            accent="linear-gradient(135deg,#ff758c,#ff7eb3)"
            onClick={() => navigate("/member/membership")}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
