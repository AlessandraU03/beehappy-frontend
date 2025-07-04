// src/features/monitoreo/pages/Monitoreo.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HiveCard from '../../colmenas/components/HiveCard';
import { getHivesForMonitoring } from '../services/hiveService';

function Monitoreo() {
  const [hives, setHives] = useState([]); // Estado para almacenar las colmenas
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para la navegación programática

  useEffect(() => {
    const fetchHives = async () => {
      try {
        setLoading(true); // Inicia la carga
        const fetchedHives = await getHivesForMonitoring();
        setHives(fetchedHives);
      } catch (err) {
        console.error("Error al obtener las colmenas:", err);
        setError("No se pudieron cargar las colmenas. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchHives();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar

  // Función que se ejecuta cuando se hace clic en una tarjeta de colmena
  const handleCardClick = (hiveId) => {
    // Navegamos a la ruta de monitoreo detallada para esa colmena específica
    navigate(`/monitoreo/${hiveId}`);
  };

  if (loading) {
    return <div className="text-white text-center text-xl mt-8">Cargando colmenas...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Selecciona una Colmena para Monitorear</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hives.map((hive) => (
          <HiveCard
            key={hive.id}
            hive={hive}
            onClick={handleCardClick} // Pasamos la función de clic directamente
          />
        ))}
      </div>
    </div>
  );
}

export default Monitoreo;
