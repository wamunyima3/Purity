import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ErrorPage from './components/pages/ErrorPage';
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <div className='h-screen bg-gray-900'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Pass error code 404, custom error message, and additional error details */}
          <Route
            path="*"
            element={
              <ErrorPage
                errorCode={404}
                errorMessage="Sorry, the page you are looking for could not be found."
                errorDetails={{
                  requestPath: window.location.pathname,
                  userAgent: window.navigator.userAgent,
                  timestamp: new Date().toISOString(),
                }}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
