import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack
} from "@mui/material";

function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!role) return null;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true }); // 🔥 IMPORTANT
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Gym Management System
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>

          {role === "admin" && (
            <>
              <Button component={Link} to="/members" color="inherit">
                Members
              </Button>
              <Button component={Link} to="/trainers" color="inherit">
                Trainers
              </Button>
              <Button component={Link} to="/payments" color="inherit">
                Payments
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
