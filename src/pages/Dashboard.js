import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Box, Typography } from "@mui/material";

function Dashboard() {
  const { role } = useContext(AuthContext);

  if (!role) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography>
        Logged in as: <b>{role}</b>
      </Typography>
    </Box>
  );
}

export default Dashboard;
