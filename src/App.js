import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RequireRole from "./auth/RequireRole";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";

import TrainerDashboard from "./pages/TrainerDashboard";
import TrainerMembers from "./pages/TrainerMembers";
import TrainerWorkoutPlans from "./pages/TrainerWorkoutPlans";
import TrainerDietPlans from "./pages/TrainerDietPlans";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= COMMON DASHBOARD ================= */}
          <Route
            path="/dashboard"
            element={
              <RequireRole roles={["admin", "trainer", "member"]}>
                <Navbar />
                <Dashboard />
              </RequireRole>
            }
          />

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/members"
            element={
              <RequireRole roles={["admin"]}>
                <Navbar />
                <Members />
              </RequireRole>
            }
          />

          <Route
            path="/trainers"
            element={
              <RequireRole roles={["admin"]}>
                <Navbar />
                <Trainers />
              </RequireRole>
            }
          />

          <Route
            path="/payments"
            element={
              <RequireRole roles={["admin", "member"]}>
                <Navbar />
                <Payments />
              </RequireRole>
            }
          />

          {/* ================= ADMIN + TRAINER ================= */}
          <Route
            path="/attendance"
            element={
              <RequireRole roles={["admin", "trainer"]}>
                <Navbar />
                <Attendance />
              </RequireRole>
            }
          />

          {/* ================= TRAINER ROUTES ================= */}
          <Route
            path="/trainer-dashboard"
            element={
              <RequireRole roles={["trainer"]}>
                <Navbar />
                <TrainerDashboard />
              </RequireRole>
            }
          />

          <Route
            path="/trainer-members"
            element={
              <RequireRole roles={["trainer"]}>
                <Navbar />
                <TrainerMembers />
              </RequireRole>
            }
          />

          <Route
            path="/trainer-workouts"
            element={
              <RequireRole roles={["trainer"]}>
                <Navbar />
                <TrainerWorkoutPlans />
              </RequireRole>
            }
          />

          <Route
            path="/trainer-diets"
            element={
              <RequireRole roles={["trainer"]}>
                <Navbar />
                <TrainerDietPlans />
              </RequireRole>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;