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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Payments
      </Typography>

      {/* ================= ADD PAYMENT FORM ================= */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add Payment
        </Typography>

        <form onSubmit={handleAddPayment}>
          <Stack spacing={2}>
            <TextField
              label="Member ID *"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />

            <TextField
              label="Amount *"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <Button type="submit" variant="contained">
              ADD PAYMENT
            </Button>

            {statusMsg && <Alert severity="info">{statusMsg}</Alert>}
          </Stack>
        </form>
      </Paper>

      {/* ================= PAYMENTS TABLE ================= */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell><b>Receipt</b></TableCell>
              <TableCell><b>Member</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.length > 0 ? (
              payments.map((p) => (
                <TableRow key={p.PID}>
                  <TableCell>#PAY-{p.PID}</TableCell>
                  <TableCell>{p.user_name}</TableCell>
                  <TableCell>₹{Number(p.Amount).toFixed(2)}</TableCell>
                  <TableCell>{p.Status}</TableCell>
                  <TableCell>{p.PaymentDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
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
