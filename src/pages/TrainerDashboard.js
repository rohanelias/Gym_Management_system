import {
  Box,
  Typography,
  Grid,
  Paper
} from "@mui/material";

function TrainerDashboard() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        p: 4
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#f8fafc", mb: 1 }}
      >
        Trainer Dashboard
      </Typography>

      <Typography
        sx={{ color: "#94a3b8", mb: 4 }}
      >
        Manage your assigned members, plans and attendance
      </Typography>

      {/* DASHBOARD CARDS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "#94a3b8" }}>
              Assigned Members
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              12
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "#94a3b8" }}>
              Workout Plans
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              8
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "#94a3b8" }}>
              Diet Plans
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              6
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TrainerDashboard;