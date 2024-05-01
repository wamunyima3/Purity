import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useTheme } from '../../ThemeContext';

const Input = ({
  type = 'text',
  placeholder = '',
  onChange = () => {},
  icon = null,
  regexPattern = null,
  className = '',
  ...restProps
}) => {
  const { darkTheme } = useTheme();
  const [isValid, setIsValid] = useState(true); // State to track input validity

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = type === 'password' && !showPassword ? 'password' : 'text';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && type === 'email') {
      e.preventDefault(); // Prevent form submission
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isValidInput = new RegExp(regexPattern).test(value); // Check input validity
    setIsValid(isValidInput); // Update input validity state
    onChange(e); // Propagate input change
  };

  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={handleInputChange} // Use the custom change handler
        className={`appearance-none rounded-lg w-full py-2 pl-10 pr-3 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring focus:border-blue-500 ${darkTheme ? 'bg-gray-800' : 'bg-white'} ${isValid ? 'border-gray-300' : 'border-red-500'}`} // Apply dynamic error border classes
        pattern={regexPattern}
        style={{ color: darkTheme ? "#fff" : "#000" }}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {type === 'password' && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
