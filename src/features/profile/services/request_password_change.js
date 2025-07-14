import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

const BASE_URL = "http://44.196.168.136:8081/api/v1/users";


export const requestPasswordChange = async (currentPassword) => {
  const token = sessionStorageService.get("auth_token");

  const response = await fetch(`${BASE_URL}/profile/password/change/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ current_password: currentPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al solicitar cambio de contraseña");
  }
  return await response.json();
};

