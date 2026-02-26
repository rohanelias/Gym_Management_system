import React, { useState, useContext, useEffect } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addPayment, getPlans } from "../api";
import { AuthContext } from "../context/AuthContext";

const formStyles = {
  paper: {
    p: 3,
    mb: 4,
    borderRadius: 3,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "#f8fafc",
    mb: 3,
    fontWeight: 700,
  },
  planCard: (selected) => ({
    height: "100%",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: selected ? "rgba(37, 99, 235, 0.15)" : "rgba(30, 41, 59, 0.4)",
    border: selected ? "2px solid #2563eb" : "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    "&:hover": {
      transform: "translateY(-5px)",
      background: "rgba(37, 99, 235, 0.05)",
    },
  }),
  price: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#2563eb",
    mt: 1,
  },
};

function AddPaymentForm({ onPaymentAdded }) {
  const { user, role } = useContext(AuthContext);
  const [uid, setUid] = useState("");
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);

  const isMember = role === "member";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        console.error("Failed to load plans", err);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();

    if (isMember && user?.id) {
      setUid(user.id);
    }
  }, [isMember, user]);

  const handleAddPayment = async (e) => {
    e.preventDefault();

    const finalUid = isMember ? user.id : uid;
    const plan = plans.find(p => p.id === selectedPlanId);

    if (!finalUid || !plan) {
      onPaymentAdded({
        severity: "warning",
        message: "Please select a plan " + (!isMember ? "and enter Member ID" : ""),
      });
      return;
    }

    try {
      const data = await addPayment(finalUid, plan.price);
      if (data.status === "success") {
        onPaymentAdded({
          severity: "success",
          message: `Successfully paid ₹${plan.price} for the ${plan.name} Plan!`,
        });
        if (!isMember) setUid("");
        setSelectedPlanId("");
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

  if (loadingPlans) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading plans...</Typography></Box>;

  return (
    <Paper sx={formStyles.paper}>
      <Typography variant="h5" sx={formStyles.title}>
        {isMember ? "Choose Your Fitness Plan" : "New Subscription Payment"}
      </Typography>
      
      <form onSubmit={handleAddPayment}>
        <Stack spacing={4}>
          {!isMember && (
            <TextField
              label="Member ID *"
              variant="outlined"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                  "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputBase-input": { color: "#f8fafc" },
              }}
            />
          )}

          <RadioGroup
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(Number(e.target.value))}
          >
            <Grid container spacing={3}>
              {plans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <Grid item xs={12} md={4} key={plan.id}>
                    <Card 
                      sx={formStyles.planCard(isSelected)}
                      onClick={() => setSelectedPlanId(plan.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {plan.name}
                          </Typography>
                          <Radio 
                            value={plan.id}
                            checked={isSelected}
                            sx={{ p: 0, color: 'rgba(255,255,255,0.3)', '&.Mui-checked': { color: '#2563eb' } }}
                          />
                        </Box>
                        
                        <Typography sx={formStyles.price}>
                          ₹{plan.price}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          Per Month
                        </Typography>

                        <List dense sx={{ mt: 2 }}>
                          {plan.features.map((feature, idx) => (
                            <ListItem key={idx} disableGutters>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckCircleIcon sx={{ fontSize: 18, color: isSelected ? '#2563eb' : '#10b981' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={feature} 
                                primaryTypographyProps={{ variant: 'body2', sx: { color: '#e2e8f0' } }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>

          <Button 
            variant="contained" 
            type="submit" 
            size="large"
            disabled={!selectedPlanId}
            sx={{ 
              py: 2, 
              fontWeight: 700, 
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(37, 99, 235, 0.23)',
              }
            }}
          >
            {isMember ? "Complete Payment" : "Process Subscription"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddPaymentForm;