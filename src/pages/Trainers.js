import React, { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getTrainers } from "../api";
import AddTrainerForm from "./AddTrainerForm";
import TrainersTable from "./TrainersTable";

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

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchTrainers = async () => {
    try {
      const trainersData = await getTrainers();
      setTrainers(Array.isArray(trainersData) ? trainersData : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch trainers" });
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchTrainers();
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        Trainers Management
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

      <AddTrainerForm onTrainerAdded={handleStatusUpdate} />
      <TrainersTable trainers={trainers} />
    </Box>
  );
}

export default Trainers;