import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { addPayment } from "../api";

const formStyles = {
  paper: {
    p: 3,
    mb: 4,
    borderRadius: 2,
    background: "rgba(30, 41, 59, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "#e2e8f0",
    mb: 2,
    fontWeight: 600,
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

function AddPaymentForm({ onPaymentAdded }) {
  const [uid, setUid] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (!uid || !amount) {
      onPaymentAdded({
        severity: "warning",
        message: "Please enter Member ID and Amount",
      });
      return;
    }

    try {
      const data = await addPayment(uid, amount);
      if (data.status === "success") {
        onPaymentAdded({
          severity: "success",
          message: "Payment added successfully",
        });
        setUid("");
        setAmount("");
      } else {
        onPaymentAdded({
          severity: "error",
          message: data.message || "Payment failed",
        });
      }
    } catch (error) {
      onPaymentAdded({ severity: "error", message: "Server error" });
    }
  };

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h6" sx={formStyles.title}>
        Add New Payment
      </Typography>
      <form onSubmit={handleAddPayment}>
        <Stack spacing={2}>
          <TextField
            label="Member ID *"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
            sx={formStyles.textField}
          />
          <TextField
            label="Amount *"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            sx={formStyles.textField}
          />
          <Button variant="contained" type="submit">
            Add Payment
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddPaymentForm;
