"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Penambahan Fitur", value: 40 },
  { name: "Integrasi Modul", value: 50 },
  { name: "Approval Permintaan", value: 65 },
  { name: "Docking & Maintenance", value: 78 },
  { name: "Report Dashboard", value: 100 },
];

const xAxisTicks = [0, 25, 50, 75, 100];

const tickLabels = {
  0: "Plan CR",
  25: "Approve IT",
  50: "Approve BPO",
  75: "CR Implementation",
  100: "Closed",
};

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const label = tickLabels[payload.value];

  if (!label) {
    return null;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        style={{ fontSize: "12px" }}
      >
        {`${payload.value}%`}
      </text>
      <text
        x={0}
        y={0}
        dy={30}
        textAnchor="middle"
        fill="#666"
        style={{ fontSize: "12px" }}
      >
        {label}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-sm">
        <p className="font-bold">{payload[0].payload.name}</p>
        <p>{`Progress: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function CrTrackingChart() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">CR Tracking</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Tahun:</span>
          <select className="input rounded-full pr-8">
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
      </div>
      <div className="w-full h-110">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 50, bottom: 10 }}
            barSize={20}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={{ stroke: "#ccc" }}
              tickLine={true}
              tick={CustomXAxisTick}
              ticks={xAxisTicks}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#65C7D5" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
