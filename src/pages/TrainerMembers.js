import { useEffect, useState, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getTrainerMembers } from "../api";
import TrainerMembersTable from "./TrainerMembersTable";
import { AuthContext } from "../context/AuthContext";

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

function TrainerMembers() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchMembers = async () => {
    try {
      // TODO: Replace with actual logged-in trainer id
      const trainerId = user?.id || 2;
      const data = await getTrainerMembers(trainerId);
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch members" });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        My Members
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

      <TrainerMembersTable members={members} />
    </Box>
  );
}

export default TrainerMembers;