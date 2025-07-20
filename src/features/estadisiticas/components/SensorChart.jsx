import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

function SensorChart({ title, dataKey, data, strokeColor, yDomain }) {
  return (
    <div className="bg-blue-700 p-4 rounded-lg shadow-md max-w-full w-full">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

          {/* EJE X = HORA (solo label grande) */}
          <XAxis
            dataKey="hora"
            stroke="#fff"
            tickFormatter={(tick) => tick.slice(0, 5)}
          >
            <Label
              value="Hora"
              position="insideBottom"
              offset={-5}
              fill="#fff"
              style={{ fontSize: 18, fontWeight: 'bold' }}
            />
          </XAxis>

          {/* EJE Y = SENSOR (solo label grande) */}
          <YAxis
  stroke="#fff"
  domain={yDomain || ['auto', 'auto']}
>
  <Label
    value={title}
    angle={-90}
    position="insideLeft"
    dx={-30} // 🔥 mueve el texto hacia la izquierda
    fill="#fff"
    style={{ fontSize: 18, fontWeight: 'bold' }}
  />
</YAxis>

          <Tooltip
            labelStyle={{ color: '#000' }}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={strokeColor} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SensorChart;
