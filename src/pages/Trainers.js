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

  const fetchTrainers = async () => {
    const res = await fetch(`${API_BASE}/get_trainers.php`);
    const data = await res.json();
    setTrainers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTrainer = async () => {
    setStatus("Adding trainer...");

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
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Trainers Management
      </Typography>

      {/* ADD TRAINER FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Trainer
        </Typography>

        <Stack spacing={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
          <TextField label="Speciality" name="speciality" value={form.speciality} onChange={handleChange} />

          <Button variant="contained" onClick={handleAddTrainer}>
            Add Trainer
          </Button>

          {status && <Alert severity="info">{status}</Alert>}
        </Stack>
      </Paper>

      {/* TRAINERS TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Speciality</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {trainers.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.email}</TableCell>
                <TableCell>{t.specialization}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Trainers;
