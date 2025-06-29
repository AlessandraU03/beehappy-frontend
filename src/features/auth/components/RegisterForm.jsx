// src/features/auth/components/RegistrationForm.jsx
import React from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import useRegistration from '../hooks/useRegistration';

function RegistrationForm ({ onRegistrationSuccess }) {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    registrationError,
  } = useRegistration(onRegistrationSuccess);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <Input
        label="Nombre(s):"
        placeholder="Ingresa tu nombre"
        name="nombres"
        value={formData.nombres}
        onChange={handleChange}
        error={errors.nombres}
      />
      {errors.nombres && <p className="text-[#FF6347] text-sm -mt-3">{errors.nombres}</p>}

      <Input
        label="Apellidos:"
        placeholder="Ingresa tus apellidos"
        name="apellidos"
        value={formData.apellidos}
        onChange={handleChange}
        error={errors.apellidos}
      />
      {errors.apellidos && <p className="text-[#FF6347] text-sm -mt-3">{errors.apellidos}</p>}

      <Input
        label="Usuario:"
        placeholder="Máximo 20 caracteres"
        name="usuario"
        value={formData.usuario}
        onChange={handleChange}
        error={errors.usuario}
      />
      {errors.usario && <p className="text-[#FF6347] text-sm -mt-3">{errors.username}</p>}

      <Input
        label="Correo electrónico:"
        placeholder="Ingresa tu correo electrónico"
        name="correo_electronico"
        type="email"
        value={formData.correo_electronico}
        onChange={handleChange}
        error={errors.correo_electronico}
      />
      {errors.correo_electronico && <p className="text-[#FF6347] text-sm -mt-3">{errors.correo_electronico}</p>}

      <Input
        label="Contraseña:"
        placeholder="Mínimo 8 caracteres"
        name="contrasena"
        type="password"
        value={formData.contrasena}
        onChange={handleChange}
        error={errors.contrasena}
      />
      {errors.contrasena && <p className="text-[#FF6347] text-sm -mt-3">{errors.contrasena}</p>}

      {registrationError && <p className="text-[#FF6347] text-sm text-center">{registrationError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </Button>

      <p className="text-center text-[#B0C4DE] text-sm mt-6">
        ¿Ya tienes una cuenta?{' '}
        
      </p>
    </form>
  );
};

export default RegistrationForm;