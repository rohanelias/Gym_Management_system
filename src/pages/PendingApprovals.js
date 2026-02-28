import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from "@mui/material";

const tableStyles = {
  container: {
    background: "rgba(30, 41, 59, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    mb: 4,
  },
  headerCell: {
    color: "#94a3b8",
    fontWeight: 600,
  },
  bodyCell: {
    color: "#e2e8f0",
  },
};

function PendingApprovals({ onUpdate }) {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await fetch("http://localhost/gym-backend/get_pending_members.php");
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch pending members", error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApproval = async (uid, status) => {
    try {
      const res = await fetch("http://localhost/gym-backend/approve_member.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, status }),
      });
      const data = await res.json();
      if (data.message.includes("updated")) {
        onUpdate({ severity: "success", message: `Member ${status.toLowerCase()} successfully` });
        fetchPending();
      } else {
        onUpdate({ severity: "error", message: "Failed to update member status" });
      }
    } catch (error) {
      onUpdate({ severity: "error", message: "Server error" });
    }
  };

  if (pending.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ color: "#e2e8f0", mb: 2, fontWeight: 600 }}>
        Pending Approvals
      </Typography>
      <TableContainer component={Paper} sx={tableStyles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyles.headerCell}>ID</TableCell>
              <TableCell sx={tableStyles.headerCell}>Name</TableCell>
              <TableCell sx={tableStyles.headerCell}>Email</TableCell>
              <TableCell sx={tableStyles.headerCell}>Join Date</TableCell>
              <TableCell sx={tableStyles.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pending.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell sx={tableStyles.bodyCell}>{p.id}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.email}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.date}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleApproval(p.id, "Active")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleApproval(p.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PendingApprovals;
