import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const API_BASE = "http://localhost/gym-backend";
const TRAINER_ID = 2; // 🔴 TEMP: replace with logged-in trainer id later

function TrainerMembers() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await fetch(
      `${API_BASE}/get_trainer_members.php?trainer_id=${TRAINER_ID}`
    );
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        p: 4
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#f8fafc", mb: 3 }}
      >
        My Members
      </Typography>

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: "#020617", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}><b>ID</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Name</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Email</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.length > 0 ? (
              members.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell sx={{ color: "#e5e7eb" }}>{m.id}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{m.name}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{m.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ py: 4, color: "#94a3b8" }}
                >
                  No members assigned
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TrainerMembers;