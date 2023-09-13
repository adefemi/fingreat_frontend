// Button.js
import React, { FC } from 'react';

interface ButtonProps {
    children: React.ReactNode,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button:FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};

export default Button;
