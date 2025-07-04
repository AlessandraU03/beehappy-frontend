// src/views/PasswordResetView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import EmailInput from '../components/EmailInput';
import CodeInput from '../components/CodeInput';
import PasswordInput from '../components/PasswordInput';
import CountdownTimer from '../components/CountdownTimer';
import usePasswordResetForm from '../hooks/usePasswordResetForm';
import validateEmail from '../utils/validateEmail';
import Button from '../../../shared/components/Button';
import ResetPasswordSection from './ResetPasswordSection';

export default function PasswordResetView() {

  const navigate = useNavigate();

  const {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCodeInput,
    showPasswordInput,
    message,
    countdown,
    attempts,
    canTry,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    codeExpired
  } = usePasswordResetForm(navigate);

  return (
    <div
      className="relative min-h-screen bg-[#FFD400] flex flex-col items-center justify-center p-4 pb-6 overflow-auto"
      style={{ backgroundImage: 'url("/panel.png")'}}
    >
      <style>{`
        @keyframes flyAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, 10px) rotate(5deg); }
          50% { transform: translate(0, 20px) rotate(-5deg); }
          75% { transform: translate(-20px, 10px) rotate(5deg); }
        }
        @keyframes flyAroundReverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-20px, -10px) rotate(-5deg); }
          50% { transform: translate(0, -20px) rotate(5deg); }
          75% { transform: translate(20px, -10px) rotate(-5deg); }
        }
        .animate-fly-around {
          animation: flyAround 10s infinite alternate ease-in-out;
        }
        .animate-fly-around-reverse {
          animation: flyAroundReverse 12s infinite alternate-reverse ease-in-out;
        }
      `}</style>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
        style={{ backgroundImage: 'url("/panel.png")' }}
      ></div>

      <img
        src="/bee-right.png"
        alt="Abeja"
        className="absolute top-8 left-8 w-24 h-48 transform rotate-[-30deg] animate-fly-around z-10"
      />

      <img
        src="/bee-left.png"
        alt="Abeja"
        className="absolute bottom-8 right-8 w-28 h-40 transform rotate-[20deg] animate-fly-around-reverse z-10"
      />

      <button
        onClick={() => window.history.back()}
        className="absolute top-14 left-16 text-gray-600 text-5xl hover:text-gray-800 transition-colors z-50"
      >
        ←
      </button>

      <div
        className="relative p-16 px-24 mt-12
                   w-11/12 flex flex-col z-20"
      >
        <h2 className="text-[#013A55] text-4xl font-poppins font-bold text-start mb-16">
          Ingresa tu correo electrónico:
        </h2>

        <>
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <EmailInput value={email} onChange={setEmail} disabled={showCodeInput} />

            {!showCodeInput && (
              <Button
                onClick={handleSendCode}
                disabled={!email || !validateEmail(email)}
                variant="primary"
              >
                Enviar código de verificación
              </Button>
            )}

            {showCodeInput && (
              <>
                {!showPasswordInput && (
                  <p className="text-xl text-gray-800 mb-8 text-center">
                    Introduce el código de 6 dígitos enviado a tu correo:
                  </p>
                )}

                {!showPasswordInput && (
                  <>
                    <CodeInput value={code} onChange={setCode} />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={code.length !== 6 || !canTry}
                      variant="primary"
                    >
                      Verificar código de verificación
                    </Button>
                    <CountdownTimer
                      seconds={countdown}
                      onResend={handleResendCode}
                    />
                    <p className="text-xl text-center text-gray-800 mt-6">
                      Intentos restantes: {3 - attempts}
                    </p>
                    {codeExpired && (
                      <p className="text-xl text-red-500 text-center mt-6">
                        El código expiró, por favor reenvía uno nuevo.
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {message && (
            <p
              className={`text-xl mt-auto mb-10 text-center ${
                message.includes('Error') ||
                message.includes('inválido') ||
                message.includes('fallida') ||
                message.includes('expiró') ||
                message.includes('superado')
                  ? 'text-red-500'
                  : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
        </>
      </div>
    </div>
  );
}
