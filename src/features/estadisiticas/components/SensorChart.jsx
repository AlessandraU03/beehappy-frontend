import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function SensorChart({ title, dataKey, data, strokeColor, yDomain }) {
  return (
    <div className="bg-blue-700 p-4 rounded-lg shadow-md max-w-full w-full">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <div style={{ width: '100%', minWidth: 0 }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" domain={yDomain || ['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={strokeColor} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SensorChart;
