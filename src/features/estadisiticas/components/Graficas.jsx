import React from "react";
import DiaChart from "./DiaChart";
import { useSensores } from "../hooks/useSensores";

function Graficas({ activeTab, estadisticas, loading, error }) {
  const { getNombreSensor } = useSensores();

  const tituloMap = {
    dia: "Diarias",
    semana: "Semanales",
    mes: "Mensuales",
    ano: "Anuales",
  };

  const xAxisKeyMap = {
    dia: "fecha_display",
    semana: "fecha_display",
    mes: "fecha_display",
    ano: "fecha_display",
  };

  if (loading)
    return <div className="text-white text-center text-xl mt-8">Cargando estadísticas...</div>;
  if (error)
    return <div className="text-red-400 text-center text-xl mt-8">{error}</div>;
  if (!Object.keys(estadisticas).length)
    return <div className="text-white text-center text-xl mt-8">No hay datos disponibles.</div>;

  return (
    <div className="p-6 bg-blue-800 bg-opacity-70 rounded-lg shadow-xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Estadísticas {tituloMap[activeTab]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(estadisticas).map(([sensorId, datos]) => (
          <DiaChart
            key={sensorId}
            title={`Sensor: ${getNombreSensor(sensorId)}`}
            data={datos}
            strokeColor="#facc15"
            yDomain={calcularYDomain(datos)}
            xAxisDataKey={xAxisKeyMap[activeTab]}
          />
        ))}
      </div>

      <p className="text-sm text-gray-300 text-right mt-4">
        Última actualización: {getUltimaFecha(estadisticas)}
      </p>
    </div>
  );
}

function calcularYDomain(datos) {
  const valoresMin = datos.map((d) => d.valor_minimo);
  const valoresMax = datos.map((d) => d.valor_maximo);
  const min = Math.min(...valoresMin);
  const max = Math.max(...valoresMax);
  return [min * 0.9, max * 1.1];
}

function getUltimaFecha(estadisticas) {
  let ultimaFecha = null;
  Object.values(estadisticas).forEach((arr) => {
    if (arr.length > 0) {
      const fechaMasReciente = arr.reduce((max, d) => {
        const currentFecha = new Date(d.fecha_fin || d.fecha_inicio || d.timestamp);
        return currentFecha > max ? currentFecha : max;
      }, new Date(0));
      if (!ultimaFecha || fechaMasReciente > ultimaFecha) {
        ultimaFecha = fechaMasReciente;
      }
    }
  });
  return ultimaFecha ? ultimaFecha.toLocaleDateString("es-ES") : "N/A";
}

export default Graficas;
