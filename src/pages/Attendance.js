import React, { useState, useEffect } from "react";
import { Box, Typography, Alert, Stack } from "@mui/material";
import { getAttendance, getMembers } from "../api";
import MarkAttendanceForm from "./MarkAttendanceForm";
import AttendanceTable from "./AttendanceTable";

const pageStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  title: {
    fontWeight: 700,
    color: "#e2e8f0",
    mb: 4,
  },
};

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchData = async () => {
    try {
      const [attendanceData, membersData] = await Promise.all([
        getAttendance(),
        getMembers()
      ]);
      setAttendanceList(Array.isArray(attendanceData) ? attendanceData : []);
      setMembers(Array.isArray(membersData) ? membersData : []);
    } catch {
      setAttendanceList([]);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchData();
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        Daily Attendance
      </Typography>

      <Stack spacing={4}>
        {status && (
          <Alert
            severity={status.severity}
            onClose={() => setStatus(null)}
          >
            {status.message}
          </Alert>
        )}

        <MarkAttendanceForm 
          onAttendanceMarked={handleStatusUpdate} 
          members={members}
        />
        <AttendanceTable attendanceList={attendanceList} />
      </Stack>
    </Box>
  );
}

export default Attendance;