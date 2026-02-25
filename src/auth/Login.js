import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";

const loginStyles = {
  container: {
    minHeight: "100vh",
  },
  leftPanel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    color: "#f8fafc",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
      paper: {
      width: 400,
      padding: 4,
      borderRadius: 2,
      zIndex: 1,
      background: "rgba(15, 23, 42, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#f8fafc",
    },
    title: {
      fontWeight: 700,
      textAlign: "center",
      mb: 2,
      color: "#f8fafc",
    },
    subtitle: {
      textAlign: "center",
      color: "#94a3b8",
      mb: 3,
    },
    textField: {
      mb: 2,
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(255, 255, 255, 0.2)",
        },
        "&:hover fieldset": {
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#2563eb",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#94a3b8",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#2563eb",
      },
      "& .MuiInputBase-input": {
        color: "#f8fafc",
      },
    },
    loginButton: {
      py: 1.5,
    },
    signupButton: {
      mt: 1,
      color: "#94a3b8",
    },
  };
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message !== "Login successful") {
        alert(data.message);
        return;
      }

      const role = data.role.toLowerCase();
      login(role);

      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (role === "trainer") {
        navigate("/trainer-dashboard", { replace: true });
      } else if (role === "member") {
        navigate("/dashboard", { replace: true });
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <Grid container sx={loginStyles.container}>
      <Grid item xs={12} md={6} sx={loginStyles.leftPanel}>
        <video autoPlay muted loop style={loginStyles.video}>
          <source
            src={`${process.env.PUBLIC_URL}/gym-video.mp4`}
            type="video/mp4"
          />
        </video>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: 1, textAlign: "center" }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            NAMMUDE<span style={{ color: "#2563eb" }}>GYM</span>
          </Typography>
          <Typography variant="h5" sx={{ color: "#f8fafc" }}>
            Your fitness journey starts here.
          </Typography>
        </motion.div>
      </Grid>
      <Grid item xs={12} md={6} sx={loginStyles.rightPanel}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paper elevation={10} sx={loginStyles.paper}>
            <Typography variant="h4" sx={loginStyles.title}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={loginStyles.subtitle}>
              Login to continue your fitness journey
            </Typography>

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={loginStyles.textField}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={loginStyles.textField}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              fullWidth
              sx={loginStyles.loginButton}
            >
              Login
            </Button>
            <Button
              variant="text"
              onClick={() => navigate("/signup")}
              fullWidth
              sx={loginStyles.signupButton}
            >
              New user? Sign up
            </Button>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
}

export default Login;