import React from "react";

const ChangePasswordForm = ({
  currentPassword,
  setCurrentPassword,
  code,
  setCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  loadingChange,
  errorChange,
  messageChange,
  stepChange,
  requestCode,
  submitChangePassword,
  onClose,
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 sm:p-8 bg-[#0D3B66] font-poppins text-white rounded-xl shadow-lg space-y-4">
      {/* Encabezado */}
      <div>
        <h2 className="text-4xl font-bold mb-2">Cambio de contraseña</h2>
        <p className="text-white/80 text-2xl">Por favor, crea una nueva contraseña y guárdala.</p>
      </div>

      {/* Mensajes */}
      {messageChange && <p className="text-green-300">{messageChange}</p>}
      {errorChange && <p className="text-red-300">{errorChange}</p>}

      {/* Paso 1: contraseña actual */}
      {stepChange === 1 && (
        <>
          <div>
            <label className="block text-xl font-semibold mb-2">Contraseña actual:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Ingresa tu contraseña actual"
              disabled={loadingChange}
              className="w-full px-4 py-2 text-white rounded-md border border-white/50 focus:outline-none"
            />
            
          </div>
           <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={loadingChange}
              className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-[#0D3B66] font-semibold py-2 rounded-md transition"
            >
              Cancelar
            </button>
          <button
            onClick={requestCode}
            disabled={loadingChange}
            className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-[#0D3B66] font-semibold py-2 rounded-md transition disabled:opacity-50"
          >
            {loadingChange ? "Enviando..." : "Solicitar código"}
          </button>
          </div>
          
        </>
      )}

      {/* Paso 2: código + nueva contraseña */}
      {stepChange === 2 && (
        <>
          <div>
            <label className="block text-sm font-semibold mb-1">Código de verificación:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código recibido"
              disabled={loadingChange}
              className="w-full px-4 py-2 text-white rounded-md border border-white/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contraseña nueva:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              disabled={loadingChange}
              className="w-full px-4 py-2 text-white rounded-md border border-white/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              disabled={loadingChange}
              className="w-full px-4 py-2 text-white rounded-md border border-white/50 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={loadingChange}
              className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-[#0D3B66] font-semibold py-2 rounded-md transition"
            >
              Cancelar
            </button>
            <button
              onClick={submitChangePassword}
              disabled={loadingChange}
              className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-[#0D3B66] font-semibold py-2 rounded-md transition"
            >
              {loadingChange ? "Cambiando..." : "Guardar nueva contraseña"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePasswordForm;
