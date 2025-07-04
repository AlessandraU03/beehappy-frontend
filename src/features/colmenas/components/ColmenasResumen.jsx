// src/features/colmenas/components/ColmenasResumen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHivesForMonitoring } from '../../monitoreo/services/hiveService';
import HiveCard from './HiveCard';

const ColmenasResumen = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHives = async () => {
      try {
        setLoading(true);
        const fetchedHives = await getHivesForMonitoring();
        setHives(fetchedHives);
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
    // Redirige a la nueva página de detalle de la colmena (pestaña general por defecto)
    navigate(`/colmenas/${hiveId}/general`);
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

        {hives.map((hive) => (
          <HiveCard
            key={hive.id}
            hive={hive} // Pass the entire hive object as a prop
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ColmenasResumen;