// src/shared/components/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', disabled, variant = 'primary' }) => {
  let buttonClasses = `
    w-full px-4 py-4 rounded-md text-lg font-bold
    cursor-pointer transition-colors duration-200
    ${disabled ? 'opacity-70 cursor-not-allowed bg-gray-400' : ''}
  `;

  if (variant === 'primary') {
    // Estilo que se parece al botón "Enviar código" de la imagen
    buttonClasses += ` bg-[#2A4D69] text-white hover:bg-[#203e54] shadow-md`;
  } else if (variant === 'secondary') {
    // Estilo de tu botón original si lo necesitas en otro lugar
    buttonClasses += ` bg-[#F7B440] text-[#1A2B4C] hover:bg-[#FFD700]`;
  }
  // Puedes añadir más variantes si es necesario

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;