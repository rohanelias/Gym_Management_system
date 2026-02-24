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

      if (data.message !== "Login successful") {
        alert(data.message);
        return;
      }

      // ✅ STORE ROLE IN CONTEXT
      const role = data.role.toLowerCase();
      login(role);

      // ✅ ROLE-BASED REDIRECT
      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (role === "trainer") {
        navigate("/trainer-dashboard", { replace: true });
      } else {
        alert("Unknown role");
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
            Welcome Back
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Login to continue your fitness journey
          </Typography>

          <Divider />

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

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            LOGIN
          </Button>

          <Button
            variant="text"
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