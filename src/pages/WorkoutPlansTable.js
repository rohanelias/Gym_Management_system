import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

function WorkoutPlansTable({ plans }) {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>Member</TableCell>
            <TableCell sx={tableStyles.headerCell}>Plan</TableCell>
            <TableCell sx={tableStyles.headerCell}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.length > 0 ? (
            plans.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell sx={tableStyles.bodyCell}>{p.member_name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.plan}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.created_at}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ py: 4, color: "#94a3b8" }}
              >
                No workout plans yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkoutPlansTable;
