import { useEffect, useState, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getWorkoutPlans } from "../api";
import AddWorkoutPlanForm from "./AddWorkoutPlanForm";
import WorkoutPlansTable from "./WorkoutPlansTable";
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

function TrainerWorkoutPlans() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchPlans = async () => {
    try {
      // TODO: Replace with actual logged-in trainer id
      const trainerId = user?.id || 2;
      const data = await getWorkoutPlans(trainerId);
      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch workout plans" });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchPlans();
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        Workout Plans
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

      <AddWorkoutPlanForm
        onWorkoutPlanAdded={handleStatusUpdate}
        trainerId={user?.id || 2}
      />
      <WorkoutPlansTable plans={plans} />
    </Box>
  );
}

export default TrainerWorkoutPlans;