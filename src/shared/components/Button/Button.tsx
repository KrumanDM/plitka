import React from 'react';
import s from './Button.module.css'

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, type = "button",style }) => {
    return (
      <button
        className={`${s.button} ${className || ''}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        style={style}
      >
        {children}
      </button>
    );
  };
  

export default Button;