
export const authApi = {
  login: async (credentials) => {
    const response = await fetch('http://44.196.168.136:8080/api/v1/users/login', {
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

  logout: () => {
    // Aquí eliminas cualquier dato de sesión o token guardado
    sessionStorage.removeItem('token');  // o el nombre que uses
    // Si usas cookies u otro almacenamiento, también debes limpiar ahí
  },

  getCurrentUsuario: () => {
    // Aquí puedes obtener el usuario actual desde el almacenamiento de sesión o cookies
    return sessionStorage.getItem('usuario'); // o el nombre que uses
  },
};
