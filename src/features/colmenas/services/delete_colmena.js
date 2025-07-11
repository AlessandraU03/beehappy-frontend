export const deleteColmenaService = async (id) => {
    const token = sessionStorage.getItem('token'); // Asegúrate de que esté guardado
  const url = 'http://localhost:8080/api/v1/colmena'
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
      'Authorization': `Bearer ${token}`
    }
    });

    if (response.status === 204) {
      return { success: true };
    }

    const error = await response.json();
    return { success: false, error: error?.error || 'Error desconocido' };
  } catch (err) {
    return { success: false, error: err.message || 'Error al conectar con el servidor' };
  }
};
