import React from "react";
import "@mantine/core/styles.css";
import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          {/* Pass error message */}
          <Route
            path="*"
            element={
              <ErrorPage/>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
