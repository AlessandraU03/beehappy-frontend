import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const deleteColmenaSensor = async (idRelacion) => {
  const token = sessionStorageService.get('auth_token');

  const res = await fetch(`http://44.196.168.136:8080/api/v1/colmena-sensores/${idRelacion}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ Error al eliminar relación:', errorText);
    throw new Error('Error al eliminar la relación colmena-sensor');
  }

  return true;
};
