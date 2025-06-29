
export const authApi = {
  login: async (credentials) => {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: credentials.usuario,
        contrasena: credentials.contrasena,
      }),
      // You can log credentials here if needed
    });


    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();

    
    return data;
  },

  logout: async () => {
    // Implementación futura si decides invalidar el token en backend
    console.log('Logout solicitado - sin efecto en backend por ahora');
  }
};
