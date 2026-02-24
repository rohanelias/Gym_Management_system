import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Stack
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const API_BASE = "http://localhost/gym-backend";

function Attendance() {
  const [memberId, setMemberId] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [status, setStatus] = useState({ message: "", type: "" });

  /* ================= FETCH ATTENDANCE ================= */
  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_attendance.php`);
      const data = await res.json();
      setAttendanceList(Array.isArray(data) ? data : []);
    } catch {
      setAttendanceList([]);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  /* ================= MARK ATTENDANCE ================= */
  const handleCheckIn = async (e) => {
    e.preventDefault();

    if (!memberId) {
      setStatus({ message: "Please enter Member ID", type: "error" });
      return;
    }

    setStatus({ message: "Processing...", type: "info" });

    try {
      const res = await fetch(`${API_BASE}/mark_attendance.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          member_id: Number(memberId)
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus({ message: data.message, type: "success" });
        setMemberId("");
        fetchAttendance();
      } else {
        setStatus({ message: data.message, type: "error" });
      }
    } catch {
      setStatus({ message: "Server error", type: "error" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        p: 4
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#f8fafc", mb: 4 }}
      >
        Daily Attendance
      </Typography>

      <Stack spacing={4}>
        {/* ================= CHECK-IN FORM ================= */}
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#020617"
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#e5e7eb", mb: 2 }}
          >
            Mark Member Present
          </Typography>

          <Box
            component="form"
            onSubmit={handleCheckIn}
            sx={{ display: "flex", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#94a3b8" } }}
              InputProps={{ style: { color: "#e5e7eb" } }}
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<CheckCircleIcon />}
            >
              Check In
            </Button>
          </Box>

          {status.message && (
            <Alert severity={status.type} sx={{ mt: 2 }}>
              {status.message}
            </Alert>
          )}
        </Paper>

        {/* ================= ATTENDANCE TABLE ================= */}
        <TableContainer
          component={Paper}
          elevation={6}
          sx={{
            backgroundColor: "#020617",
            borderRadius: 3
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}><b>Member ID</b></TableCell>
                <TableCell sx={{ color: "#94a3b8" }}><b>Name</b></TableCell>
                <TableCell sx={{ color: "#94a3b8" }}><b>Check-In Time</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attendanceList.length > 0 ? (
                attendanceList.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.04)"
                      }
                    }}
                  >
                    <TableCell sx={{ color: "#e5e7eb" }}>
                      {row.UID}
                    </TableCell>
                    <TableCell sx={{ color: "#e5e7eb" }}>
                      {row.Name}
                    </TableCell>
                    <TableCell sx={{ color: "#e5e7eb" }}>
                      {row.CheckIn}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ py: 4, color: "#94a3b8" }}
                  >
                    No attendance marked today
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default Attendance;