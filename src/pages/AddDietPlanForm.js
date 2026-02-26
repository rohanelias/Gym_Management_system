import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
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
  const [selectedMember, setSelectedMember] = useState(null);

  const dietTemplates = {
    1: [
      { name: "Maintenance Plan", content: "High Protein (2g/kg), Moderate Carbs, Healthy Fats. Focus on whole foods." }
    ],
    2: [
      { name: "Lean Bulk", content: "Surplus of 200-300 kcal. Day 1 (Gym): High Carbs. Day 2-7 (Rest): High Protein, Moderate Fats." }
    ],
    3: [
      { name: "Fat Loss Focus", content: "High volume, low calorie density. Eggs/Oats for breakfast, Chicken/Veg for lunch, Fish/Salad for dinner." }
    ],
    4: [
      { name: "Balanced Athlete", content: "Macro ratio 40/30/30. Pre-workout complex carbs, Post-workout fast protein." }
    ],
    5: [
      { name: "Intense Hypertrophy", content: "High carb intake on training days (5 days). Glutamine and Creatine supplementation recommended." }
    ],
    6: [
      { name: "Advanced Cutting", content: "Intermittent fasting (16:8). Low carbs, high fiber vegetables, lean protein sources." }
    ],
    7: [
      { name: "Extreme Performance", content: "High calorie intake (3500+). 6-7 small meals throughout the day. Hydration: 4L+ water." }
    ]
  };

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

  const handleMemberChange = (id) => {
    setMemberId(id);
    const member = members.find(m => m.id === id);
    setSelectedMember(member);
    setPlan(""); 
  };

  const applyTemplate = (content) => {
    setPlan(content);
  };

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
        setSelectedMember(null);
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
          onChange={(e) => handleMemberChange(e.target.value)}
          sx={formStyles.textField}
        >
          {members.length > 0 ? (
            members.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name} {m.available_days ? `(${m.available_days} Days)` : ""}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No members assigned</MenuItem>
          )}
        </TextField>

        {selectedMember && (
          <Box sx={{ p: 2, bgcolor: "rgba(16, 185, 129, 0.1)", borderRadius: 1, border: "1px dashed #10b981" }}>
            <Typography variant="subtitle2" sx={{ color: "#f8fafc", mb: 1 }}>
              Member Availability: {selectedMember.available_days || "Not specified"} Days / Week
            </Typography>
            {selectedMember.available_days && (
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {dietTemplates[selectedMember.available_days]?.map((template, idx) => (
                  <Button 
                    key={idx} 
                    variant="outlined" 
                    size="small" 
                    color="success"
                    onClick={() => applyTemplate(template.content)}
                    sx={{ textTransform: "none" }}
                  >
                    Use "{template.name}"
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        )}

        <TextField
          label="Diet Plan"
          multiline
          rows={6}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Select a template above or type diet details here..."
          sx={formStyles.textField}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Save Diet Plan
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddDietPlanForm;
