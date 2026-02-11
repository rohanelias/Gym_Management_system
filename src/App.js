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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <RequireRole roles={["Admin", "Trainer", "Member"]}>
                <Navbar />
                <Dashboard />
              </RequireRole>
            }
          />

          <Route
            path="/members"
            element={
              <RequireRole roles={["Admin", "Trainer"]}>
                <Navbar />
                <Members />
              </RequireRole>
            }
          />

          <Route
            path="/trainers"
            element={
              <RequireRole roles={["Admin"]}>
                <Navbar />
                <Trainers />
              </RequireRole>
            }
          />

          <Route
            path="/payments"
            element={
              <RequireRole roles={["Admin", "Member"]}>
                <Navbar />
                <Payments />
              </RequireRole>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
