import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button
} from "@mui/material";

import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost/gym-backend/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Signup successful") {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={10} className="login-card">
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          Member Signup
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={handleSignup}>
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default Signup;
