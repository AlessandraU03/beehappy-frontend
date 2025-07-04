// src/components/FormInput.jsx
import React, { useState } from 'react';

const FormInput = ({
  label, // Nuevo prop para la etiqueta del campo (e.g., "Contraseña nueva:")
  value,
  onChange,
  type = 'text', // Tipo de input HTML (text, password, email, tel, etc.)
  placeholder, // Texto de marcador de posición dentro del input
  icon, // Icono a mostrar a la izquierda del input (emoji o componente)
  disabled = false,
  showPasswordToggle = false, // Para mostrar/ocultar el ojo de la contraseña
  maxLength, // Para limitar la longitud de la entrada
  className = '' // Clase adicional para el div contenedor del input
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determina el tipo de input real basado en showPasswordToggle
  const inputType = showPasswordToggle && isPasswordVisible ? 'text' : type;

  return (
    // w-full asegura que el input ocupe todo el ancho disponible del contenedor padre.
    // mb-10 y los paddings ya están ajustados en PasswordResetView si es necesario en el contenedor principal.
    <div className={`mb-10 w-full ${className}`}>
      {label && (
        // La etiqueta para accesibilidad y como "label" visual sobre el input
        <label htmlFor={label.toLowerCase().replace(/\s/g, '-') + '-input'} className="block text-gray-700 text-xl font-semibold mb-3">
          {label}
        </label>
      )}
      <div className="flex items-center bg-white border border-gray-300 rounded-lg py-6 px-6 shadow-sm
                      focus-within:border-[#2A4D69] focus-within:ring-2 focus-within:ring-[#2A4D69]/30">
        {icon && <span className="text-gray-500 mr-5 text-4xl">{icon}</span>}
        <input
          id={label ? label.toLowerCase().replace(/\s/g, '-') + '-input' : undefined}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className="flex-grow text-2xl outline-none border-none bg-transparent"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ml-2 text-gray-500 hover:text-gray-700 text-2xl"
          >
            {isPasswordVisible ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;