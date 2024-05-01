import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import { useTheme } from '../../ThemeContext';
import { supabase } from '../utils/supabaseClient';
import LoadingIndicator from '../utils/LoadingIndicator';

const Login = () => {
  const { darkTheme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading indicator
      setError(null); // Clear previous error
      
      if (!email || !password) {
        throw new Error("Both email and password are required.");
      }
      
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (error) {
        throw error;
      }
      // Handle successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full text-white px-4 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Loading indicator */}
      {loading && <LoadingIndicator />}

      {/* Theme toggle button */}
      <button
        className={`fixed bottom-4 right-4 z-10 rounded-full p-2 ${darkTheme ? 'bg-gray-800' : 'bg-orange-600'}`}
        onClick={toggleTheme}
        tabIndex="0" // Ensure keyboard navigation
      >
        {darkTheme ? <RiSunFill className="text-yellow-400" /> : <RiMoonFill className="text-white" />}
      </button>
      {/* Page heading */}
      <h2 className={`text-3xl font-semibold mb-4 ${darkTheme ? 'text-white' : 'text-gray-800'} select-none`}>Welcome back to Purity</h2>
      {/* Page description */}
      <p className={`text-lg text-center mb-6 ${darkTheme ? 'text-gray-400' : 'text-gray-700'} select-none`}>Your intelligent project mentor</p>
      
      
      {/* Login form */}
      <form className="w-full max-w-sm select-none" onSubmit={signInWithEmail}>
        {/* Error message */}
        {error && <div className="bg-red-500 text-white text-center rounded-lg py-2 px-4 mb-4">{error}</div>}

        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Your email"
            icon={<FiMail className="text-gray-400" />}
            regexPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
        </div>
        {/* Password input */}
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Your password"
            icon={<FiLock className="text-gray-400" />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
        </div>
        {/* Forgot password link */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/forgot-password" className={`text-sm ${darkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-700'}`}>
            Forgot Password?
          </Link>
          {/* Checkbox for "Keep me signed in" */}
          <label htmlFor="keepSignedIn" className="flex items-center cursor-pointer">
            <input type="checkbox" id="keepSignedIn" className="mr-2 cursor-pointer" />
            <span className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Keep me signed in</span>
          </label>
        </div>
        {/* Login button */}
        <Button variant="primary" className="w-full mb-4">Login</Button>
      </form>
      {/* Registration link */}
      <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'} select-none`}>
        New user?{' '}
        <Link to="register" className={"text-orange-600 hover:text-orange-400"}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
