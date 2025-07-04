import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function SensorChart({ title, dataKey, data, strokeColor, yDomain }) {
  return (
    <div className="bg-blue-700 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
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
  );
}

export default SensorChart;
