// src/features/auth/hooks/useRegistration.js
import { useState } from 'react';
import { validateRegistrationForm } from '../utils/authValidation';
import { registerUser } from '../services/authService';

const useRegistration = (onSuccess) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    usuario: '',
    correo_electronico: '',
    contrasena: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationError(null); // Clear previous API errors

    const validationErrors = validateRegistrationForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop if there are validation errors
    }

    setIsSubmitting(true);
    try {
      const response = await registerUser(formData);
      // Assuming API returns some user data on success
      console.log('API Response:', response);
      if (onSuccess) {
        onSuccess(response.data); // Pass successful data to parent
      }
      // Optionally reset form: setFormData(...)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle API errors (e.g., username already taken, invalid email format from server)
      setRegistrationError(error.response?.data?.message || 'Error al registrarte. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    registrationError,
  };
};

export default useRegistration;