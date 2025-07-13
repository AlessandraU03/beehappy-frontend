import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/authProvider';

export default function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ usuario, contrasena });
      console.log('Login exitoso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-poppins">
      {/* Sección Izquierda */}
      <div className="flex flex-col w-full md:w-1/2 bg-[#0E103F] text-white px-8 sm:px-12 py-10">
        {/* Logo y Título */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/Logo.png" alt="BeeHappy Logo" className="h-16" />
          <h1 className="text-3xl font-bold">BeeHappy</h1>
        </div>

        {/* Bienvenida */}
        <h2 className="text-3xl font-semibold mb-2">¡Bienvenido!</h2>
        <p className="mb-6">Tu colmena te espera, ingresa tus datos.</p>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm">Usuario</label>
            <input
              type="text"
              maxLength={20}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario registrado"
              className="w-full px-4 py-2 mt-1 rounded bg-white text-black"
              required
            />
            <p className="text-xs mt-1">Máximo 20 caracteres</p>
          </div>
          <div>
            <label className="block text-sm">Contraseña</label>
            <input
              type="password"
              minLength={8}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingresa tu contraseña registrada"
              className="w-full px-4 py-2 mt-1 rounded bg-white text-black"
              required
            />
            <p className="text-xs mt-1">Mínimo 8 caracteres</p>
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-contrasena" className="text-sm underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black py-2 px-4 rounded font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="mt-6 text-sm">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="underline">
            Regístrate
          </Link>
        </p>

        <div className="mt-auto flex items-end">
          <img
            src="/Group 1.png"
            alt="Abeja decorativa"
            className="w-24 animate-float"
          />
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="/login.png"
          alt="Fondo con abejas y hexágonos"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
