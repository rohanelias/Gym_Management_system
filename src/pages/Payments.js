import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";

const Payments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch('http://localhost/gym-backend/get_payments.php')
            .then(res => res.json())
            .then(data => setPayments(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Revenue & Payments</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                        <TableRow>
                            <TableCell><b>Receipt ID</b></TableCell>
                            <TableCell><b>Member Name</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Date</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((pay) => (
                            <TableRow key={pay.id} hover>
                                <TableCell>#PAY-{pay.id}</TableCell>
                                <TableCell>{pay.user_name}</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#059669' }}>${pay.amount}</TableCell>
                                <TableCell>
                                    <Chip label="Paid" size="small" sx={{ bgcolor: '#dcfce7', color: '#166534' }} />
                                </TableCell>
                                <TableCell>{pay.payment_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Payments;