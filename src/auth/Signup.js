import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Stack,
  Paper,
  TextField,
  Divider
} from "@mui/material";

import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
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

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={10} className="login-card">
        <Stack spacing={2}>
          <Typography className="login-title">
            Create Account
          </Typography>

          <Divider />

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={handleSignup}>
            SIGN UP
          </Button>

          <Button variant="text" onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default Signup;
