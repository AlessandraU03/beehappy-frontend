// src/features/auth/pages/RegisterPage.jsx
import React from 'react';
import AuthLayout from '../../../shared/layouts/AuthLayout';
import RegistrationForm from '../components/RegisterForm';

const RegisterPage = () => {
  const handleRegistrationSuccess = (userData) => {
    console.log('Registration successful:', userData);
    // TODO: Navigate to dashboard or show success message
    // e.g., history.push('/dashboard'); or display a toast notification
  };

  return (
    <AuthLayout>
      <div className="bg-[#1A2B4C] rounded-lg p-10 shadow-lg w-full max-w-md text-white">
        <div className="text-center mb-5">
          <img
            src="/assets/bee-happy-logo.png" // Adjust path
            alt="BeeHappy Logo"
            className="w-40 mx-auto" // mx-auto for centering
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">¡Únete a la colmena!</h1>
        <p className="text-[#B0C4DE] text-center mb-8">
          Crea tu cuenta para entrar al mundo BeeHappy.
        </p>
        <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;