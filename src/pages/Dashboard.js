import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { role } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>

      {role === "admin" && <p>Admin overview & statistics</p>}
      {role === "trainer" && <p>Trainer schedule & members</p>}
      {role === "user" && <p>Your workouts & membership info</p>}
    </div>
  );
}

export default Dashboard;
