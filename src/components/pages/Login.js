import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi'; // Import icons
import Input from '../utils/Input';
import Button from '../utils/Button';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-semibold mb-6">Login</h2>
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            placeholder="Your email"
            icon={<FiMail />}
            regexPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            id="password"
            placeholder="Your password"
            icon={<FiLock />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <a href="/forgot-password" className="text-sm text-gray-500">Forgot Password?</a>
          <label htmlFor="keepSignedIn" className="flex items-center">
            <input type="checkbox" id="keepSignedIn" className="mr-2" />
            <span className="text-sm text-gray-500">Keep me signed in</span>
          </label>
        </div>
        <Button variant="primary" className="w-full mb-4">Login</Button>
      </form>
      <p className="text-sm text-gray-500">New user? <a href="/register" className="text-orange-500">Register here</a></p>
    </div>
  );
};

export default Login;
