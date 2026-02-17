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

function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: ""
  });
  const [status, setStatus] = useState("");

  const fetchMembers = async () => {
    const res = await fetch(`${API_BASE}/get_members.php`);
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMember = async () => {
    setStatus("Adding member...");

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
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Members Management
      </Typography>

      {/* ADD MEMBER FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Member
        </Typography>

        <Stack spacing={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
          <TextField label="Age" name="age" value={form.age} onChange={handleChange} />
          <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} />

          <Button variant="contained" onClick={handleAddMember}>
            Add Member
          </Button>

          {status && <Alert severity="info">{status}</Alert>}
        </Stack>
      </Paper>

      {/* MEMBERS TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Members;
