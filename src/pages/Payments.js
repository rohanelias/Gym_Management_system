import React, { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getPayments } from "../api";
import AddPaymentForm from "./AddPaymentForm";
import PaymentsTable from "./PaymentsTable";

const pageStyles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    p: 4,
  },
  title: {
    fontWeight: 700,
    color: "#e2e8f0",
    mb: 3,
  },
};

function Payments() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchPayments = async () => {
    try {
      const paymentsData = await getPayments();
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch payments" });
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchPayments();
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        Payments Management
      </Typography>

      {status && (
        <Alert
          severity={status.severity}
          sx={{ mb: 2 }}
          onClose={() => setStatus(null)}
        >
          {status.message}
        </Alert>
      )}

      <AddPaymentForm onPaymentAdded={handleStatusUpdate} />
      <PaymentsTable payments={payments} />
    </Box>
  );
}

export default Payments;