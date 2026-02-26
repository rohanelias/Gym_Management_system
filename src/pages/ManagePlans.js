import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { getPlans, updatePlan } from "../api";

const pageStyles = {
  container: { p: 4, minHeight: "calc(100vh - 72px)" },
  planCard: {
    p: 3,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    height: "100%",
  },
  title: { color: "#f8fafc", mb: 3, fontWeight: 700 },
  featureInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    },
    "& .MuiInputBase-input": { color: "#cbd5e1", py: 1 },
  },
};

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to load plans", err);
    }
  };

  const handlePriceChange = (id, newPrice) => {
    setPlans(plans.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  const handleFeatureChange = (id, fIdx, newValue) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        const newFeatures = [...p.features];
        newFeatures[fIdx] = newValue;
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const addFeature = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, features: [...p.features, "New Feature"] } : p));
  };

  const removeFeature = (id, fIdx) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, features: p.features.filter((_, i) => i !== fIdx) };
      }
      return p;
    }));
  };

  const handleSave = async (plan) => {
    try {
      const res = await updatePlan(plan);
      if (res.status === "success") {
        setStatus({ severity: "success", message: `Updated ${plan.name} Plan successfully!` });
      } else {
        setStatus({ severity: "error", message: res.message || "Update failed" });
      }
    } catch (err) {
      setStatus({ severity: "error", message: "Network error" });
    }
  };

  return (
    <Box sx={pageStyles.container}>
      <Typography variant="h4" sx={pageStyles.title}>Manage Membership Plans</Typography>
      <Typography variant="body1" sx={{ color: "#94a3b8", mb: 4 }}>
        Update the pricing and features available to members.
      </Typography>

      {status && <Alert severity={status.severity} sx={{ mb: 4 }} onClose={() => setStatus(null)}>{status.message}</Alert>}

      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Paper sx={pageStyles.planCard}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#2563eb", mb: 2 }}>
                {plan.name} Tier
              </Typography>
              
              <TextField
                fullWidth
                label="Monthly Price (₹)"
                type="number"
                value={plan.price}
                onChange={(e) => handlePriceChange(plan.id, e.target.value)}
                sx={{ mb: 3, "& .MuiInputBase-input": { color: "#f8fafc" } }}
              />

              <Typography variant="subtitle2" sx={{ color: "#94a3b8", mb: 1 }}>FEATURES</Typography>
              <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.05)" }} />
              
              <Stack spacing={1} sx={{ mb: 3 }}>
                {plan.features.map((feature, fIdx) => (
                  <Box key={fIdx} sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={feature}
                      onChange={(e) => handleFeatureChange(plan.id, fIdx, e.target.value)}
                      sx={pageStyles.featureInput}
                    />
                    <IconButton size="small" color="error" onClick={() => removeFeature(plan.id, fIdx)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={() => addFeature(plan.id)}
                  sx={{ color: "#38bdf8", alignSelf: "flex-start", fontSize: "0.8rem" }}
                >
                  Add Feature
                </Button>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSave(plan)}
                sx={{ fontWeight: 700 }}
              >
                Save {plan.name} Changes
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
