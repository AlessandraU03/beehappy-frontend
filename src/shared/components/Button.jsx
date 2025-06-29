// src/shared/components/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', disabled }) => {
  const buttonClasses = `
    w-full px-6 py-3 rounded-md text-bh-dark-blue text-lg font-bold
    bg-bh-yellow cursor-pointer transition-colors duration-200
    hover:bg-yellow-400
    ${disabled ? 'opacity-70 cursor-not-allowed bg-gray-400' : ''}
  `;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;