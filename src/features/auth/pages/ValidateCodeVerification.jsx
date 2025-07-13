import React from 'react';
import { useNavigate } from 'react-router-dom';

import EmailInput from '../components/EmailInput';
import CodeInput from '../components/CodeInput';
import CountdownTimer from '../components/CountdownTimer';
import usePasswordResetForm from '../hooks/usePasswordResetForm';
import validateEmail from '../utils/validateEmail';
import Button from '../../../shared/components/Button';

export default function ValidateCodeVerification() {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    code,
    setCode,
    showCodeInput,
    showPasswordInput,
    message,
    countdown,
    attempts,
    canTry,
    handleSendCode,
    handleVerifyCode,
    handleResendCode,
    codeExpired
  } = usePasswordResetForm(navigate);

  return (
    <div
      className="relative min-h-screen bg-[#FFD400] flex flex-col items-center justify-center p-4 pb-6 overflow-auto"
      style={{ backgroundImage: 'url("/panel.png")' }}
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

        /* Responsividad para elementos con estilos inline */
        @media (max-width: 768px) {
          .responsive-padding {
            padding: 2rem 1.5rem !important;
          }
          .responsive-margin-top {
            margin-top: 1.5rem !important;
          }
          .responsive-width {
            width: 95% !important;
          }
          .responsive-position-top {
            top: 2rem !important;
            left: 1rem !important;
            font-size: 3rem !important;
          }
          .responsive-img-right {
            top: 1rem !important;
            left: 1rem !important;
            width: 4rem !important;
            height: 8rem !important;
          }
          .responsive-img-left {
            bottom: 1rem !important;
            right: 1rem !important;
            width: 5rem !important;
            height: 7rem !important;
          }
        }
      `}</style>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
        style={{ backgroundImage: 'url("/panel.png")' }}
      ></div>

      <img
        src="/bee-right.png"
        alt="Abeja"
        className="absolute top-8 left-8 w-24 h-48 transform rotate-[-30deg] animate-fly-around z-10 responsive-img-right"
      />

      <img
        src="/bee-left.png"
        alt="Abeja"
        className="absolute bottom-8 right-8 w-28 h-40 transform rotate-[20deg] animate-fly-around-reverse z-10 responsive-img-left"
      />

      <button
        onClick={() => window.history.back()}
        className="absolute top-14 left-16 text-gray-600 text-5xl hover:text-gray-800 transition-colors z-50 responsive-position-top"
        aria-label="Volver"
      >
        ←
      </button>

      <div
        className="relative p-16 px-24 mt-12 w-11/12 flex flex-col z-20 responsive-padding responsive-margin-top responsive-width"
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
