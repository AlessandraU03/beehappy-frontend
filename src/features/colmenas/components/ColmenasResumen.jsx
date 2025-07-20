import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getColmenaByUsuario } from '../services/get_colmena_byUsuario';
import HiveCard from './HiveCard';

const ColmenasResumen = () => {
  const [hives, setHives] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hivesPerPage = 4;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHives = async () => {
      try {
        const fetchedHives = await getColmenaByUsuario();
        setHives(fetchedHives);
      } catch (err) {
        console.error("Error al obtener las colmenas:", err);
      }
    };

    fetchHives();
  }, []);

  const handleCardClick = (hiveId) => {
    if (location.pathname.startsWith('/monitoreo')) {
      navigate(`/monitoreo/colmena/${hiveId}`);
    } else if (location.pathname.startsWith('/estadisticas')) {
      navigate(`/estadisticas/colmena/${hiveId}`);
    } else if (location.pathname.startsWith('/alertas')) {
      navigate(`/alertas/colmena/${hiveId}`);
    } else {
      navigate(`/colmenas/${hiveId}/general`);
    }
  };

  const indexOfLastHive = currentPage * hivesPerPage;
  const indexOfFirstHive = indexOfLastHive - hivesPerPage;
  const currentHives = hives.slice(indexOfFirstHive, indexOfLastHive);
  const totalPages = Math.ceil(hives.length / hivesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="relative px-4 sm:px-6 md:px-8 py-6 min-h-[80vh]">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        {currentHives.map((hive) => (
          <HiveCard key={hive.id} hive={hive} onClick={handleCardClick} />
        ))}
      </div>

      {/* Botones de paginación en esquina inferior derecha */}
      <div className="absolute pt-8 right-8 flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-xl font-bold shadow-md ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          &#60;
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-xl font-bold shadow-md ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default ColmenasResumen;
