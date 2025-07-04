import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  options = [], // para select o radio
  checked,       // para checkbox o radio
  rows = 4,      // para textarea
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
}) => {
  const baseInputClasses = `
    w-full p-3 rounded-md text-white text-lg font-semibold outline-none box-border
    border-2
    ${error
      ? 'border-[#FF6347] focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/30'
      : 'border-white focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30'}
    placeholder-[#B0C4DE]
  `;

  const finalInputClasses = `${baseInputClasses} ${inputClassName}`;

  return (
    <div className={`flex flex-col w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={name} className={`text-white text-base font-semibold mb-2 ${labelClassName}`}>
          {label}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={finalInputClasses}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={finalInputClasses}
        >
          <option value="" disabled>Seleccionar</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' || type === 'radio' ? (
        <div className="flex items-center gap-2">
          <input
            id={name}
            name={name}
            type={type}
            checked={checked}
            onChange={onChange}
            className={`form-${type} h-5 w-5 text-yellow-500 bg-[#1A2B4C] border-gray-600 rounded focus:ring-yellow-500 ${inputClassName}`}
          />
          <label htmlFor={name} className={`text-white text-base ${labelClassName}`}>
            {placeholder}
          </label>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={finalInputClasses}
        />
      )}
    </div>
  );
};

export default Input;
