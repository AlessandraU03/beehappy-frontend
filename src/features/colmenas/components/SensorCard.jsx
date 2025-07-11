import React from 'react';

function SensorCard({ icon, label, value, unit, iconColor }) {
  // Estilo especial SOLO para el sensor de Peso
  if (label === 'Peso') {
    return (
      <div className="bg-[#B6B6B6] text-[#0B1D31] rounded-xl p-4 shadow-lg flex items-center justify-between w-full min-h-[100px]">
        <div className="flex items-center gap-4">
          <div className={`${iconColor} w-14 h-14`}>
            {icon}
          </div>
          <p className="text-4xl font-semibold">{label}</p>
        </div>
        <div>
          <h1 className="text-7xl font-semibold text-[#0B3B55]">
            {value != null ? `${value} ${unit}` : '...'}
          </h1>
        </div>
      </div>
    );
  }

  // Diseño normal para el resto de sensores
  return (
    <div className="bg-[#B6B6B6] text-[#0B1D31] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center w-full">
      <div className={`mb-2 ${iconColor}`}>
        {icon}
      </div>
      <p className="text-4xl font-medium mb-1">{label}</p>
      <hr className="border-t border-gray-300 w-2/3 my-2" />
      <h1 className="text-7xl font-semibold">
        {value != null ? `${value} ${unit}` : '...'}
      </h1>
    </div>
  );
}

export default SensorCard;
