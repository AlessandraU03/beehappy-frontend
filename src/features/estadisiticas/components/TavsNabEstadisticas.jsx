// src/features/estadisticas/components/TabsNavEstadisticas.jsx
import React from 'react';

const tabs = [
  { key: 'dia', label: 'Día' },
  { key: 'semana', label: 'Semana' },
  { key: 'mes', label: 'Mes' },
  { key: 'ano', label: 'Año' },
];

export default function TabsNavEstadisticas({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`py-2 px-4 rounded-full text-sm font-medium transition-all
            ${
              activeTab === tab.key
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
