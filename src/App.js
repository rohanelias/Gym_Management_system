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
import Attendance from "./pages/Attendance"; // New Import

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route
  path="/dashboard"
  element={
    <RequireRole roles={["admin", "trainer", "member"]}>
      <Navbar />
      <Dashboard />
    </RequireRole>
  }
/>

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
  path="/attendance"
  element={
    <RequireRole roles={["admin", "trainer"]}>
      <Navbar />
      <Attendance />
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

{/* Catch-all MUST be last */}
<Route path="*" element={<Navigate to="/" />} />



          



        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;