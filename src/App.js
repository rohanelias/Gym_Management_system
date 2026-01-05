import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import RequireRole from "./auth/RequireRole";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Payments from "./pages/Payments";
import Signup from "./auth/Signup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <RequireRole roles={["admin", "trainer", "user"]}>
                <Dashboard />
              </RequireRole>
            }
          />

          <Route
            path="/members"
            element={
              <RequireRole roles={["admin", "trainer"]}>
                <Members />
              </RequireRole>
            }
          />
          <Route
            path="/signup"
            element={<Signup />}
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
              <RequireRole roles={["admin", "user"]}>
                <Payments />
              </RequireRole>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
