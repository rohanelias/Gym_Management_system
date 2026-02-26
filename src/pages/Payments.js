import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getPayments } from "../api";
import AddPaymentForm from "./AddPaymentForm";
import PaymentsTable from "./PaymentsTable";
import { AuthContext } from "../context/AuthContext";

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
  const { user, role } = useContext(AuthContext);

  const fetchPayments = async () => {
    try {
      const paymentsData = await getPayments();
      const allPayments = Array.isArray(paymentsData) ? paymentsData : [];
      
      // If member, filter to only show their own payments
      if (role === "member" && user?.id) {
        const myPayments = allPayments.filter(p => {
            // Robust check: handle both p.UID and p.uid, and use loose equality
            const paymentUid = p.UID || p.uid;
            return String(paymentUid) === String(user.id);
        });
        setPayments(myPayments);
      } else {
        setPayments(allPayments);
      }
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch payments" });
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user, role]);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      // Add a tiny delay to ensure DB has committed the record
      setTimeout(() => {
        fetchPayments();
      }, 500);
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>
        {role === "member" ? "My Payments" : "Payments Management"}
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

      {role === "member" && <AddPaymentForm onPaymentAdded={handleStatusUpdate} />}
      
      <Typography variant="h5" sx={{ ...pageStyles.title, mt: role === "member" ? 4 : 0, mb: 2 }}>
        {role === "member" ? "My Payment History" : "Recent System Payments"}
      </Typography>
      <PaymentsTable payments={payments} />
    </Box>
  );
}

export default Payments;
