import React, { useEffect, useState } from 'react';
import { getEstadisticasPorTipo } from '../services/get_estadisticas_tipo';
import SensorChart from './SensorChart';

function Graficas({activeTab}) {
  const [sensorHistory, setSensorHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        const data = await getEstadisticasPorTipo(activeTab); // 👈 usar la prop
        const transformed = agruparEstadisticasPorFecha(data);
        setSensorHistory(transformed);
        setError(null);
      } catch (error) {
        console.error("❌ Error al obtener estadísticas:", error.message);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, [activeTab]); 

  if (loading) return <div className="text-white text-center text-xl mt-8">Cargando estadísticas...</div>;
  if (error) return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  if (!sensorHistory.length) return <div className="text-white text-center text-xl mt-8">No hay datos disponibles.</div>;

  return (
    <div className="p-6 bg-blue-800 bg-opacity-70 rounded-lg shadow-xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Estadísticas Diarias</h2>

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

function agruparEstadisticasPorFecha(stats) {
  const agrupado = {};

  stats.forEach(({ fecha, id_sensor, valor_promedio }) => {
    const dateKey = new Date(fecha).toLocaleDateString();

    if (!agrupado[dateKey]) {
      agrupado[dateKey] = { time: dateKey };
    }

    switch (id_sensor) {
  case 8:
    agrupado[dateKey].temperature = valor_promedio;
    break;
  case 9:
    agrupado[dateKey].humidity = valor_promedio;
    break;
  case 10:
    agrupado[dateKey].weight = valor_promedio;
    break;
  case 11:
    agrupado[dateKey].sound = valor_promedio;
    break;
  default:
    console.warn("Sensor desconocido:", id_sensor);
    break;
}

  });

  return Object.values(agrupado).sort((a, b) => new Date(a.time) - new Date(b.time));
}

export default Graficas;
