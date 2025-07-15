// src/modules/colmenas/hooks/useTiposSensores.js

import { useEffect, useState } from 'react';
import { getSensores } from '../services/get_sensores';

export const useTiposSensores = (token) => {
  const [tiposSensores, setTiposSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const data = await getSensores(token);
        setTiposSensores(data);
      } catch (err) {
        console.error('Error al cargar tipos de sensores:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, [token]);

  return { tiposSensores, loading, error };
};
