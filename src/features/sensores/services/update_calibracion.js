export const updateCalibracion = async (id, data) => {
  const token = sessionStorage.getItem('auth_token');
  const url = `http://44.196.168.136:8080/api/v1/calibracion/${id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error actualizando calibración: ${response.statusText}`);
  }

  return await response.json();
};
