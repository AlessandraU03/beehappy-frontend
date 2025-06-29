import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import LoginForm from '../../features/authentication/components/LoginForm';
import RegisterPage from '../../features/auth/pages/RegisterPage';

// componentes “simulados” para las otras \
const ForgotPasswordPage = () => <h2 className="p-8 text-center">🔧 Recuperar Contraseña (simulada)</h2>;
const DashboardPage = () => <h2 className="p-8 text-center">✅ Dashboard (simulado)</h2>;

export default function AppRouter() {

  const {isAuthenticated} = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <LoginForm />
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <DashboardPage />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <RegisterPage />
          }
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <ForgotPasswordPage />
          }
        />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
