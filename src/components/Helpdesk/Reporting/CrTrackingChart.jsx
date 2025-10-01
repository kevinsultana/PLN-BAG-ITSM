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

const xAxisTicks = [0, 25, 50, 75, 100];

const tickLabels = {
  0: "Plan CR",
  25: "Approve IT",
  50: "Approve BPO",
  75: "CR Implementation",
  100: "Closed",
};

// Mapping status CR ke progress percentage
const statusProgressMapping = {
  "PLAN CR": 0,
  "APPROVE IT": 25,
  "APPROVE BPO": 50,
  "CR IMPLEMENTATION": 75,
  CLOSED: 100,
};

// Function to transform API data to chart format
const transformApiDataToChart = (apiData) => {
  // Jika ada data dari API, gunakan data API
  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    const groupedData = apiData.reduce((acc, item) => {
      const appName = item.ticket?.subject || "Unknown Application";
      const status = item.status_cr || "PLAN CR";
      const progress = statusProgressMapping[status] || 0;

      if (!acc[appName]) {
        acc[appName] = {
          name: appName,
          value: progress,
          status: status,
          count: 1,
          items: [item],
        };
      } else {
        if (progress > acc[appName].value) {
          acc[appName].value = progress;
          acc[appName].status = status;
        }
        acc[appName].count += 1;
        acc[appName].items.push(item);
      }

      return acc;
    }, {});

    return Object.values(groupedData);
  }

  return [];
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
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm max-w-xs">
        <p className="font-bold text-gray-800 mb-1">{data.name}</p>
        <p className="text-gray-600">{`Status: ${data.status}`}</p>
        <p className="text-gray-600">{`Progress: ${data.value}%`}</p>
        <p className="text-gray-600">{`Total CR: ${data.count}`}</p>
      </div>
    );
  }
  return null;
};

export default function CrTrackingChart({ data: propData }) {
  // Transform API data to chart format
  const chartData = transformApiDataToChart(propData);

  return (
    <div className="w-full">
      {chartData && chartData.length > 0 ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              barSize={30}
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
                axisLine={true}
                tickLine={true}
                width={100}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#65C7D5"
                background={{ fill: "#f3f4f6" }}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium">Tidak ada data CR Tracking</p>
            <p className="text-sm">
              Silakan ubah filter tanggal untuk melihat data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
