import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick = () => {},
  className = '',
  type = 'default',
  ...restProps
}) => {
  const buttonClasses = [
    'inline-block',
    'text-sm',
    'font-medium',
    'transition',
    'duration-300',
    'rounded',
    'text-white',
    className,
  ];

  const variantClasses = {
    primary: ['bg-orange-600', 'hover:bg-orange-500'],
    secondary: ['bg-gray-500', 'hover:bg-gray-500'],
  };

  const sizeClasses = {
    lg: ['px-6', 'py-3', 'text-lg'],
    md: ['px-4', 'py-2'],
    sm: ['px-2', 'py-1', 'text-xs'],
  };

  const typeClasses = {
    default: [],
    text: ['bg-transparent', 'hover:bg-transparent', 'hover:text-gray-300'],
    icon: ['p-2'],
    'icon-text': ['flex', 'items-center'],
  };

  const classes = [
    ...buttonClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...typeClasses[type],
  ];

  return (
    <button className={classes.join(' ')} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
