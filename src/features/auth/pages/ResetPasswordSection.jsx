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
    <div className="min-h-screen flex flex-col justify-between px-4 py-6" 
      style={{ backgroundImage: 'url("/panel-blue.png")'}}>
      <div>
        <button
          onClick={() => navigate('/login')}
          className="absolute top-14 left-16 text-gray-600 text-5xl hover:text-gray-800 transition-colors"
        >
          ←
        </button>

        <h2 className="text-[#013A55] text-4xl font-poppins font-bold text-left mb-6">
          Restablecer contraseña
        </h2>
        <p className="text-xl text-gray-800 mb-8 text-center px-4">
          Por favor, crea una nueva contraseña y confírmala
        </p>

        <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
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
            className="mt-10"
          >
            Cambiar contraseña
          </Button>

          <Button
            onClick={() => navigate('/login')}
            className="bg-white text-[#1A2B4C] hover:bg-gray-100 border border-gray-300 mt-4 shadow-md"
          >
            Cancelar
          </Button>
        </div>
      </div>

      {/* Mensaje de éxito o error */}
      {message && (
        <p
          ref={messageRef}
          className={`text-xl text-center mt-8 px-4 ${
            message.toLowerCase().includes('error') ||
            message.toLowerCase().includes('inválido') ||
            message.toLowerCase().includes('fallida') ||
            message.toLowerCase().includes('expiró') ||
            message.toLowerCase().includes('superado') ||
            message.toLowerCase().includes('coinciden')
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
