import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { markAttendance } from "../api";

const formStyles = {
  paper: {
    p: 3,
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

function MarkAttendanceForm({ onAttendanceMarked }) {
  const [memberId, setMemberId] = useState("");

  const handleCheckIn = async (e) => {
    e.preventDefault();

    if (!memberId) {
      onAttendanceMarked({
        severity: "warning",
        message: "Please enter Member ID",
      });
      return;
    }

    try {
      const data = await markAttendance(memberId);
      if (data.status === "success") {
        onAttendanceMarked({
          severity: "success",
          message: data.message,
        });
        setMemberId("");
      } else {
        onAttendanceMarked({
          severity: "error",
          message: data.message,
        });
      }
    } catch (error) {
      onAttendanceMarked({ severity: "error", message: "Server error" });
    }
  };

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h6" sx={formStyles.title}>
        Mark Member Present
      </Typography>
      <Box component="form" onSubmit={handleCheckIn} sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
          sx={formStyles.textField}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<CheckCircleIcon />}
        >
          Check In
        </Button>
      </Box>
    </Paper>
  );
}

export default MarkAttendanceForm;
