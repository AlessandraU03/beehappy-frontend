import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

const token = sessionStorageService.get('auth_token')
export const getColmenaSensores = async () => {
  const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Error al obtener colmena-sensores');
  return res.json();
};
