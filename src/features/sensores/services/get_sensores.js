import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const getSensores = async () => {
      const token = sessionStorageService.get('auth_token');
  try {
    const response = await fetch('http://44.196.168.136:8080/api/v1/tipos-sensores/', {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`, // <- Asegúrate de obtener el token de tu contexto, localStorage o hook.
      },
    });

    if (!response.ok) throw new Error('Error al obtener sensores');

    const data = await response.json();
    console.log('Sensores obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error en getSensores:', error);
    return [];
  }
};
