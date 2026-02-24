import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Stack,
  Alert,
  MenuItem
} from "@mui/material";

const API_BASE = "http://localhost/gym-backend";

/* ========= DARK TEXTFIELD STYLE (FIXES INVISIBLE INPUT) ========= */
const darkTextFieldSX = {
  "& .MuiOutlinedInput-root": {
    color: "#e5e7eb",
    "& fieldset": {
      borderColor: "#334155"
    },
    "&:hover fieldset": {
      borderColor: "#60a5fa"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6"
    }
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8"
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60a5fa"
  }
};

function Members() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: ""
  });

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_members.php`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch {
      setMembers([]);
    }
  };

  /* ================= FETCH TRAINERS ================= */
  const fetchTrainers = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_trainers.php`);
      const data = await res.json();
      setTrainers(Array.isArray(data) ? data : []);
    } catch {
      setTrainers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchTrainers();
  }, []);

  /* ================= ADD MEMBER ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMember = async () => {
    setStatus("Adding member...");

    try {
      const res = await fetch(`${API_BASE}/add_member.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("Member added successfully");
        setForm({ name: "", email: "", password: "", age: "", gender: "" });
        fetchMembers();
      } else {
        setStatus("Failed to add member");
      }
    } catch {
      setStatus("Server error");
    }
  };

  /* ================= ASSIGN TRAINER ================= */
  const assignTrainer = async (memberId) => {
    const trainerId = selectedTrainer[memberId];
    if (!trainerId) {
      setStatus("Please select a trainer");
      return;
    }

    setStatus("Assigning trainer...");

    try {
      const res = await fetch(`${API_BASE}/assign_member_to_trainer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_id: memberId,
          trainer_id: Number(trainerId)
        })
      });

      const data = await res.json();
      setStatus(
        data.status === "success"
          ? "Trainer assigned successfully"
          : "Assignment failed"
      );
    } catch {
      setStatus("Server error");
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
        Members Management
      </Typography>

      {status && <Alert severity="info" sx={{ mb: 2 }}>{status}</Alert>}

      {/* ================= ADD MEMBER FORM ================= */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, backgroundColor: "#020617" }}>
        <Typography variant="h6" sx={{ color: "#e5e7eb", mb: 2 }}>
          Add New Member
        </Typography>

        <Stack spacing={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth sx={darkTextFieldSX} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth sx={darkTextFieldSX} />
          <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} fullWidth sx={darkTextFieldSX} />

          <Stack direction="row" spacing={2}>
            <TextField label="Age" name="age" value={form.age} onChange={handleChange} fullWidth sx={darkTextFieldSX} />
            <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} fullWidth sx={darkTextFieldSX} />
          </Stack>

          <Button variant="contained" onClick={handleAddMember}>
            Add Member
          </Button>
        </Stack>
      </Paper>

      {/* ================= MEMBERS TABLE ================= */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#020617", borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}>ID</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Email</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Trainer</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell sx={{ color: "#e5e7eb" }}>{m.id}</TableCell>
                <TableCell sx={{ color: "#e5e7eb" }}>{m.name}</TableCell>
                <TableCell sx={{ color: "#e5e7eb" }}>{m.email}</TableCell>

                <TableCell>
                  <TextField
                    select
                    size="small"
                    fullWidth
                    value={selectedTrainer[m.id] || ""}
                    onChange={(e) =>
                      setSelectedTrainer({ ...selectedTrainer, [m.id]: e.target.value })
                    }
                    sx={darkTextFieldSX}
                  >
                    {trainers.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>

                <TableCell>
                  <Button size="small" variant="contained" onClick={() => assignTrainer(m.id)}>
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Members;