import { useState, useEffect, useContext } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Alert, 
  Avatar, 
  Divider, 
  Chip, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  MenuItem,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateAvailability } from "../api";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";

const pageStyles = {
  container: { p: { xs: 2, md: 4 }, minHeight: "calc(100vh - 72px)" },
  profileHeader: {
    p: 4, borderRadius: 4,
    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)",
    backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)",
    mb: 4, display: "flex", flexDirection: { xs: "column", md: "row" },
    alignItems: "center", gap: 4,
  },
  avatar: {
    width: 140, height: 140, fontSize: "3rem", bgcolor: "#2563eb",
    boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
    border: "4px solid rgba(255, 255, 255, 0.1)",
  },
  avatarContainer: {
    position: "relative",
  },
  uploadButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    bgcolor: "#2563eb",
    color: "#fff",
    "&:hover": { bgcolor: "#1d4ed8" },
  },
  sectionTitle: { fontWeight: 700, color: "#f8fafc", mb: 3, display: "flex", alignItems: "center", gap: 1 },
};

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [availableDays, setAvailableDays] = useState("");
  const [uploading, setUploading] = useState(false);
  
  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const { user, role } = useContext(AuthContext);

  const isMember = role === "member";
  const isAdmin = role === "admin";

  const handleOpenPlan = (type) => {
    if (!isMember) return;
    
    if (type === "workout") {
      setModalTitle("My Workout Plan");
      setModalContent(profile.workout_plan || "No workout plan assigned yet.");
    } else {
      setModalTitle("My Nutrition Diet Plan");
      setModalContent(profile.diet_plan || "No diet plan assigned yet.");
    }
    setOpenModal(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("user_id", user.id);

    setUploading(true);
    try {
      const response = await fetch("http://localhost/gym-backend/update_profile_pic.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status === "success") {
        setProfile(prev => ({ ...prev, profile_pic: data.url }));
        setStatus({ severity: "success", message: "Profile picture updated successfully!" });
      } else {
        setStatus({ severity: "error", message: data.message });
      }
    } catch (error) {
      setStatus({ severity: "error", message: "Failed to upload image" });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        const data = await getUserProfile(user.id);
        setProfile(data);
        if (data.available_days) {
          setAvailableDays(data.available_days);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdateAvailability = async () => {
    try {
      const res = await updateAvailability(user.id, availableDays);
      if (res.status === "success") {
        setStatus({ severity: "success", message: res.message || "Availability updated successfully!" });
      } else {
        setStatus({ severity: "error", message: res.message || "Failed to update availability" });
      }
    } catch (error) {
      console.error("Update Error:", error);
      setStatus({ severity: "error", message: "Error: " + error.message });
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!profile) return <Alert severity="error">Profile not found</Alert>;

  const adminStats = [
    { title: "System Revenue", value: `₹${profile.total_revenue?.toLocaleString()}`, icon: <AttachMoneyIcon sx={{ color: "#10b981" }} /> },
    { title: "Active Members", value: profile.active_members?.toString(), icon: <PeopleIcon sx={{ color: "#38bdf8" }} /> },
    { title: "Active Trainers", value: profile.active_trainers?.toString(), icon: <FitnessCenterIcon sx={{ color: "#f97316" }} /> },
    { title: "Today's Attendance", value: profile.today_attendance?.toString(), icon: <EventAvailableIcon sx={{ color: "#2563eb" }} /> },
  ];

  const trainerStats = [
    { title: "Assigned Members", value: profile.member_count?.toString() || "0", icon: <PeopleIcon sx={{ color: "#38bdf8" }} /> },
    { title: "Workout Plans", value: profile.workout_plans_count?.toString() || "0", icon: <FitnessCenterIcon sx={{ color: "#818cf8" }} /> },
    { title: "Diet Plans", value: profile.diet_plans_count?.toString() || "0", icon: <RestaurantMenuIcon sx={{ color: "#facc15" }} /> },
  ];

  const memberStats = [
    { title: "My Trainer", value: profile.trainer_name || "None", icon: <PeopleIcon sx={{ color: "#38bdf8" }} /> },
    { title: "Workout Plan", value: "View", icon: <FitnessCenterIcon sx={{ color: "#818cf8" }} />, onClick: () => handleOpenPlan("workout") },
    { title: "Diet Plan", value: "View", icon: <RestaurantMenuIcon sx={{ color: "#facc15" }} />, onClick: () => handleOpenPlan("diet") },
    { title: "Attendance (30d)", value: profile.attendance_count?.toString() || "0", icon: <EventAvailableIcon sx={{ color: "#10b981" }} /> },
  ];

  let stats = memberStats;
  if (isAdmin) stats = adminStats;
  else if (role === "trainer") stats = trainerStats;

  return (
    <Box sx={pageStyles.container}>
      {status && (
        <Alert severity={status.severity} sx={{ mb: 2 }} onClose={() => setStatus(null)}>
          {status.message}
        </Alert>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper sx={pageStyles.profileHeader}>
          <Box sx={pageStyles.avatarContainer}>
            <Avatar 
              src={profile.profile_pic} 
              sx={pageStyles.avatar}
            >
              {!profile.profile_pic && profile.name?.charAt(0)}
            </Avatar>
            <IconButton 
              sx={pageStyles.uploadButton} 
              component="label" 
              disabled={uploading}
            >
              <input 
                hidden 
                accept="image/*" 
                type="file" 
                onChange={handleFileChange} 
              />
              {uploading ? <CircularProgress size={24} color="inherit" /> : <PhotoCameraIcon />}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "#f8fafc" }}>{profile.name}</Typography>
              <Chip label={role?.toUpperCase()} color="primary" size="small" sx={{ fontWeight: 600 }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 3, color: "#94a3b8" }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EmailIcon fontSize="small" />{profile.email}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><BadgeIcon fontSize="small" />ID: #{profile.id}</Box>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      <Typography variant="h5" sx={pageStyles.sectionTitle}>{isAdmin ? "System Overview" : "My Statistics"}</Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={isAdmin ? 3 : 4} key={index}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
              <StatCard title={stat.title} value={stat.value} icon={stat.icon} onClick={stat.onClick} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Plan Details Modal */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#f8fafc",
            borderRadius: 3,
            minWidth: { xs: '90%', md: 500 }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 2 }}>
          {modalTitle}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#cbd5e1' }}>
            {modalContent}
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setOpenModal(false)}
            sx={{ mt: 4, fontWeight: 700 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Grid container spacing={4}>
        {isMember && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, background: "rgba(15, 23, 42, 0.8)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)", height: "100%" }}>
              <Typography variant="h6" sx={{ color: "#f8fafc", mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon /> Set My Availability
              </Typography>
              <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.05)" }} />
              <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
                Let your trainer know how many days per week you're available for workouts. This helps them provide tailored plans.
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  select
                  label="Days per week"
                  value={availableDays}
                  onChange={(e) => setAvailableDays(e.target.value)}
                  sx={{ 
                    flexGrow: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                    },
                    "& .MuiInputBase-input": { color: "#f8fafc" },
                    "& .MuiInputLabel-root": { color: "#94a3b8" },
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <MenuItem key={d} value={d}>
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </MenuItem>
                  ))}
                </TextField>
                <Button variant="contained" onClick={handleUpdateAvailability} sx={{ height: 56 }}>
                  Update
                </Button>
              </Stack>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12} md={isMember ? 6 : 12}>
          <Paper sx={{ p: 3, background: "rgba(15, 23, 42, 0.8)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)", height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#f8fafc", mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon /> {isAdmin ? "Global Recent Activity" : "My Recent Payments"}
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.05)" }} />
            <List>
              {(profile.recent_activity || []).map((activity, idx) => (
                <ListItem key={idx} sx={{ px: 0 }}>
                  <ListItemText 
                    primary={isAdmin ? `${activity.member_name} paid ₹${activity.Amount}` : `Payment of ₹${activity.Amount}`}
                    secondary={activity.PaymentDate}
                    primaryTypographyProps={{ color: "#e2e8f0" }}
                    secondaryTypographyProps={{ color: "#94a3b8" }}
                  />
                  <Chip label={activity.Status} size="small" color={activity.Status === "Paid" ? "success" : "warning"} variant="outlined" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
