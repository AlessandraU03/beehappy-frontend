export const obtenerIdSensorPorNombre = async (nombreSensor) => {
  const token = sessionStorage.getItem('auth_token');

  const response = await fetch(`http://44.196.168.136:8080/api/v1/tipos-sensores/nombre/${nombreSensor}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener el ID del sensor');
  }

  const data = await response.json();
  return data.id;
};
