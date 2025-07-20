// services/getSummaryData.js
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
