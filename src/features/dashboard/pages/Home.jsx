// src/features/dashboard/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HiveSummaryCard from '../components/HiveSummaryCard'; // Asegúrate de la ruta correcta
import AlertList from '../components/AlertList'; // Asegúrate de la ruta correcta
import Button from '../../../shared/components/Button'; // Asegúrate de la ruta correcta
import { FaPlus, FaChartLine, FaTv } from 'react-icons/fa';
import useHiveData from '../hooks/useHiveData'; // Asegúrate de la ruta correcta
import { useAuth } from '../../../app/providers/authProvider'; // Asegúrate de la ruta correcta
// import { Sidebar } from '../../../shared/components/SideBar'; // ELIMINAR ESTO
// import { Header } from '../../../shared/components/Header'; // ELIMINAR ESTO

const Home = () => {
    const { loading, summary, alerts } = useHiveData();
    const navigate = useNavigate();
    const { logout } = useAuth();

    if (loading) return <div className="text-white p-6">Cargando...</div>;

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        // ELIMINAR <div className="flex font-poppins"> y la etiqueta </Sidebar>
        // ELIMINAR <Header title="INICIO" onLogout={handleLogout} />

        // ELIMINA EL PRIMER DIV FLEX QUE CONTIENE EL SIDEBAR
        <div className="flex-1 flex flex-col min-h-screen" >

            {/* El Header y Sidebar ya se renderizan en MainLayout */}
            {/* Si necesitas pasar el logout al Header, hazlo en MainLayout y pásalo como prop al Header */}
            {/* Ejemplo: <Header title="INICIO" onLogout={logout} /> */}

            <main className="flex-1 py-6 text-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <HiveSummaryCard number={summary.registered} label="Colmenas registradas" />
                    <HiveSummaryCard number={summary.active} label="Colmenas activas" />
                    <HiveSummaryCard number={summary.pending} label="Alertas pendientes" />
                    <HiveSummaryCard number={summary.completed} label="Alertas completadas" />
                </div>

               <div className="grid md:grid-cols-2 gap-4 h-full items-stretch">
  <AlertList alerts={alerts} />

  <div className="flex flex-col gap-4 h-full  "  >
    <Button variant='secondary'  className="h-full flex-1 " onClick={() => navigate('/formulario-colmena')}>
      <div className="flex items-center justify-start gap-2 px-4 font-poppins font-semibold text-3xl ">
        <img src="/add-colmena.png" alt="add-colmena" className="w-14 h-14" />Agregar colmena
      </div>
    </Button>
    <Button variant='secondary' className="h-full flex-1" onClick={() => navigate('/estadisticas')}>
      <div className="flex items-center justify-start gap-2 px-4 font-poppins font-semibold text-3xl">
        <img src="/view-stics.png" alt="view" className="w-14 h-14 " /> Ver estadísticas
      </div>
    </Button>
    <Button variant='secondary' className="h-full flex-1" onClick={() => navigate('/monitoreo')}>
      <div className="flex items-center justify-start gap-2 px-4 font-poppins font-semibold text-3xl ">
        <img src="/view-mont.png" alt="go" className="w-14 h-14" /> Ir al monitoreo en tiempo real
      </div>
    </Button>
  </div>
</div>

            </main>
        </div>
    );
};

export default Home;