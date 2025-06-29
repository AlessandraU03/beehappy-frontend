// src/features/auth/utils/authValidation.js
export const validateRegistrationForm = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'El apellido es obligatorio.';
  }

  if (!data.username.trim()) {
    errors.username = 'El usuario es obligatorio.';
  } else if (data.username.length > 20) {
    errors.username = 'El usuario no debe exceder los 20 caracteres.';
  }

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'El correo electrónico no es válido.';
  }

  if (!data.password.trim()) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (data.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  return errors;
};