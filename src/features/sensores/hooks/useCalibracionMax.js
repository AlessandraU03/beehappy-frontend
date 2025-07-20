import { useEffect, useState } from 'react';
import { getCalibracionesByColmena } from '../services/get_calibracion_sensores';

const useCalibracionMax = (idColmena) => {
  const [maxCalibracion, setMaxCalibracion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idColmena) return;

    const fetchCalibraciones = async () => {
      try {
        setLoading(true);
        const data = await getCalibracionesByColmena(idColmena);

        if (data.calibraciones.length === 0) {
          setMaxCalibracion(null);
        } else {
          const maxVal = Math.max(...data.calibraciones.map(c => c.valor_maximo));
          setMaxCalibracion(maxVal);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar calibraciones');
      } finally {
        setLoading(false);
      }
    };

    fetchCalibraciones();
  }, [idColmena]);

  return { maxCalibracion, loading, error };
};

export default useCalibracionMax;
