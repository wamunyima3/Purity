import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import { useTheme } from '../../ThemeContext';

const Login = () => {
  const { darkTheme, toggleTheme } = useTheme();

  // Function to toggle the theme
  const changeTheme = () => {
    toggleTheme(prevTheme => !prevTheme);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full text-white px-4 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <button
      className={`fixed bottom-4 right-4 z-10 rounded-full p-2 ${darkTheme ? 'bg-gray-800' : 'bg-orange-600'}`}
      onClick={toggleTheme}>
      {darkTheme ? <RiSunFill className="text-yellow-400" /> : <RiMoonFill className="text-gray-400" />}
    </button>
      <h2 className={`text-3xl font-semibold mb-4 ${darkTheme ? 'text-white' : 'text-gray-800'} select-none`}>Welcome back to Purity</h2>
      <p className={`text-lg text-center mb-6 ${darkTheme ? 'text-gray-400' : 'text-gray-700'} select-none`}>Your intelligent project mentor</p>
      <form className="w-full max-w-sm select-none">
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Your email"
            icon={<FiMail className="text-gray-400" />}
            regexPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Your password"
            icon={<FiLock className="text-gray-400" />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <a href="/forgot-password" className={`text-sm ${darkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-700'}`}>
            Forgot Password?
          </a>
          <label htmlFor="keepSignedIn" className="flex items-center cursor-pointer">
            <input type="checkbox" id="keepSignedIn" className="mr-2 cursor-pointer" />
            <span className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Keep me signed in</span>
          </label>
        </div>
        <Button variant="primary" className="w-full mb-4">{'Login'}</Button>
      </form>
      <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'} select-none`}>
        New user?{' '}
        <a href="/register" className={"text-orange-600 hover:text-orange-400"}>
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
