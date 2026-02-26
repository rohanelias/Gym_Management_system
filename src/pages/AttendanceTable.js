import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";

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
};

function AttendanceTable({ attendanceList }) {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>Member ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Name</TableCell>
            <TableCell sx={tableStyles.headerCell}>Check-In Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceList.length > 0 ? (
            attendanceList.map((row, index) => (
              <TableRow
                key={index}
                hover
                component={motion.tr}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                  },
                }}
              >
                <TableCell sx={tableStyles.bodyCell}>{row.UID}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{row.Name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{row.CheckIn}</TableCell>
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
  );
}

export default AttendanceTable;
