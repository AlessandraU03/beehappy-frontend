import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  FolderIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

const TabsNav = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hiveId } = useParams();

  const isAlertasRoute = location.pathname.startsWith('/alertas');
  const isEstadisticasRoute = location.pathname.startsWith('/estadisticas');

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (isAlertasRoute) {
      navigate(`/alertas/${hiveId}/${tab}`);
    } else if (isEstadisticasRoute) {
      navigate(`/estadisticas/${hiveId}/${tab}`);
    } else {
      navigate(`/colmenas/${hiveId}/${tab}`);
    }
  };

  // Tabs por defecto (colmenas)
  const defaultTabs = [
    {
      key: 'general',
      label: 'General',
      icon: <FolderIcon className="w-5 h-5" />,
    },
    {
      key: 'monitoreo-tiempo-real',
      label: 'Monitoreo en tiempo real',
      icon: <ComputerDesktopIcon className="w-5 h-5" />,
    },
    {
      key: 'estadisticas',
      label: 'Estadísticas',
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      key: 'alertas',
      label: 'Alertas',
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
    },
  ];

  // Tabs para /alertas
  const alertasTabs = [
    {
      key: 'pendientes',
      label: 'Pendientes',
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
    },
    {
      key: 'resueltas',
      label: 'Resueltas',
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
    },
  ];

  // Tabs para /estadisticas
  const estadisticasTabs = [
    {
      key: 'dia',
      label: 'Por día',
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      key: 'semana',
      label: 'Por semana',
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      key: 'mes',
      label: 'Por mes',
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      key: 'anio',
      label: 'Por año',
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
  ];

  const tabs = isAlertasRoute
    ? alertasTabs
    : isEstadisticasRoute
    ? estadisticasTabs
    : defaultTabs;

  return (
    <div className="flex justify-start gap-2 px-4 py-2 mb-8 bg-[#B6B6B6] border rounded-xl">
      {tabs.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200
            ${
              activeTab === key
                ? 'bg-[#194569] text-white border-[#194569]'
                : 'text-black border-gray-300 hover:border-blue-600 hover:text-blue-800'
            }`}
          onClick={() => handleTabClick(key)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabsNav;
