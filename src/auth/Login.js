import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Stack,
  Paper,
  TextField
} from "@mui/material";

import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login button clicked");

    try {
      const res = await fetch("http://localhost/gym-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok || !data.role) {
        alert(data.message || "Invalid credentials");
        return;
      }

      
      login(data.role);

      
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      alert("Cannot connect to server");
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={10} className="login-card">
        <Typography
          variant="h6"
          sx={{ color: "white", mb: 3, letterSpacing: 1 }}
        >
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "white" } }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "white" } }}
          />
           <Button
              variant="text"
              onClick={() => navigate("/signup")}
             >
              New user? Sign up
         </Button>
          <Button
  type="button"
  variant="contained"
  color="primary"
  size="large"
  onClick={handleLogin}
  disableRipple
  disableFocusRipple
  tabIndex={-1}
  sx={{
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
    "&:focus": {
      outline: "none"
    },
    "&:focus-visible": {
      outline: "none"
    }
  }}
>
  LOGIN
</Button>

          
        </Stack>
      </Paper>
    </div>
  );
}

export default Login;
