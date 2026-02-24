import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box
} from "@mui/material";

function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!role) return null;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #020617, #111827)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        {/* BRAND */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#f9fafb"
          }}
        >
          GYM<span style={{ color: "#2563eb" }}>PRO</span>
        </Typography>

        {/* NAV LINKS */}
        <Stack direction="row" spacing={1}>
          {/* ================= ADMIN NAV ================= */}
          {role === "admin" && (
            <>
              <NavButton to="/dashboard">Dashboard</NavButton>
              <NavButton to="/members">Members</NavButton>
              <NavButton to="/trainers">Trainers</NavButton>
              <NavButton to="/payments">Payments</NavButton>
              <NavButton to="/attendance">Attendance</NavButton>
            </>
          )}

          {/* ================= TRAINER NAV ================= */}
          {role === "trainer" && (
            <>
              <NavButton to="/trainer-dashboard">Dashboard</NavButton>
              <NavButton to="/trainer-members">My Members</NavButton>
              <NavButton to="/trainer-workouts">Workout Plans</NavButton>
              <NavButton to="/trainer-diets">Diet Plans</NavButton>
              <NavButton to="/attendance">Attendance</NavButton>
            </>
          )}

          {/* LOGOUT */}
          <Box ml={1}>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#f87171",
                borderColor: "rgba(248,113,113,0.4)",
                "&:hover": {
                  backgroundColor: "rgba(248,113,113,0.08)",
                  borderColor: "#f87171"
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

/* REUSABLE NAV BUTTON */
function NavButton({ to, children }) {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: "#e5e7eb",
        textTransform: "none",
        fontWeight: 500,
        px: 2,
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)"
        }
      }}
    >
      {children}
    </Button>
  );
}

export default Navbar;