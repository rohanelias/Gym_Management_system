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
  Alert
} from "@mui/material";

const API_BASE = "http://localhost/gym-backend";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    speciality: ""
  });
  const [status, setStatus] = useState("");

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
    fetchTrainers();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTrainer = async () => {
    setStatus("Adding trainer...");

    try {
      const res = await fetch(`${API_BASE}/add_trainer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("Trainer added successfully");
        setForm({ name: "", email: "", password: "", speciality: "" });
        fetchTrainers();
      } else {
        setStatus("Failed to add trainer");
      }
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
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#f8fafc", mb: 3 }}
      >
        Trainers Management
      </Typography>

      {/* ================= ADD TRAINER FORM ================= */}
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#020617"
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#e5e7eb", mb: 2 }}
        >
          Add New Trainer
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#e5e7eb" } }}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#e5e7eb" } }}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#e5e7eb" } }}
          />

          <TextField
            label="Speciality"
            name="speciality"
            value={form.speciality}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#e5e7eb" } }}
          />

          <Button variant="contained" onClick={handleAddTrainer}>
            Add Trainer
          </Button>

          {status && <Alert severity="info">{status}</Alert>}
        </Stack>
      </Paper>

      {/* ================= TRAINERS TABLE ================= */}
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          backgroundColor: "#020617",
          borderRadius: 3
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}><b>ID</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Name</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Email</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Speciality</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {trainers.length > 0 ? (
              trainers.map((t) => (
                <TableRow
                  key={t.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.04)"
                    }
                  }}
                >
                  <TableCell sx={{ color: "#e5e7eb" }}>{t.id}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{t.name}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{t.email}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {t.specialization || t.speciality}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 4, color: "#94a3b8" }}
                >
                  No trainers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Trainers;