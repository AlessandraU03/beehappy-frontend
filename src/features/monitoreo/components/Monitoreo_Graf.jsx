import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHivesForMonitoring } from '../services/hiveService';
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

  // 🔌 WebSocket siempre se conecta al montar
  useEffect(() => {
    connectToHiveWS(hiveId);

    const unsubscribe = subscribeToHiveUpdates(data => {
      console.log("📡 Datos recibidos:", data);
      setSensorHistory(prev => {
        const timestamp = new Date();
        const newData = {
          time: timestamp.toLocaleTimeString(),
          temperature: data.temperature,
          humidity: data.humidity,
          weight: data.weight,
          sound: data.sound,
        };
        const updatedHistory = [...prev, newData].slice(-20); // máximo 20 puntos
        return updatedHistory;
      });
    });

    return () => {
      disconnectFromHiveWS();
      unsubscribe?.(); // si tu wsService devuelve una función de desuscripción
    };
  }, [hiveId]);

  // 🐝 Obtener info de la colmena
  useEffect(() => {
    const fetchHiveDetails = async () => {
      try {
        setLoading(true);
        const allHives = await getHivesForMonitoring();
        const currentHive = allHives.find(h => h.id.toString() === hiveId);

        if (!currentHive) {
          setError(`Colmena con ID ${hiveId} no encontrada.`);
          return;
        }

        setHiveInfo(currentHive);
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

  // ⏳ Estado de carga y errores
  if (loading) return <div className="text-white text-center text-xl mt-8">Cargando datos de la colmena...</div>;
  if (error) return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  if (!sensorHistory.length || !hiveInfo) return <div className="text-white text-center text-xl mt-8">No hay datos disponibles para esta colmena.</div>;

  return (
    <div className="p-6 bg-blue-800 bg-opacity-70 rounded-lg shadow-xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Monitoreo Detallado: {hiveInfo.name || `Colmena ${hiveInfo.id}`} ({hiveInfo.area} - {hiveInfo.type})
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
