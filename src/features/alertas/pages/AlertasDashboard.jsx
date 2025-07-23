import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertaCard from '../components/AlertaCard';
import { getAlertasByMac } from '../services/get_alertas_mac';
import { getColmenaById } from '../../colmenas/services/get_colmena_byID';
import TabsAlertas from '../components/TabsAlertas';
import { updateAlertaEstado } from '../services/update_alertas';
import { useLocation } from 'react-router-dom';


export default function AlertsDashboard() {
  const { hiveId } = useParams();
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colmena, setColmena] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
const variant = location.pathname.includes('/colmenas') ? 'compact' : 'default';


  const [activeTab, setActiveTab] = useState('pendientes');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const colmenaData = await getColmenaById(hiveId);
        setColmena(colmenaData);

        const alertasData = await getAlertasByMac();

        // Transformamos para agregar numeroColmena y checked
        const transformadas = alertasData.map((alerta) => ({
          ...alerta,
          numeroColmena: colmenaData?.identificador || hiveId,
          checked: alerta.estado !== 'activa',
        }));

        setAlertas(transformadas);
      } catch (err) {
        console.error('❌ Error al cargar datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hiveId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheck = async (id) => {
    const alerta = alertas.find((a) => a.id === id);
    if (!alerta) return;

    const nuevoEstado = alerta.estado === 'activa' ? 'resuelta' : 'activa';

    try {
      await updateAlertaEstado(id, nuevoEstado);

      const nuevasAlertas = alertas.map((a) =>
        a.id === id ? { ...a, estado: nuevoEstado, checked: nuevoEstado !== 'activa' } : a
      );

      setAlertas(nuevasAlertas);
    } catch (error) {
      alert('No se pudo actualizar el estado de la alerta: ' + error.message);
    }
  };

  const alertasFiltradas = alertas.filter((alerta) =>
    activeTab === 'pendientes' ? alerta.estado === 'activa' : alerta.estado !== 'activa'
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Alertas para Colmena {colmena?.identificador || hiveId}
      </h2>

      <TabsAlertas activeTab={activeTab} setActiveTab={handleTabChange} />

      {loading ? (
        <p className="text-white">Cargando alertas...</p>
      ) : error ? (
        <p className="text-red-500">❌ {'No hay Alertas '}</p>
      ) : alertasFiltradas.length === 0 ? (
        <p className="text-white">
          No hay alertas {activeTab === 'pendientes' ? 'activas' : 'resueltas'}.
        </p>
      ) : (
        <div className="space-y-4 px-4">
          {alertasFiltradas.map((alerta) => (
            <AlertaCard
              key={alerta.id}
              numeroColmena={alerta.numeroColmena}
              nombre_sensor={alerta.nombre_sensor}
              valor_actual={alerta.valor_actual}
              mensaje={alerta.mensaje}
              prioridad={alerta.prioridad}
              fecha_generacion={alerta.fecha_generacion}
              estado={alerta.estado}
              checked={alerta.checked}
              onCheckedChange={() => handleCheck(alerta.id)}
               variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
}
