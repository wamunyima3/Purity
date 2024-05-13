import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiCamera } from 'react-icons/fi';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import { useTheme } from '../../ThemeContext';
import { supabase } from '../utils/supabaseClient';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { darkTheme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  //signup
  const signUpWithEmail = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !confirmPassword || !phoneNumber || !gender || !role || !username) {
        throw new Error("All inputs are required.");
      }
      
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      // Show a loading toast before making the request
      toast.info("Logging in...");

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        phone: phoneNumber,
        options: {
          data: {
            gender,
            role,
            username
          }
        },
      });

      if (error) {
        throw error;
      }
  
      // Handle successful login and access user data
      toast.dismiss();
      toast.success("Register successful!");
  
      console.log(data.user);
          
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  

  // Function to handle profile picture selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full select-none text-white px-4 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ToastContainer />
      
      {/* Theme toggle button */}
      <button
        className={`fixed bottom-4 right-4 z-10 rounded-full p-2 ${darkTheme ? 'bg-gray-800' : 'bg-orange-600'}`}
        onClick={toggleTheme}
        tabIndex="0" /*Ensure keyboard navigation*/>
        {darkTheme ? <RiSunFill className="text-yellow-400" /> : <RiMoonFill className="text-white" />}
      </button>
      
      {/* Page heading */}
      <h2 className={`text-3xl font-semibold mb-4 ${darkTheme ? 'text-white' : 'text-gray-800'} select-none`}>Register</h2>
      
      {/* Register form */}
      <form className="w-full max-w-md flex flex-col space-y-6">
        {/* Profile picture selection */}
        <div className="relative flex justify-between items-center">
          <input
            type="file"
            id="photo"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo" className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-6 cursor-pointer hover:bg-gray-200 mr-4">
            {photo ? (
              <img src={photo} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
                <FiCamera className="text-gray-500 w-10 h-10" />
              </div>
            )}
          </label>
          <div className="flex flex-col flex-grow">
            {/* Email input */}
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
            {/* Phone number input */}
            <Input
              type="tel"
              id="phone"
              label="Phone Number"
              placeholder="Your phone number"
              className=' mt-3'
              regexPattern="^\+?[0-9]{1,4}[-\s]?(\d{1,3}[-\s]?)(\(\d{1,4}\)[-.\s]?)?((\d{1,4}[-.\s]?){1,2}\d{1,4}|\d{3,4}[-.\s]?\d{4})$"
              icon={<FiPhone className="text-gray-400" />}
              onChange={(e) => setPhoneNumber(e.target.value)}
              tabIndex="0" 
            />

            {/* Username input */}
            <Input
              id="username"
              label="Username"
              placeholder="Your username"
              icon={<FiUser className="text-gray-400" />}
              className=' mt-3'
              regexPattern="^[a-zA-Z0-9_]{3,20}$"
              onChange={(e) => setUsername(e.target.value)}
              tabIndex="0"
            />
          </div>
        </div>

        {/* Gender and Role selection */}
        <div className="flex space-x-4">
          <div className="relative flex-grow">
            <select
              id="gender"
              className={`appearance-none rounded-lg w-full py-2 pl-3 pr-10 border focus:outline-none focus:ring focus:border-blue-500 ${darkTheme ? 'bg-gray-800' : 'bg-white text-gray-400'}`}
              onChange={(e) => setGender(e.target.value)}
              tabIndex="0" // Ensure keyboard navigation
            >
              <option value="" disabled selected hidden>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div className="relative flex-grow">
            <select
              id="role"
              className={`appearance-none rounded-lg w-full py-2 pl-3 pr-10 border focus:outline-none focus:ring focus:border-blue-500 ${darkTheme ? 'bg-gray-800' : 'bg-white text-gray-400'}`}
              onChange={(e) => setRole(e.target.value)}
              tabIndex="0" // Ensure keyboard navigation
            >
              <option value="" disabled selected hidden>Select Role</option>
              <option value="student">Student/Individual</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        
        {/* Password and Confirm Password inputs */}
        <div className="flex space-x-4">
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
          <Input
            type="password"
            id="confirm_password"
            label="Confirm Password"
            placeholder="Confirm password"
            icon={<FiLock className="text-gray-400" />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
        </div>
 
        {/* Register button */}
        <Button variant="primary" className="w-full" onClick={signUpWithEmail}>Register</Button>
      </form>
      {/* Login link */}
      <p className={`text-lg mt-4 ${darkTheme ? 'text-gray-400' : 'text-gray-600'} select-none`}>
        Old user?{' '}
        <Link to="/" className={"text-orange-600 hover:text-orange-400"}>
          Login here
        </Link>
      </p>
    </div>
  )
}

export default Register;
