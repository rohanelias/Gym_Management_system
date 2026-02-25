import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RequireRole from "./auth/RequireRole";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";
import UserProfile from "./pages/UserProfile";

import TrainerDashboard from "./pages/TrainerDashboard";
import TrainerMembers from "./pages/TrainerMembers";
import TrainerWorkoutPlans from "./pages/TrainerWorkoutPlans";
import TrainerDietPlans from "./pages/TrainerDietPlans";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <RequireRole roles={["admin", "trainer", "member"]}>
                  <Dashboard />
                </RequireRole>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireRole roles={["admin", "trainer", "member"]}>
                  <UserProfile />
                </RequireRole>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <RequireRole roles={["admin", "trainer", "member"]}>
                  <ViewProfile />
                </RequireRole>
              }
            />
            <Route
              path="/members"
              element={
                <RequireRole roles={["admin"]}>
                  <Members />
                </RequireRole>
              }
            />
            <Route
              path="/trainers"
              element={
                <RequireRole roles={["admin"]}>
                  <Trainers />
                </RequireRole>
              }
            />
            <Route
              path="/payments"
              element={
                <RequireRole roles={["admin", "member"]}>
                  <Payments />
                </RequireRole>
              }
            />
            <Route
              path="/attendance"
              element={
                <RequireRole roles={["admin", "trainer"]}>
                  <Attendance />
                </RequireRole>
              }
            />
            <Route
              path="/trainer-dashboard"
              element={
                <RequireRole roles={["trainer"]}>
                  <TrainerDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/trainer-members"
              element={
                <RequireRole roles={["trainer"]}>
                  <TrainerMembers />
                </RequireRole>
              }
            />
            <Route
              path="/trainer-workouts"
              element={
                <RequireRole roles={["trainer"]}>
                  <TrainerWorkoutPlans />
                </RequireRole>
              }
            />
            <Route
              path="/trainer-diets"
              element={
                <RequireRole roles={["trainer"]}>
                  <TrainerDietPlans />
                </RequireRole>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;