// src/app/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider'; // Asegúrate de que la ruta sea correcta
import LoginForm from '../../features/authentication/components/LoginForm'; // Asegúrate de que la ruta sea correcta
import RegisterPage from '../../features/auth/pages/RegisterPage'; // Asegúrate de que la ruta sea correcta
import PasswordResetView from '../../features/auth/pages/PasswordResetView'; // Asegúrate de que la ruta sea correcta

import Home from '../../features/dashboard/pages/Home'; // Esta es tu vista de inicio
import Colmenas from '../../features/colmenas/pages/Colmenas'; // Esta es tu vista para la lista de colmenas
import Estadisticas from '../../features/estadisiticas/pages/Estadisticas'; // Página general de estadísticas
import Monitoreo from '../../features/monitoreo/pages/Monitoreo'; // Esta será la vista para la lista de monitoreo
import Alertas from '../../features/alertas/pages/Alertas'; // Página general de alertas


import Graficas from '../../features/estadisiticas/components/Graficas'; // Renombrado de HiveMonitoringDetail

import MainLayout from '../../shared/layouts/MainLayout'; // Asegúrate de que la ruta sea correcta
import HiveDetailDashboard from '../../features/colmenas/pages/HiveDetailsDashboard';
import FormCreateColmena from '../../features/colmenas/components/FormCreateColmena';
import ResetPasswordSection from '../../features/auth/pages/ResetPasswordSection';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />
        <Route
          path="/forgot-contrasena"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <PasswordResetView />
          }
        />

          <Route path="/set-new-password" element={<ResetPasswordSection />} />



        {/* Rutas Protegidas por MainLayout */}
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}>
          <Route path="/dashboard" element={<Home />} />

          {/* Ruta para la lista general de colmenas */}
          <Route path="/colmenas" element={<Colmenas />} />

          {/* Rutas generales para Estadísticas y Alertas (si existen páginas generales) */}
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/alertas" element={<Alertas />} />

          {/* Ruta para la lista de colmenas para monitoreo (Monitoreo.jsx) */}
          <Route path="/monitoreo" element={<Monitoreo />} />
<Route path='formulario-colmena' element={<FormCreateColmena />} />
          {/* ¡NUEVAS RUTAS para el Dashboard de Detalle de Colmena! */}
          {/* Esta es la ruta padre para todas las vistas específicas de una colmena */}
          <Route path="/colmenas/:hiveId" element={<HiveDetailDashboard />}>
            {/* Ruta por defecto para la pestaña 'General' (cuando la URL es /colmenas/:hiveId) */}
            <Route index element={null} /> {/* HiveDetailDashboard renderiza el contenido general por sí mismo */}
            <Route path="general" element={null} /> {/* Explícitamente para la pestaña 'General' */}

            {/* Rutas anidadas para Monitoreo, Estadísticas y Alertas específicas de la colmena */}
            {/* Graficas (con WebSocket) se renderizará aquí */}
            
            <Route path="monitoreo-tiempo-real" element={<Graficas />} />
            
          </Route>

          {/* La ruta antigua "/monitoreo/:hiveId" se elimina o se redirige,
             ya que la nueva estructura centraliza el detalle bajo /colmenas/:hiveId */}
          {/* <Route path="/monitoreo/:hiveId" element={<Graficas />} /> */}

        </Route>

        {/* Ruta para cualquier otra cosa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
