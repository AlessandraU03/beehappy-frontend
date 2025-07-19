import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getColmenaById } from '../../colmenas/services/get_colmena_byID';
import {
  connectToHiveWS,
  subscribeToHiveUpdates,
  disconnectFromHiveWS
} from '../../../shared/services/wsService';
import SensorChart from '../../estadisiticas/components/SensorChart';

function MonitoreoGraf() {
  const { hiveId } = useParams();
  const [sensorHistory, setSensorHistory] = useState([]);
  const [hiveInfo, setHiveInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener info completa de la colmena (incluyendo MAC)
  useEffect(() => {
    const fetchHiveDetails = async () => {
      try {
        setLoading(true);
        const hive = await getColmenaById(hiveId);

        if (!hive) {
          setError(`Colmena con ID ${hiveId} no encontrada.`);
          return;
        }

        setHiveInfo(hive);
        setError(null);
      } catch (err) {
        console.error("Error al cargar detalles de la colmena:", err);
        setError("Ocurrió un error al cargar los detalles de la colmena.");
      } finally {
        setLoading(false);
      }
    };

    fetchHiveDetails();
  }, [hiveId]);

  // Conectar WebSocket usando la MAC una vez que hiveInfo esté cargada
  useEffect(() => {
    if (!hiveInfo?.mac_raspberry) return;

    connectToHiveWS(hiveInfo.mac_raspberry);

    const unsubscribe = subscribeToHiveUpdates(data => {
      setSensorHistory(prev => {
        const timestamp = new Date();
        const newData = {
          time: timestamp.toLocaleTimeString(),
          temperature: data.temperatura || data.temperature,
          humidity: data.humedad || data.humidity,
          weight: data.peso || data.weight,
          sound: data.frecuencia || data.frecuencia,
        };
        // Mantener sólo los últimos 20 registros
        return [...prev, newData].slice(-20);
      });
    });

    return () => {
      disconnectFromHiveWS();
      unsubscribe?.();
    };
  }, [hiveInfo?.mac_raspberry]);

  // Renderizado según estados
  if (loading) return <div className="text-white text-center text-xl mt-8">Cargando datos de la colmena...</div>;
  if (error) return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  if (!sensorHistory.length || !hiveInfo) return <div className="text-white text-center text-xl mt-8">No hay datos disponibles para esta colmena.</div>;

  return (
    <div className="p-6 bg-blue-800 bg-opacity-70 rounded-lg shadow-xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Monitoreo Detallado: {hiveInfo.nombre || `Colmena ${hiveInfo.id}`} ({hiveInfo.area_ubicacion} - {hiveInfo.tipo_colmena})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SensorChart
          title="Temperatura (°C)"
          dataKey="temperature"
          data={sensorHistory}
          strokeColor="#facc15"
        />
        <SensorChart
          title="Humedad (%)"
          dataKey="humidity"
          data={sensorHistory}
          strokeColor="#60a5fa"
          yDomain={[0, 100]}
        />
        <SensorChart
          title="Peso (kg)"
          dataKey="weight"
          data={sensorHistory}
          strokeColor="#34d399"
        />
        <SensorChart
          title="Sonido (dB)"
          dataKey="sound"
          data={sensorHistory}
          strokeColor="#a78bfa"
        />
      </div>

      <p className="text-sm text-gray-300 text-right mt-4">
        Última actualización: {sensorHistory[sensorHistory.length - 1]?.time}
      </p>
    </div>
  );
}

export default MonitoreoGraf;
