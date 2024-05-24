import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import PasswordReset from "./pages/PasswordReset";
import "@mantine/notifications/styles.css";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/supervisorDashboard" element={<SupervisorDashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
