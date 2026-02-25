import React, { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getMembers, getTrainers } from "../api";
import AddMemberForm from "./AddMemberForm";
import MembersTable from "./MembersTable";

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

function Members() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchMembersAndTrainers = async () => {
    try {
      const membersData = await getMembers();
      const trainersData = await getTrainers();
      setMembers(Array.isArray(membersData) ? membersData : []);
      setTrainers(Array.isArray(trainersData) ? trainersData : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch data" });
    }
  };

  useEffect(() => {
    fetchMembersAndTrainers();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchMembersAndTrainers();
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        Members Management
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

      <AddMemberForm onMemberAdded={handleStatusUpdate} />
      <MembersTable
        members={members}
        trainers={trainers}
        onTrainerAssigned={handleStatusUpdate}
      />
    </Box>
  );
}

export default Members;