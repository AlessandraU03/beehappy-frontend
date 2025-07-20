export const getCalibracionesByColmena = async (idColmena) => {
  const token = sessionStorage.getItem('token'); // Asegúrate de manejarlo bien
  const res = await fetch(`http://44.196.168.136:8080/api/v1/calibracion/colmena/${idColmena}`, {
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
