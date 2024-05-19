import React from "react";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import PasswordReset from "./pages/PasswordReset";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
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
