import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Divider } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Plans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch('http://localhost/gym-backend/get_plans.php')
            .then(res => res.json())
            .then(data => setPlans(data))
            .catch(err => console.error("Error fetching plans:", err));
    }, []);

    return (
        <Box sx={{ p: 4, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Membership Plans</Typography>
            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                                <FitnessCenterIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>{plan.name}</Typography>
                                <Typography variant="h4" sx={{ my: 2, color: '#2563eb' }}>
                                    ${plan.amount}
                                </Typography>
                                <Chip label={`${plan.duration} Days`} color="primary" variant="outlined" />
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Full Access to Gym Equipment<br />
                                    Locker Room Access
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ pb: 3, px: 3 }}>
                                <Button fullWidth variant="contained" sx={{ borderRadius: 2 }}>Select Plan</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Plans;