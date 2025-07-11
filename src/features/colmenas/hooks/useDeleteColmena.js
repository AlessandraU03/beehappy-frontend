import { useState } from 'react';
import { deleteColmenaService } from '../services/delete_colmena';
import { useNavigate } from 'react-router-dom';

export const useDeleteColmena = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteColmena = async (id) => {
    setLoading(true);
    setError(null);

    const result = await deleteColmenaService(id);

    if (result.success) {
      setLoading(false); // <-- Asegura que se desactiva antes de redirigir
      alert('Colmena eliminada exitosamente');
      navigate('/colmenas');
    } else {
      setError(result.error);
      setLoading(false);
      alert(`Error al eliminar: ${result.error}`);
    }
  };

  return { deleteColmena, loading, error };
};
