import { useEffect, useState } from 'react';
import {
  getHivesSummary,
  getAlertsSummary,
  getLatestAlerts
} from '../services/HiveService';

const useHiveData = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    registered: 0,
    active: 0,
    pending: 0,
    completed: 0,
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const hives = await getHivesSummary();
      const alertsSummary = await getAlertsSummary();
      const latestAlerts = await getLatestAlerts();

      setSummary({
        ...hives,
        ...alertsSummary,
      });
      setAlerts(latestAlerts);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { loading, summary, alerts };
};

export default useHiveData;
