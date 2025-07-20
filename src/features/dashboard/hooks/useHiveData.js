import { useEffect, useState } from 'react';
import { getHivesSummary } from '../services/hiveService';
import { getAlertasByUsuario } from '../../alertas/services/get_alertas_by_usuario';

const useHiveData = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    registered: 0,
    active: 0,
    pending: 0,
    completed: 0,
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener resumen de colmenas
        const hiveSummary = await getHivesSummary();

        // Obtener alertas del usuario
        const alertas = await getAlertasByUsuario();

        // Contar alertas por estado
        const pendingCount = alertas.filter(a => a.estado === 'pendiente' || a.estado === 'activa').length;
        const completedCount = alertas.filter(a => a.estado === 'completada' || a.estado === 'resuelta').length;

        // Armar últimas 3 alertas ordenadas por fecha de generación descendente
        const ultimas3 = alertas
          .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion))
          .slice(0, 3)
          .map(a => {
            const fecha = new Date(a.fecha_generacion);
            return {
              date: fecha.toLocaleDateString(),
              time: fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              hive: a.mac_raspberry || 'MAC desconocida',
              message: a.mensaje || 'Mensaje no disponible',
            };
          });

        // Actualizar el summary incluyendo alertas
        setSummary({
          ...hiveSummary,
          pending: pendingCount,
          completed: completedCount,
        });

        setAlerts(ultimas3);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, summary, alerts };
};

export default useHiveData;
