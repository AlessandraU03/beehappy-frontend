const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: '12345678',
    email: 'admin@beehappy.com',
    name: 'Administrador BeeHappy'
  },
  {
    id: '2',
    username: 'usuario',
    password: 'password123',
    email: 'usuario@beehappy.com',
    name: 'Usuario Demo'
  }
];

export const authApi = {

  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
   
    const user = mockUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
  
    return {
      token: `mock-token-${Date.now()}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    };
  },

 
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En la API real aquí se invalidaría el token
    console.log('Mock logout - token invalidated');
  }
};