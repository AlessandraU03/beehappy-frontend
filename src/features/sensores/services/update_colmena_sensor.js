export const updateColmenaSensor = async (id, data) => {
  const token = sessionStorage.getItem('auth_token');
  const url = `http://44.196.168.136:8080/api/v1/colmena-sensores/${id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error actualizando relación colmena-sensor: ${response.statusText}`);
  }

  return await response.json();
};
