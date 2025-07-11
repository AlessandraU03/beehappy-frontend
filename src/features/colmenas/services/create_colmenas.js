export const createColmena = async (nuevaColmena) => {
  const token = sessionStorage.getItem('token'); // Asegúrate que esté guardado correctamente
  const url = 'http://localhost:8080/api/v1/colmena/';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(nuevaColmena)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear la colmena');
  }

  return await response.json();
};
