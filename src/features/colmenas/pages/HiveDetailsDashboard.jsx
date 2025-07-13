import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getColmenaById } from '../services/get_colmena_byID';
import { useDeleteColmena } from '../hooks/useDeleteColmena';
import SensorCard from '../components/SensorCard';
import FormCreateColmena from '../components/FormCreateColmena';
import {
  connectToHiveWS,
  subscribeToHiveUpdates,
  disconnectFromHiveWS
} from '../../../shared/services/wsService';
import TabsNav from '../../../shared/components/TabsNav';

function HiveDetailDashboard() {
  const { hiveId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hiveInfo, setHiveInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorData, setSensorData] = useState({});
  const { deleteColmena, loading: deleting } = useDeleteColmena();
  const [showEditForm, setShowEditForm] = useState(false);

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

  const fetchHiveInfo = async () => {
    try {
      setLoading(true);
      const hive = await getColmenaById(hiveId);

      setHiveInfo({
        id: hive.id,
        nombre: hive.nombre,
        area_ubicacion: hive.area_ubicacion,
        tipo_colmena: hive.tipo_colmena,
        estado: hive.estado,
        fecha_registro: hive.fecha_registro,
        fecha_actualizacion: hive.fecha_actualizacion,
        identificador: hive.identificador,
        sensores: hive.sensores || {
          temperatura: false,
          humedad: false,
          sonido: false,
          peso: false,
        }
      });

      if (location.pathname === `/colmenas/${hiveId}`) {
        navigate(`/colmenas/${hiveId}/general`, { replace: true });
      }

    } catch (err) {
      console.error("Error al obtener la colmena:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <div className='p-4 sm:p-8'>
      <TabsNav activeTab={activeTab} setActiveTab={handleTabClick} />

      <div className="p-4 sm:p-6 bg-[#0C3F72] rounded-lg shadow-xl text-white max-w-6xl mx-auto">
        {/* Encabezado con título, botones y peso */}
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-6">
          {/* Título */}
          <div className="flex-1">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F7B440]">Colmena {hiveInfo.identificador}</h2>
            <p className="text-2xl sm:text-3xl mt-2 text-[#F7B440]">
              Área <span className="font-semibold">{hiveInfo.area_ubicacion}</span>
            </p>
            <p className="text-2xl sm:text-3xl text-[#F7B440]">
              Tipo: <span className="font-semibold">{hiveInfo.tipo_colmena}</span>
            </p>
          </div>

          {/* Botones + Peso */}
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                onClick={() => navigate(`/colmenas/${hiveId}/editar`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-semibold py-2 px-4 rounded-md flex items-center shadow"
              >
                <img src="/edit-05.png" alt="Editar" className="w-5 h-5 mr-2" />
                Editar colmena
              </button>

              <button
                onClick={() => {
                  const confirmDelete = window.confirm('¿Estás seguro de eliminar esta colmena? Esta acción no se puede deshacer.');
                  if (confirmDelete) deleteColmena(hiveId);
                }}
                disabled={deleting}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-semibold py-2 px-4 rounded-md flex items-center shadow disabled:opacity-50"
              >
                <img src="/trash-01.png" alt="Eliminar" className="w-5 h-5 mr-2" />
                {deleting ? 'Eliminando...' : 'Eliminar colmena'}
              </button>
            </div>

            {activeTab === 'general' && (
              <div className="w-full md:w-[480px]">
                <SensorCard
                  label="Peso"
                  value={sensorData?.peso}
                  unit="kg"
                  iconColor="text-yellow-400"
                  icon={<img src="/peso.png" alt="Peso" className="w-14 h-14" />}
                />
              </div>
            )}
          </div>
        </div>

        {/* Contenido de tabs o formulario */}
        <div className="tab-content mt-8">
          {showEditForm ? (
            <FormCreateColmena
              isEdit={true}
              initialData={hiveInfo}
              onSubmit={() => {
                setShowEditForm(false);
                fetchHiveInfo();
              }}
            />
          ) : (
            activeTab !== 'general' ? (
              <Outlet />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <SensorCard
                  label="Temperatura"
                  value={sensorData?.temperatura}
                  unit="°C"
                  iconColor="text-red-400"
                  icon={<img src="/thermometer-03.png" alt="Temperatura" className="w-14 h-14" />}
                />
                <SensorCard
                  label="Humedad"
                  value={sensorData?.humedad}
                  unit="%"
                  iconColor="text-blue-300"
                  icon={<img src="/droplets-01.png" alt="Humedad" className="w-14 h-14" />}
                />
                <SensorCard
                  label="Sonido"
                  value={sensorData?.sonido}
                  unit="MHz"
                  iconColor="text-green-300"
                  icon={<img src="/volume-max.png" alt="Sonido" className="w-14 h-14" />}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default HiveDetailDashboard;
