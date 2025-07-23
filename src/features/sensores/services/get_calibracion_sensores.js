const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_SENSORES;

export const getCalibracionesByColmena = async (idColmena) => {
  const token = sessionStorage.getItem('token'); // Asegúrate de manejarlo bien
  const res = await fetch(`${API_BASE_URL}/calibracion/colmena/${idColmena}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener calibraciones');
  }

  return res.json();
};
