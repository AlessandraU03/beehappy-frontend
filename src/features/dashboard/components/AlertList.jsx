import React from 'react';

const AlertList = ({ alerts }) => (
  <div className="bg-blue-900 text-white border-2 border-yellow-400 p-4 rounded-lg">
    <h3 className="text-xl mb-4 font-bold">Últimas alertas</h3>
    {alerts.map((alert, idx) => (
      <div key={idx} className="mb-2">
        <span className="text-sm">{alert.date} {alert.time}</span> – 
        <span className="font-semibold ml-2">{alert.hive}</span>: 
        <span className="text-yellow-400 ml-1">{alert.message}</span>
      </div>
    ))}
  </div>
);

export default AlertList;
