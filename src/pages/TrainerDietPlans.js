import { useEffect, useState, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getDietPlans } from "../api";
import AddDietPlanForm from "./AddDietPlanForm";
import DietPlansTable from "./DietPlansTable";
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

function TrainerDietPlans() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchPlans = async () => {
    try {
      // TODO: Replace with actual logged-in trainer id
      const trainerId = user?.id || 2;
      const data = await getDietPlans(trainerId);
      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch diet plans" });
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
        Diet Plans
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

      <AddDietPlanForm
        onDietPlanAdded={handleStatusUpdate}
        trainerId={user?.id || 2}
      />
      <DietPlansTable plans={plans} />
    </Box>
  );
}

export default TrainerDietPlans;