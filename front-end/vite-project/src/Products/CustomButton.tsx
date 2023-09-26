import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const customButtonStyles = {
  backgroundColor: '#080D38',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const customButtonDisabledStyles = {
  ...customButtonStyles,
  opacity: 0.5, 
  cursor: 'not-allowed', 
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => {
  const buttonStyles = disabled ? customButtonDisabledStyles : customButtonStyles;

  return <Button style={buttonStyles} disabled={disabled} {...props}>{children}</Button>;
};

export default CustomButton;
