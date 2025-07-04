// src/features/colmenas/components/SensorCard.jsx
import React from 'react';

function SensorCard({ icon, label, value, unit, iconColor }) {
  return (
    <div className="bg-blue-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <div className={`w-16 h-16 mb-2 ${iconColor}`} dangerouslySetInnerHTML={{ __html: icon }} />
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-5xl font-bold">
        {value != null ? `${value} ${unit}` : '...'}
      </p>
    </div>
  );
}

export default SensorCard;
