import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import Input from '../utils/Input';
import Button from '../utils/Button';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white px-4 bg-gray-900">
      <h2 className="text-3xl font-semibold mb-4 select-none">Welcome back to Purity</h2>
      <p className="text-lg text-center text-gray-400 mb-6 select-none">Your intelligent project mentor</p>
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Your email"
            icon={<FiMail className="text-gray-400" />}
            regexPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            className="bg-gray-800"
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
            className="bg-gray-800"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <a href="/forgot-password" className="text-sm text-gray-400 hover:text-gray-200">
            Forgot Password?
          </a>
          <label htmlFor="keepSignedIn" className="flex items-center">
            <input type="checkbox" id="keepSignedIn" className="mr-2" />
            <span className="text-sm text-gray-400">Keep me signed in</span>
          </label>
        </div>
        <Button variant="primary" className="w-full mb-4">Login</Button>
      </form>
      <p className="text-sm text-gray-400">
        New user?{' '}
        <a href="/register" className="text-orange-500 hover:text-orange-300">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
