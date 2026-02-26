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
import { addWorkoutPlan, getTrainerMembers } from "../api";

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

function AddWorkoutPlanForm({ onWorkoutPlanAdded, trainerId }) {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [plan, setPlan] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const workoutTemplates = {
    1: [
      { name: "Full Body (Strength)", content: "1. Barbell Squats: 3x10\n2. Bench Press: 3x10\n3. Deadlifts: 3x5\n4. Lat Pulldowns: 3x12\n5. Overhead Press: 3x10\n6. Plank: 3x1 min" }
    ],
    2: [
      { name: "Upper/Lower Split", content: "Day 1 (Upper): \n- Bench Press: 4x10\n- Bent Over Rows: 4x10\n- DB Shoulder Press: 3x12\n- Lateral Raises: 3x15\n- Bicep Curls: 3x12\n\nDay 2 (Lower): \n- Squats: 4x10\n- Leg Press: 3x12\n- Leg Curls: 3x15\n- Calf Raises: 4x20\n- Hanging Leg Raises: 3x15" }
    ],
    3: [
      { name: "Push / Pull / Legs", content: "Day 1 (Push): Chest, Shoulders, Tris\n- Incline Bench: 4x10\n- Shoulder Press: 3x12\n- Tricep Pushdowns: 3x15\n\nDay 2 (Pull): Back, Bis\n- Deadlifts: 3x8\n- Pullups: 3xMAX\n- Hammer Curls: 3x12\n\nDay 3 (Legs): \n- Squats: 4x10\n- RDLs: 3x12\n- Calf Raises: 4x20" }
    ],
    4: [
      { name: "4-Day Power Split", content: "Mon: Chest & Triceps\nTue: Back & Biceps\nThu: Shoulders & Abs\nFri: Legs (Heavy)" }
    ],
    5: [
      { name: "5-Day Bro Split", content: "Mon (Chest): \n- Flat Bench: 4x10\n- Incline DB Press: 3x12\n- Cable Flyes: 3x15\n- Pushups: 3xMAX\n\nTue (Back): \n- Lat Pulldowns: 4x12\n- Seated Rows: 3x12\n- One Arm Rows: 3x10\n\nWed (Legs): \n- Squats: 4x10\n- Leg Extension: 3x15\n- Leg Press: 3x12\n\nThu (Shoulders): \n- Mil. Press: 4x10\n- Lat. Raises: 4x15\n\nFri (Arms): \n- Curls: 3x12\n- Skullcrushers: 3x12" }
    ],
    6: [
      { name: "Advanced 6-Day Split", content: "Mon: Chest (4 exercises, 4x12)\nTue: Back (4 exercises, 4x12)\nWed: Legs (4 exercises, 4x10)\nThu: Shoulders (3 exercises, 4x15)\nFri: Arms (4 exercises, 3x12)\nSat: Core & Cardio (30 mins HIIT)" }
    ],
    7: [
      { name: "Hardcore 7-Day Growth", content: "Day 1 (Chest): \n- Barbell Bench: 4x8\n- Incline DB Press: 3x10\n- Pec Deck Flyes: 3x15\n- Dips: 3x12\n\nDay 2 (Back): \n- Deadlifts: 3x5\n- Barbell Rows: 4x10\n- Pullups: 3xMAX\n\nDay 3 (Legs): \n- Squats: 4x8\n- Leg Press: 3x12\n- Leg Curls: 3x15\n\nDay 4 (Shoulders): \n- OH Press: 4x10\n- Lateral Raises: 4x20\n- Face Pulls: 3x15\n\nDay 5 (Arms): \n- Barbell Curls: 3x12\n- Tricep Extensions: 3x12\n\nDay 6 (Active Recovery): \n- 45 min Walk & Yoga\n\nDay 7 (Weak Point / Core): \n- Choice of Muscle + Abs" }
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
    setPlan(""); // Reset plan when member changes
  };

  const applyTemplate = (content) => {
    setPlan(content);
  };

  const handleSubmit = async () => {
    if (!memberId || !plan) {
      onWorkoutPlanAdded({
        severity: "warning",
        message: "Select a member and enter a plan",
      });
      return;
    }

    try {
      const data = await addWorkoutPlan({
        trainer_id: trainerId,
        member_id: Number(memberId),
        plan,
      });
      if (data.status === "success") {
        onWorkoutPlanAdded({
          severity: "success",
          message: "Workout plan saved",
        });
        setMemberId("");
        setPlan("");
        setSelectedMember(null);
      } else {
        onWorkoutPlanAdded({
          severity: "error",
          message: "Failed to save plan",
        });
      }
    } catch (error) {
      onWorkoutPlanAdded({ severity: "error", message: "Server error" });
    }
  };

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h6" sx={formStyles.title}>
        Add Workout Plan
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
          <Box sx={{ p: 2, bgcolor: "rgba(37, 99, 235, 0.1)", borderRadius: 1, border: "1px dashed #2563eb" }}>
            <Typography variant="subtitle2" sx={{ color: "#f8fafc", mb: 1 }}>
              Member Availability: {selectedMember.available_days || "Not specified"} Days / Week
            </Typography>
            {selectedMember.available_days && (
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {workoutTemplates[selectedMember.available_days]?.map((template, idx) => (
                  <Button 
                    key={idx} 
                    variant="outlined" 
                    size="small" 
                    onClick={() => applyTemplate(template.content)}
                    sx={{ textTransform: "none" }}
                  >
                    Use "{template.name}" Template
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        )}

        <TextField
          label="Workout Plan"
          multiline
          rows={6}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Select a template above or type plan details here..."
          sx={formStyles.textField}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Save Workout Plan
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddWorkoutPlanForm;
