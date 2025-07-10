import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHivesForMonitoring } from '../../monitoreo/services/hiveService';
import HiveCard from './HiveCard';

const ColmenasResumen = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHives = async () => {
      try {
        setLoading(true);
        const fetchedHives = await getHivesForMonitoring();
        setHives(fetchedHives);
        setError(null);
      } catch (err) {
        console.error("Error al obtener las colmenas:", err);
        setError("No se pudieron cargar las colmenas. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchHives();
  }, []);

const handleCardClick = (hiveId) => {
  if (location.pathname.startsWith('/monitoreo')) {
    // Si estamos en monitoreo, ir a monitoreo tiempo real
    navigate(`/monitoreo/colmena/${hiveId}`);
  } else if (location.pathname.startsWith('/estadisticas')) {
    // Si estamos en estadísticas, ir a estadísticas específicas de la colmena
    navigate(`/estadisticas/colmena/${hiveId}`);
  } else {
    // En otro contexto, ir a vista general colmena
    navigate(`/colmenas/${hiveId}/general`);
  }
};


  if (loading) {
    return <div className="text-white text-center text-xl mt-8">Cargando resumen de colmenas...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Resumen de Colmenas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hives.map(hive => (
          <HiveCard key={hive.id} hive={hive} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ColmenasResumen;
