import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/SideBar';
import { Header } from '../components/Header';

const MainLayout = () => {
  const location = useLocation();
  let title = 'COLMENAS'; // ← título por defecto
  let showBackButton = false;

  // Mostrar "INICIO" solo en el dashboard
  if (location.pathname.startsWith('/dashboard')) {
    title = 'INICIO';
  }

  // Mostrar botón atrás y ocultar título en rutas específicas
  if (
    location.pathname.startsWith('/colmenas/') ||
    location.pathname === '/formulario-colmena'
  ) {
    showBackButton = true;
    title = ''; // Ocultar el título cuando hay botón de volver
  }

  return (
    <div className="flex font-poppins min-h-screen">
      <Sidebar />
      <div
        className="flex-1 bg-blue-950"
        style={{ backgroundImage: 'url("/panel-blue.png")', backgroundSize: 'cover' }}
      >
        <Header title={title} showBack={showBackButton} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
