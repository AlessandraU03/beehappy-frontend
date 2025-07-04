// src/features/colmenas/pages/HiveDetailDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getHivesForMonitoring } from '../../monitoreo/services/hiveService';
import SensorCard from '../components/SensorCard';
import {
  connectToHiveWS,
  subscribeToHiveUpdates,
  disconnectFromHiveWS
} from '../../../shared/services/wsService';

function HiveDetailDashboard() {
  const { hiveId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hiveInfo, setHiveInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorData, setSensorData] = useState({});

  const getActiveTab = () => {
    if (location.pathname.includes('/monitoreo-tiempo-real')) return 'monitoreo-tiempo-real';
    if (location.pathname.includes('/estadisticas')) return 'estadisticas';
    if (location.pathname.includes('/alertas')) return 'alertas';
    return 'general';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  useEffect(() => {
    const fetchHiveInfo = async () => {
      try {
        setLoading(true);
        const allHives = await getHivesForMonitoring();
        const currentHive = allHives.find(h => h.id.toString() === hiveId);
        if (currentHive) {
          setHiveInfo(currentHive);
          if (location.pathname === `/colmenas/${hiveId}`) {
            navigate(`/colmenas/${hiveId}/general`, { replace: true });
          }
        } else {
          setError(`Colmena con ID ${hiveId} no encontrada.`);
        }
      } catch (err) {
        console.error("Error al obtener información de la colmena:", err);
        setError("Ocurrió un error al cargar la información de la colmena.");
      } finally {
        setLoading(false);
      }
    };

    fetchHiveInfo();
  }, [hiveId, navigate, location.pathname]);

  useEffect(() => {
  connectToHiveWS(hiveId);

  subscribeToHiveUpdates((data) => {
    setSensorData(data);
  });

  return () => {
    disconnectFromHiveWS();
  };
}, [hiveId]);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/colmenas/${hiveId}/${tab}`);
  };

  if (loading) return <div className="text-white text-center text-xl mt-8">Cargando detalles de la colmena...</div>;
  if (error) return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  if (!hiveInfo) return <div className="text-white text-center text-xl mt-8">No se encontró información para esta colmena.</div>;

  return (
    <div className="p-6 bg-blue-900 bg-opacity-80 rounded-lg shadow-xl text-white max-w-6xl mx-auto">
      {/* Botón Volver */}
      

      <h2 className="text-4xl font-bold mb-4 text-center">Colmena {hiveInfo.id}</h2>
      <p className="text-xl text-center mb-6">Área: {hiveInfo.area} | Tipo: {hiveInfo.type}</p>

      {/* Navegación por pestañas */}
      <div className="flex justify-center border-b border-gray-700 mb-8">
        {['general', 'monitoreo-tiempo-real', 'estadisticas', 'alertas'].map(tab => (
          <button
            key={tab}
            className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-200 ${
              activeTab === tab ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab !== 'general' ? (
          <Outlet />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SensorCard
              label="Temperatura"
              value={sensorData?.temperatura}
              unit="°C"
              iconColor="text-red-400"
              icon={`<svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 2v12a6 6 0 1012 0V2H6z" /></svg>`}
            />
            <SensorCard
              label="Humedad"
              value={sensorData?.humedad}
              unit="%"
              iconColor="text-blue-300"
              icon={`<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.243 2 6 6.134 6 10c0 3.866 2.686 7 6 7s6-3.134 6-7c0-3.866-3.243-8-6-8z" /></svg>`}
            />

            {/* Puedes descomentar estos cuando el WebSocket los mande */}
            {/* 
            <SensorCard
              label="Peso"
              value={sensorData?.peso}
              unit="Kg"
              iconColor="text-yellow-400"
              icon={`<svg fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>`}
            />
            <SensorCard
              label="Sonido"
              value={sensorData?.sonido}
              unit="dB"
              iconColor="text-purple-400"
              icon={`<svg fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>`}
            />
            */}

            <div className="lg:col-span-3 flex justify-center gap-4 mt-8">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.414 2.828L11 8.001 8.172 5.172l1.414-1.414 2.828 2.828zM10 12l-1 1v2h2l1-1V12z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2l1 1V14a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3h7l-1-1H4z" clipRule="evenodd"/>
                </svg>
                Editar colmena
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"/>
                </svg>
                Eliminar colmena
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HiveDetailDashboard;
