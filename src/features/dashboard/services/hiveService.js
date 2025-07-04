// Simulación de API (puedes conectar Axios o Fetch aquí)
export const getHivesSummary = async () => {
  return {
    registered: 10,
    active: 8,
  };
};

export const getAlertsSummary = async () => {
  return {
    pending: 3,
    completed: 2,
  };
};

export const getLatestAlerts = async () => {
  return [
    { date: '24/06/2025', time: '14:30', hive: 'Colmena 5', message: 'Temperatura alta' },
    { date: '24/06/2025', time: '13:00', hive: 'Colmena 3', message: 'Humedad baja' },
    { date: '24/06/2025', time: '11:36', hive: 'Colmena 8', message: 'Peso bajo' }
  ];
};
