export const authApi = {
  login: async (credentials) => {
    const response = await fetch('http://44.196.168.136:8081/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: credentials.usuario,
        contrasena: credentials.contrasena,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return data;
  },

  verify2FA: async ({ code, email }) => {
    const response = await fetch('http://44.196.168.136:8081/api/v1/users/login/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en verificación 2FA');
    }

    const data = await response.json();
    return data; // Esto debería incluir el token e id si es exitoso
  },

  logout: () => {
    sessionStorage.removeItem('token');
  },

  getCurrentUsuario: () => {
    return sessionStorage.getItem('usuario');
  },
};
