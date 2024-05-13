import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ErrorPage from './components/pages/ErrorPage';

export default function App() {
  return (
    <div className='h-screen bg-gray-900'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Pass error message */}
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
