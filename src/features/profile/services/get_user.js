// services/get_user.js
import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const getUserProfile = async (id) => {
  const token = sessionStorageService.get("auth_token");

  const url = `http://44.196.168.136:8081/api/v1/users/profile/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el perfil del usuario");
  }

  return await response.json();
};
