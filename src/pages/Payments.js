import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Stack,
  Alert
} from "@mui/material";

const API_BASE = "http://localhost/gym-backend";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [uid, setUid] = useState("");
  const [amount, setAmount] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_payments.php`);
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setPayments([]);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= ADD PAYMENT ================= */
  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (!uid || !amount) {
      setStatusMsg("Please enter Member ID and Amount");
      return;
    }

    setStatusMsg("Processing...");

    const body = new URLSearchParams();
    body.append("uid", uid);
    body.append("amount", amount);

    try {
      const res = await fetch(`${API_BASE}/add_payment.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatusMsg("Payment added successfully");
        setUid("");
        setAmount("");
        fetchPayments();
      } else {
        setStatusMsg(data.message || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Server error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        p: 4
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#f8fafc", mb: 3 }}
      >
        Payments
      </Typography>

      {/* ================= ADD PAYMENT FORM ================= */}
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#020617"
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#e5e7eb", mb: 2 }}
        >
          Add Payment
        </Typography>

        <form onSubmit={handleAddPayment}>
          <Stack spacing={2}>
            <TextField
              label="Member ID *"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#94a3b8" } }}
              InputProps={{ style: { color: "#e5e7eb" } }}
            />

            <TextField
              label="Amount *"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#94a3b8" } }}
              InputProps={{ style: { color: "#e5e7eb" } }}
            />

            <Button variant="contained" type="submit">
              Add Payment
            </Button>

            {statusMsg && <Alert severity="info">{statusMsg}</Alert>}
          </Stack>
        </form>
      </Paper>

      {/* ================= PAYMENTS TABLE ================= */}
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          backgroundColor: "#020617",
          borderRadius: 3
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}><b>Receipt</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Member</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Amount</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Status</b></TableCell>
              <TableCell sx={{ color: "#94a3b8" }}><b>Date</b></TableCell>
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
                      backgroundColor: "rgba(255,255,255,0.04)"
                    }
                  }}
                >
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    #PAY-{p.PID}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {p.user_name}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    ₹{Number(p.Amount).toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {p.Status}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
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
    </Box>
  );
}

export default Payments;