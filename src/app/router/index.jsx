import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import LoginForm from '../../features/authentication/components/LoginForm';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import ValidateCodeVerification from '../../features/auth/pages/ValidateCodeVerification';

import Home from '../../features/dashboard/pages/Home';
import Colmenas from '../../features/colmenas/pages/Colmenas';
import Estadisticas from '../../features/estadisiticas/pages/Estadisticas';
import Monitoreo from '../../features/monitoreo/pages/Monitoreo';
import Alertas from '../../features/alertas/pages/Alertas';

import Graficas from '../../features/estadisiticas/components/Graficas';

import MainLayout from '../../shared/layouts/MainLayout';
import HiveDetailDashboard from '../../features/colmenas/pages/HiveDetailsDashboard';
import FormCreateColmena from '../../features/colmenas/components/FormCreateColmena';
import ResetPasswordSection from '../../features/auth/pages/ResetPasswordSection';
import EstadisticasDashboard from '../../features/estadisiticas/pages/EstadisticasDashboard';
import AlertsDashboard from '../../features/alertas/pages/AlertasDashboard';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
        <Route path="/forgot-contrasena" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ValidateCodeVerification />} />
        <Route path="/set-new-password" element={<ResetPasswordSection />} />

        {/* Rutas protegidas */}
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/colmenas" element={<Colmenas />} />

          {/* Rutas generales */}
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/alertas" element={<Alertas />} />

          {/* Monitoreo - lista */}
          <Route path="/monitoreo" element={<Monitoreo />} />

          {/* Crear colmena */}
          <Route path="formulario-colmena" element={<FormCreateColmena />} />

          {/* Detalle colmena con rutas anidadas */}
          <Route path="/colmenas/:hiveId" element={<HiveDetailDashboard />}>
            <Route index element={null} /> {/* render por defecto o manejar en HiveDetailDashboard */}
            <Route path="general" element={null} /> {/* Vista general */}
            <Route path="estadisticas" element={<EstadisticasDashboard />} />
            <Route path="monitoreo-tiempo-real" element={<Graficas />} />
            <Route path="alertas" element={<AlertsDashboard />} />
          </Route>

          {/* Monitoreo en tiempo real desde /monitoreo */}
          <Route path="/monitoreo/colmena/:hiveId" element={<Graficas />} />
          <Route path="/estadisticas/colmena/:hiveId" element={<EstadisticasDashboard />} />
        </Route>

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
