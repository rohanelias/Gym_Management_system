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

function TrainersTable({ trainers }) {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Name</TableCell>
            <TableCell sx={tableStyles.headerCell}>Email</TableCell>
            <TableCell sx={tableStyles.headerCell}>Speciality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.length > 0 ? (
            trainers.map((t) => (
              <TableRow
                key={t.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                  },
                }}
              >
                <TableCell sx={tableStyles.bodyCell}>{t.id}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{t.name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{t.email}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  {t.specialization || t.speciality}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                No trainers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TrainersTable;
