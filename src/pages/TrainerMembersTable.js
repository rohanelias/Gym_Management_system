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

function TrainerMembersTable({ members }) {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Name</TableCell>
            <TableCell sx={tableStyles.headerCell}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.length > 0 ? (
            members.map((m) => (
              <TableRow
                key={m.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                  },
                }}
              >
                <TableCell sx={tableStyles.bodyCell}>{m.id}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{m.name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{m.email}</TableCell>
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
  );
}

export default TrainerMembersTable;
