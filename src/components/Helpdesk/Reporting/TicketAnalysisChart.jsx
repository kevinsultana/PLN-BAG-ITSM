"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  OPEN: "#82ca9d",
  "IN PROGRESS": "#ffc658",
  "ON HOLD": "#ff7300",
  RESOLVED: "#ff8042",
  CLOSED: "#d0d0d0",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-sm">
        <p className="font-bold">{data.name}</p>
        <p>Total: {data.value}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex justify-center flex-wrap gap-x-4 mt-4 text-xs">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export default function TicketAnalysisChart({ title, data }) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              label={({ name, value }) => value}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
      </div>
      <CustomLegend
        payload={Object.keys(COLORS).map((key) => ({
          value: key,
          color: COLORS[key],
        }))}
      />
    </div>
  );
}
