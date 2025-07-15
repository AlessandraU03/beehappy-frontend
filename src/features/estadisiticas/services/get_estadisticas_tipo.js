import { sessionStorageService } from '../../../infrastructure/storage/sessionStorage';

export const getEstadisticasPorTipo = async (tipo) => {
  const token = sessionStorageService.get('auth_token');
  const mac = sessionStorageService.get('mac_raspberry');

  if (!token || !mac) {
    throw new Error('Token o MAC de Raspberry no disponibles');
  }

  const url = `http://44.194.210.138:8080/api/v1/estadisticas/${tipo}?mac_raspberry=${encodeURIComponent(mac)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al obtener estadísticas de ${tipo}: ${error}`);
  }

  const json = await response.json();

  if (!Array.isArray(json.data)) {
    console.warn(`⚠️ 'data' vino como null para tipo ${tipo}. Retornando []`);
    return [];
  }

  return json.data;
};
