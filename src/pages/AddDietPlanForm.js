import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { addDietPlan, getTrainerMembers } from "../api";

const formStyles = {
  paper: {
    p: 3,
    mb: 4,
    borderRadius: 2,
    background: "rgba(30, 41, 59, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "#e2e8f0",
    mb: 2,
    fontWeight: 600,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38bdf8",
      },
    },
  },
};

function AddDietPlanForm({ onDietPlanAdded, trainerId }) {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getTrainerMembers(trainerId);
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [trainerId]);

  const handleSubmit = async () => {
    if (!memberId || !plan) {
      onDietPlanAdded({
        severity: "warning",
        message: "Select a member and enter a plan",
      });
      return;
    }

    try {
      const data = await addDietPlan({
        trainer_id: trainerId,
        member_id: Number(memberId),
        plan,
      });
      if (data.status === "success") {
        onDietPlanAdded({
          severity: "success",
          message: "Diet plan saved",
        });
        setMemberId("");
        setPlan("");
      } else {
        onDietPlanAdded({
          severity: "error",
          message: "Failed to save plan",
        });
      }
    } catch (error) {
      onDietPlanAdded({ severity: "error", message: "Server error" });
    }
  };

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h6" sx={formStyles.title}>
        Add Diet Plan
      </Typography>
      <Stack spacing={2}>
        <TextField
          select
          fullWidth
          label="Select Member"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          sx={formStyles.textField}
        >
          {members.length > 0 ? (
            members.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No members assigned</MenuItem>
          )}
        </TextField>
        <TextField
          label="Diet Plan"
          multiline
          rows={4}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          sx={formStyles.textField}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Save Diet Plan
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddDietPlanForm;
