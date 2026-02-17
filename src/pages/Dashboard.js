import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Dashboard = () => {
  const [stats, setStats] = useState({ members: 0, revenue: 0, attendance: 0 });

  useEffect(() => {
    // Replace with your combined stats PHP script if available
    fetch('http://localhost/gym-backend/get_dashboard_stats.php')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Gym Overview</Typography>
      <Grid container spacing={3}>
        <StatCard title="Active Members" value={stats.members} icon={<PeopleIcon color="primary" />} />
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} icon={<ReceiptIcon color="success" />} />
        <StatCard title="Attendance Today" value={stats.attendance} icon={<EventAvailableIcon color="secondary" />} />
      </Grid>
    </Box>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Grid item xs={12} md={4}>
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2 }}>
      {icon}
      <Box>
        <Typography variant="body2" color="textSecondary">{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      </Box>
    </Paper>
  </Grid>
);

export default Dashboard;