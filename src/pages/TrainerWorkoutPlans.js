import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from "@mui/material";

const API_BASE = "http://localhost/gym-backend";
const TRAINER_ID = 2; // TEMP

function TrainerWorkoutPlans() {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState(""); // empty OR number
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [plans, setPlans] = useState([]);

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async () => {
    const res = await fetch(
      `${API_BASE}/get_trainer_members.php?trainer_id=${TRAINER_ID}`
    );
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
  };

  /* ================= FETCH PLANS ================= */
  const fetchPlans = async () => {
    const res = await fetch(
      `${API_BASE}/get_workout_plans.php?trainer_id=${TRAINER_ID}`
    );
    const data = await res.json();
    setPlans(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  const handleSubmit = async () => {
    if (!memberId || !plan) {
      setStatus("Select a member and enter a plan");
      return;
    }

    setStatus("Saving workout plan...");

    const res = await fetch(`${API_BASE}/add_workout_plan.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainer_id: TRAINER_ID,
        member_id: Number(memberId), // ✅ force number
        plan
      })
    });

    const data = await res.json();

    if (data.status === "success") {
      setStatus("Workout plan saved");
      setMemberId("");
      setPlan("");
      fetchPlans();
    } else {
      setStatus("Failed to save plan");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        p: 4
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ color: "#f8fafc", mb: 3 }}>
        Workout Plans
      </Typography>

      {/* ================= ADD PLAN ================= */}
      <Paper
        elevation={6}
        sx={{ p: 3, mb: 4, borderRadius: 3, backgroundColor: "#020617" }}
      >
        <Stack spacing={2}>
          <TextField
            select
            fullWidth
            label="Select Member"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "#94a3b8" }
            }}
            InputProps={{ style: { color: "#e5e7eb" } }}
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
            label="Workout Plan"
            multiline
            rows={4}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "#94a3b8" }
            }}
            InputProps={{ style: { color: "#e5e7eb" } }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Save Workout Plan
          </Button>

          {status && <Alert severity="info">{status}</Alert>}
        </Stack>
      </Paper>

      {/* ================= PLANS TABLE ================= */}
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: "#020617", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}>Member</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Plan</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {plans.length > 0 ? (
              plans.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {p.member_name}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {p.plan}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {p.created_at}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#94a3b8" }}>
                  No workout plans yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TrainerWorkoutPlans;