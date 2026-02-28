import React, { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { getMembers, getTrainers } from "../api";
import AddMemberForm from "./AddMemberForm";
import MembersTable from "./MembersTable";
import PendingApprovals from "./PendingApprovals";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Members() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchMembersAndTrainers = async () => {
    try {
      const membersData = await getMembers();
      const trainersData = await getTrainers();
      setMembers(Array.isArray(membersData) ? membersData : []);
      setTrainers(Array.isArray(trainersData) ? trainersData : []);
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to fetch data" });
    }
  };

  useEffect(() => {
    fetchMembersAndTrainers();
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.severity === "success") {
      fetchMembersAndTrainers();
    }
  };

  return (
    <Box 
      sx={pageStyles.container} 
      component={motion.div} 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Typography variant="h4" sx={pageStyles.title}>
          Members Management
        </Typography>
      </motion.div>

      {status && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Alert
            severity={status.severity}
            sx={{ mb: 2 }}
            onClose={() => setStatus(null)}
          >
            {status.message}
          </Alert>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <PendingApprovals onUpdate={handleStatusUpdate} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AddMemberForm onMemberAdded={handleStatusUpdate} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <MembersTable
          members={members}
          trainers={trainers}
          onTrainerAssigned={handleStatusUpdate}
        />
      </motion.div>
    </Box>
  );
}

export default Members;
