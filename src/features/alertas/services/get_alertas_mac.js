// services/get_alertas_by_mac.js
import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const getAlertasByMac = async () => {
  const token = sessionStorageService.get('auth_token');
  const mac = sessionStorageService.get('mac_raspberry'); // <-- correctamente recuperado de sessionStorage

  if (!token || !mac) {
    throw new Error('Token o MAC de Raspberry no disponibles');
  }

  try {
    const response = await fetch(`http://44.194.210.138:8081/api/v1/alertas/mac/${encodeURIComponent(mac)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) throw new Error("Error al obtener alertas");

    const data = await response.json();
    return data; // ← Aquí ya retorna el arreglo de alertas del backend
  } catch (error) {
    console.error("Error obteniendo alertas:", error);
    return [];
  }
};
