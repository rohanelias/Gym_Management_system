import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
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

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost/gym-backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.role) {
        alert(data.message || "Invalid credentials");
        return;
      }

      login(data.role);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={12} className="login-card">
        <Stack spacing={2}>
          <Typography className="login-title">
            Welcome Back
          </Typography>

          <Typography className="login-subtitle">
            Login to continue your fitness journey
          </Typography>

          <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

          {/* Email */}
          <TextField
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              sx: {
                color: "#1f2933",
                caretColor: "#1f2933",
                backgroundColor: "#ffffff",
                borderRadius: "8px"
              }
            }}
            InputLabelProps={{
              sx: {
                color: "#6b7280",
                "&.Mui-focused": {
                  color: "#2563eb"
                }
              }
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              sx: {
                color: "#1f2933",
                caretColor: "#1f2933",
                backgroundColor: "#ffffff",
                borderRadius: "8px"
              }
            }}
            InputLabelProps={{
              sx: {
                color: "#6b7280",
                "&.Mui-focused": {
                  color: "#2563eb"
                }
              }
            }}
          />

          <Button
            variant="contained"
            size="large"
            className="login-btn"
            onClick={handleLogin}
          >
            LOGIN
          </Button>

          <Button
            variant="text"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            New user? Sign up
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default Login;
