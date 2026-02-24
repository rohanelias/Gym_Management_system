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
const TRAINER_ID = 2; // TEMP: replace later with logged-in trainer id

function TrainerDietPlans() {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState(""); // empty OR number
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [diets, setDiets] = useState([]);

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async () => {
    const res = await fetch(
      `${API_BASE}/get_trainer_members.php?trainer_id=${TRAINER_ID}`
    );
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
  };

  /* ================= FETCH DIET PLANS ================= */
  const fetchDiets = async () => {
    const res = await fetch(
      `${API_BASE}/get_diet_plans.php?trainer_id=${TRAINER_ID}`
    );
    const data = await res.json();
    setDiets(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchMembers();
    fetchDiets();
  }, []);

  const handleSubmit = async () => {
    if (!memberId || !plan) {
      setStatus("Select a member and enter a diet plan");
      return;
    }

    setStatus("Saving diet plan...");

    const res = await fetch(`${API_BASE}/add_diet_plan.php`, {
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
      setStatus("Diet plan saved");
      setMemberId("");
      setPlan("");
      fetchDiets();
    } else {
      setStatus("Failed to save diet plan");
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
        Diet Plans
      </Typography>

      {/* ================= ADD DIET PLAN ================= */}
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
            label="Diet Plan"
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
            Save Diet Plan
          </Button>

          {status && <Alert severity="info">{status}</Alert>}
        </Stack>
      </Paper>

      {/* ================= DIET PLANS TABLE ================= */}
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: "#020617", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}>Member</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Diet Plan</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {diets.length > 0 ? (
              diets.map((d) => (
                <TableRow key={d.id} hover>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {d.member_name}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {d.plan}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {d.created_at}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#94a3b8" }}>
                  No diet plans yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TrainerDietPlans;