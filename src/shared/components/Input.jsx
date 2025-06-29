// src/shared/components/Input.jsx
import React from 'react';

const Input = ({ label, name, type = 'text', placeholder, value, onChange, error }) => {
  const inputClasses = `
    w-full p-3 rounded-md text-white text-base outline-none box-border
    bg-[#2F4F6D] border
    ${error ? 'border-[#FF6347] focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/30' : 'border-[#4A6D90] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30'}
    placeholder-[#B0C4DE]
  `;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="text-sm text-[#B0C4DE] mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
      />
    </div>
  );
};

export default Input;