import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

function DiaChart({ title, data, strokeColor, yDomain, xAxisDataKey }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const displayLabel = d.fecha_display || "—";

      return (
        <div className="custom-tooltip p-3 bg-gray-800 bg-opacity-90 border border-gray-700 rounded-lg text-white text-sm">
          <p className="label font-bold mb-1">{displayLabel}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.stroke }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-blue-700 p-4 rounded-lg shadow-md max-w-full w-full">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey={xAxisDataKey} stroke="#fff">
            <Label
              value="Fecha"
              position="insideBottom"
              offset={-5}
              fill="#fff"
            />
          </XAxis>
          <YAxis stroke="#fff" domain={yDomain || ["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="valor_minimo"
            stroke="#8884d8"
            name="Mínimo"
          />
          <Line
            type="monotone"
            dataKey="valor_promedio"
            stroke={strokeColor}
            name="Promedio"
          />
          <Line
            type="monotone"
            dataKey="valor_maximo"
            stroke="#82ca9d"
            name="Máximo"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DiaChart;
