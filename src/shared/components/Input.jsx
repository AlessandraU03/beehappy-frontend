// src/shared/components/Input.jsx
import React from 'react';

const Input = ({ label, name, type = 'text', placeholder, value, onChange, error }) => {
  const inputClasses = `
    w-full p-3 rounded-md text-white text-base outline-none box-border
    bg-bh-input-bg border
    ${error ? 'border-bh-error focus:border-bh-error focus:ring-2 focus:ring-bh-error/30' : 'border-bh-input-border focus:border-bh-yellow focus:ring-2 focus:ring-bh-yellow/30'}
    placeholder-bh-light-blue-gray
  `;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="text-sm text-bh-light-blue-gray mb-1">
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