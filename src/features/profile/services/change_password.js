import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

const BASE_URL = "http://44.196.168.136:8081/api/v1/users";
const token = sessionStorageService.get("auth_token");

export const changePassword = async ({ code, email, new_password }) => {
  const response = await fetch(`${BASE_URL}/profile/password/change`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ code, email, new_password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al cambiar la contraseña");
  }
  return await response.json();
};
