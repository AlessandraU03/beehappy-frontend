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

    try {
      await deleteColmenaService(id);
      alert('Colmena eliminada exitosamente');
      navigate('/colmenas');
    } catch (err) {
      const msg = err.message?.toLowerCase();
      if (msg.includes("eliminada correctamente")) {
        alert("Colmena eliminada exitosamente");
        navigate('/colmenas');
      } else {
        setError(err.message);
        alert(`Error al eliminar: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteColmena, loading, error };
};
