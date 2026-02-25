import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { assignTrainerToMember } from "../api";

const tableStyles = {
  container: {
    background: "rgba(30, 41, 59, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  headerCell: {
    color: "#94a3b8",
    fontWeight: 600,
  },
  bodyCell: {
    color: "#e2e8f0",
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

function MembersTable({ members, trainers, onTrainerAssigned }) {
  const [selectedTrainer, setSelectedTrainer] = useState({});

  const handleAssignTrainer = async (memberId) => {
    const trainerId = selectedTrainer[memberId];
    if (!trainerId) {
      onTrainerAssigned({
        severity: "warning",
        message: "Please select a trainer",
      });
      return;
    }

    try {
      const data = await assignTrainerToMember(memberId, Number(trainerId));
      if (data.status === "success") {
        onTrainerAssigned({
          severity: "success",
          message: "Trainer assigned successfully",
        });
      } else {
        onTrainerAssigned({
          severity: "error",
          message: "Assignment failed",
        });
      }
    } catch (error) {
      onTrainerAssigned({ severity: "error", message: "Server error" });
    }
  };

  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Name</TableCell>
            <TableCell sx={tableStyles.headerCell}>Email</TableCell>
            <TableCell sx={tableStyles.headerCell}>Trainer</TableCell>
            <TableCell sx={tableStyles.headerCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id} hover>
              <TableCell sx={tableStyles.bodyCell}>{m.id}</TableCell>
              <TableCell sx={tableStyles.bodyCell}>{m.name}</TableCell>
              <TableCell sx={tableStyles.bodyCell}>{m.email}</TableCell>
              <TableCell>
                <TextField
                  select
                  size="small"
                  fullWidth
                  value={selectedTrainer[m.id] || ""}
                  onChange={(e) =>
                    setSelectedTrainer({
                      ...selectedTrainer,
                      [m.id]: e.target.value,
                    })
                  }
                  sx={tableStyles.textField}
                >
                  {trainers.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleAssignTrainer(m.id)}
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MembersTable;
