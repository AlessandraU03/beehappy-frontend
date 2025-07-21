export const createColmenaSensor = async (data) => {
  const token = sessionStorage.getItem('auth_token');

  const response = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al asociar sensor');
  }

  const result = await response.json();
  return result;
};
