export const createCalibracion = async (calibrationData) => {
  const token = sessionStorage.getItem('auth_token'); // Ajusta el almacenamiento si usas otro método

  const response = await fetch('http://44.196.168.136:8080/api/v1/calibracion/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(calibrationData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al guardar calibración');
  }

  return response.json();
};
