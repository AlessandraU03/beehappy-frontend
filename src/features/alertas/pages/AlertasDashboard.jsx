import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertaCard from '../components/AlertaCard';
import { getAlertasByMac } from '../services/get_alertas_mac';
import { getColmenaById } from '../../colmenas/services/get_colmena_byID';

export default function AlertsDashboard() {
  const { hiveId } = useParams();
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colmena, setColmena] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = (index) => {
    const newAlertas = [...alertas];
    newAlertas[index].checked = !newAlertas[index].checked;
    setAlertas(newAlertas);
  };

  const obtenerValorCorrecto = (sensor) => {
    switch (sensor) {
      case 'temperatura':
        return '33°C';
      case 'humedad':
        return '60%';
      case 'piezoelectrico':
        return '0.3 a 0.6';
      default:
        return '—';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const colmenaData = await getColmenaById(hiveId);
        setColmena(colmenaData);

        const alertasData = await getAlertasByMac();

        const transformadas = alertasData.map((alerta) => ({
          numeroColmena: colmenaData?.identificador || hiveId,
          variable: alerta.nombre_sensor,
          valorActual: alerta.valor_actual,
          valorCorrecto: obtenerValorCorrecto(alerta.nombre_sensor),
          fechaHora: alerta.fecha_generacion,
          mensaje: alerta.mensaje,
          checked: false,
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Alertas para Colmena {colmena?.identificador || hiveId}
      </h2>

      {loading ? (
        <p className="text-white">Cargando alertas...</p>
      ) : error ? (
        <p className="text-red-500">❌ {error}</p>
      ) : alertas.length === 0 ? (
        <p className="text-white">No hay alertas activas.</p>
      ) : (
        <div className="space-y-4">
          {alertas.map((alerta, index) => (
            <AlertaCard
              key={index}
              {...alerta}
              onCheckedChange={() => handleCheck(index)}
              variant="compact"
            />
          ))}
        </div>
      )}
    </div>
  );
}
