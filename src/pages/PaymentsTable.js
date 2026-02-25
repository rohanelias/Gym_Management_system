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

function PaymentsTable({ payments }) {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>Receipt</TableCell>
            <TableCell sx={tableStyles.headerCell}>Member</TableCell>
            <TableCell sx={tableStyles.headerCell}>Amount</TableCell>
            <TableCell sx={tableStyles.headerCell}>Status</TableCell>
            <TableCell sx={tableStyles.headerCell}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((p) => (
              <TableRow
                key={p.PID}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                  },
                }}
              >
                <TableCell sx={tableStyles.bodyCell}>#PAY-{p.PID}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.user_name}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  ₹{Number(p.Amount).toFixed(2)}
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}>{p.Status}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  {p.PaymentDate}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ py: 4, color: "#94a3b8" }}
              >
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaymentsTable;
