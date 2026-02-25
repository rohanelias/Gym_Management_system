import { Paper, Typography, Box } from "@mui/material";

const statCardStyles = {
  paper: {
    p: 3,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      background: "rgba(30, 41, 59, 0.8)",
    },
  },
  title: {
    color: "#94a3b8",
    mb: 1,
    fontWeight: 500,
  },
  value: {
    fontWeight: 700,
  },
};

function StatCard({ title, value, icon }) {
  return (
    <Paper elevation={6} sx={statCardStyles.paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" sx={statCardStyles.title}>
            {title}
          </Typography>
          <Typography variant="h4" sx={statCardStyles.value}>
            {value}
          </Typography>
        </Box>
        {icon}
      </Box>
    </Paper>
  );
}

export default StatCard;

