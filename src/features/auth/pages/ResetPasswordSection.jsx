import React, { useRef, useEffect } from 'react';
import FormInput from '../components/FormInput';
import Button from '../../../shared/components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import usePasswordResetForm from '../hooks/usePasswordResetForm';

export default function ResetPasswordSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    handleResetPassword
  } = usePasswordResetForm(navigate, email, code);

  const messageRef = useRef(null);

  // Hacer scroll al mensaje si aparece
  useEffect(() => {
    if (message && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [message]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-4 py-6 bg-cover bg-center"
      style={{ backgroundImage: 'url("/panel-blue.png")' }}
    >
      <div className="relative max-w-3xl mx-auto w-full">
        <button
          onClick={() => navigate('/login')}
          className="absolute top-4 left-4 sm:top-14 sm:left-16 text-gray-600 text-4xl sm:text-5xl hover:text-gray-800 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Volver"
        >
          ←
        </button>

        <h2 className="text-[#013A55] text-3xl sm:text-4xl font-poppins font-bold mb-6 mt-14 sm:mt-0 text-left">
          Restablecer contraseña
        </h2>
        <p className="text-lg sm:text-xl text-gray-800 mb-8 text-center sm:text-left px-2 sm:px-0">
          Por favor, crea una nueva contraseña y confírmala
        </p>

        <div className="flex flex-col items-center w-full px-2 sm:px-0">
          <FormInput
            label="Contraseña nueva:"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
            placeholder="Mínimo 8 caracteres"
            showPasswordToggle={true}
          />

          <FormInput
            label="Confirmar contraseña:"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            showPasswordToggle={true}
          />

          <Button
            onClick={handleResetPassword}
            disabled={newPassword.length < 8 || newPassword !== confirmPassword}
            variant="secondary"
            className="mt-8 w-full sm:w-auto"
          >
            Cambiar contraseña
          </Button>

          <Button
            onClick={() => navigate('/login')}
            className="bg-white text-[#1A2B4C] hover:bg-gray-100 border border-gray-300 mt-4 shadow-md w-full sm:w-auto"
          >
            Cancelar
          </Button>
        </div>
      </div>

      {/* Mensaje de éxito o error */}
      {message && (
        <p
          ref={messageRef}
          className={`text-lg sm:text-xl text-center mt-8 px-2 sm:px-0 ${
            message.toLowerCase().match(/error|inválido|fallida|expiró|superado|coinciden/)
              ? 'text-red-500'
              : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
