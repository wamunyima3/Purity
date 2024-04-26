import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import icons

const Input = ({
  type = 'text',
  placeholder = '',
  onChange = () => {},
  icon = null,
  regexPattern = null,
  className = '',
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = [
    'border',
    'rounded',
    'py-2',
    'pl-10',
    'pr-4',
    'outline-none',
    'transition',
    'duration-300',
    className,
  ];

  const inputWrapperClasses = [
    'relative',
    className,
  ];

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={inputWrapperClasses.join(' ')}>
      {icon && <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>}
      <input
        type={showPassword ? 'text' : type} // Updated here
        placeholder={placeholder}
        onChange={onChange}
        className={inputClasses.join(' ')}
        {...restProps}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center focus:outline-none"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
