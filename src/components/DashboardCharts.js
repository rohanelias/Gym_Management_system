import React from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

const chartStyles = {
  container: {
    width: '100%',
    height: 300,
    '& .MuiChartsAxis-tickLabel': {
      fill: '#94a3b8 !important',
    },
    '& .MuiChartsAxis-line': {
      stroke: '#94a3b8 !important',
    },
    '& .MuiChartsLegend-label': {
      fill: '#f8fafc !important',
    },
  },
};

export function RevenueChart({ data }) {
  // Mock data if none provided
  const chartData = data || [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
  ];

  return (
    <Box sx={chartStyles.container}>
      <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2 }}>Revenue Over Time</Typography>
      <LineChart
        series={[
          {
            data: chartData.map(d => d.revenue),
            label: 'Revenue (₹)',
            color: '#2563eb',
            area: true,
          },
        ]}
        xAxis={[{ 
            scaleType: 'point', 
            data: chartData.map(d => d.month),
        }]}
        height={250}
        margin={{ left: 50, right: 30, top: 20, bottom: 30 }}
      />
    </Box>
  );
}

export function MemberDistributionChart({ members, trainers }) {
  return (
    <Box sx={chartStyles.container}>
      <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2 }}>Staff vs Members</Typography>
      <BarChart
        series={[
          { data: [members], label: 'Members', color: '#2563eb' },
          { data: [trainers], label: 'Trainers', color: '#f97316' },
        ]}
        xAxis={[{ scaleType: 'band', data: ['Population'] }]}
        height={250}
        margin={{ left: 50, right: 30, top: 20, bottom: 30 }}
      />
    </Box>
  );
}

export function AttendanceChart({ data }) {
    const chartData = data || [
      { day: 'Mon', count: 120 },
      { day: 'Tue', count: 150 },
      { day: 'Wed', count: 130 },
      { day: 'Thu', count: 170 },
      { day: 'Fri', count: 160 },
      { day: 'Sat', count: 90 },
      { day: 'Sun', count: 40 },
    ];
  
    return (
      <Box sx={chartStyles.container}>
        <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2 }}>Weekly Attendance</Typography>
        <BarChart
          series={[
            {
              data: chartData.map(d => d.count),
              label: 'Attendance',
              color: '#10b981',
            },
          ]}
          xAxis={[{ 
              scaleType: 'band', 
              data: chartData.map(d => d.day),
          }]}
          height={250}
          margin={{ left: 50, right: 30, top: 20, bottom: 30 }}
        />
      </Box>
    );
  }
