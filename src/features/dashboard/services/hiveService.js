import { getHives } from "../../colmenas/services/get_colmenas";
export const getHivesSummary = async () => {
  const hives = await getHives();
  const summary = {
    registered: hives.length,
    active: hives.filter(hive => hive.estado === 'activo').length,
    pending: hives.filter(hive => hive.estado === 'pending').length,
    completed: hives.filter(hive => hive.estado === 'completed').length,
  };
  return summary;
  
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
