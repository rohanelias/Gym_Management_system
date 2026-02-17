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

  // Fetch today's attendance
  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_attendance.php`);
      const data = await res.json();
      setAttendanceList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch attendance failed:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Mark attendance
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
          member_id: Number(memberId)   // ✅ THIS WAS THE ISSUE
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
    } catch (err) {
      setStatus({ message: "Server error", type: "error" });
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Daily Attendance
      </Typography>

      <Stack spacing={4}>
        {/* CHECK-IN FORM */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
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

        {/* ATTENDANCE TABLE */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
              <TableRow>
                <TableCell><b>Member ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Check-In Time</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attendanceList.length > 0 ? (
                attendanceList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.UID}</TableCell>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>{row.CheckIn}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
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
