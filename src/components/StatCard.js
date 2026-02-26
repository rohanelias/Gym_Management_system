import { Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const statCardStyles = {
  paper: {
    p: 3,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
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

function StatCard({ title, value, icon, onClick }) {
  return (
    <motion.div
      whileHover={{ y: onClick ? -10 : -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
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
    </motion.div>
  );
}

export default StatCard;
