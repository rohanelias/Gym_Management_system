import { useState } from "react";
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
import BackgroundConstellations from "../components/BackgroundConstellations";

const signupStyles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#020617",
    position: "relative",
    overflow: "hidden",
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
    signupButton: {
      py: 1.5,
    },
    loginButton: {
      mt: 1,
      color: "#94a3b8",
    },
  };
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
        body: JSON.stringify({ name, email, password }),
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
    <Grid container sx={signupStyles.container}>
      <BackgroundConstellations />
      <Grid item xs={12} md={6} sx={signupStyles.leftPanel}>
        <video autoPlay muted loop style={signupStyles.video}>
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
            Join us and start your fitness journey.
          </Typography>
        </motion.div>
      </Grid>
      <Grid item xs={12} md={6} sx={signupStyles.rightPanel}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paper elevation={10} sx={signupStyles.paper}>
            <Typography variant="h4" sx={signupStyles.title}>
              Create Account
            </Typography>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={signupStyles.textField}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={signupStyles.textField}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={signupStyles.textField}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSignup}
              fullWidth
              sx={signupStyles.signupButton}
            >
              Sign Up
            </Button>
            <Button
              variant="text"
              onClick={() => navigate("/")}
              fullWidth
              sx={signupStyles.loginButton}
            >
              Back to Login
            </Button>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
}

export default Signup;
