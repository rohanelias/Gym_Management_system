import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { addMember } from "../api";

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

function AddMemberForm({ onMemberAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMember = async () => {
    try {
      const data = await addMember(form);
      if (data.status === "success") {
        onMemberAdded({
          severity: "success",
          message: "Member added successfully",
        });
        setForm({ name: "", email: "", password: "", age: "", gender: "" });
      } else {
        onMemberAdded({ severity: "error", message: "Failed to add member" });
      }
    } catch (error) {
      onMemberAdded({ severity: "error", message: "Server error" });
    }
  };

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h6" sx={formStyles.title}>
        Add New Member
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={formStyles.textField}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={formStyles.textField}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          sx={formStyles.textField}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            fullWidth
            sx={formStyles.textField}
          />
          <TextField
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            fullWidth
            sx={formStyles.textField}
          />
        </Stack>
        <Button variant="contained" onClick={handleAddMember}>
          Add Member
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddMemberForm;
