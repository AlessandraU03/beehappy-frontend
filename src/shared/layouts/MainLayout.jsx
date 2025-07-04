import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/SideBar'; // Asegúrate de que la ruta sea correcta
import { Header } from '../components/Header';   // Asegúrate de que la ruta sea correcta

const MainLayout = () => {
  const location = useLocation();
  let title = 'Colmenas'; // Título por defecto
  let showBackButton = false; // ← 🔹 NUEVO

  if (location.pathname.startsWith('/monitoreo')) {
    if (location.pathname === '/monitoreo') {
      title = 'MONITOREO';
    }
  } else if (location.pathname.startsWith('/alertas')) {
    if (location.pathname === '/alertas') {
      title = 'ALERTAS';
    }
  } else if (location.pathname.startsWith('/estadisticas')) {
    if (location.pathname === '/estadisticas') {
      title = 'ESTADÍSTICAS';
    }
  } else if (location.pathname.startsWith('/dashboard')) {
    title = 'INICIO';
 } else if (location.pathname.startsWith('/colmenas/')) {
  const pathSegments = location.pathname.split('/');
  const colmenasIndex = pathSegments.indexOf('colmenas');
  const hiveId = colmenasIndex !== -1 && pathSegments.length > colmenasIndex + 1 ? pathSegments[colmenasIndex + 1] : null;

  if (hiveId) {
    showBackButton = true;
    title = '';
  } else if (location.pathname === '/colmenas') {
    title = 'COLMENAS';
  }
} else if (location.pathname === '/formulario-colmena') {
  showBackButton = true;
  title = ''; // ← esto oculta el título si hay botón
}

  return (
    <div className="flex font-poppins min-h-screen">
      <Sidebar />
      <div
        className="flex-1 bg-blue-950"
        style={{ backgroundImage: 'url("/panel-blue.png")', backgroundSize: 'cover' }}
      >
        <Header title={title} showBack={showBackButton} /> {/* ← 🔹 MODIFICADO */}

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
