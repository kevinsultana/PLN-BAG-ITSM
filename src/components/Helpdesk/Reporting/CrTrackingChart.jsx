"use client";
import React, { useState } from "react";
import { RiArrowDownSLine, RiCalendarLine } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FilterModalTanggal from "./FilterModalTanggal";

// Fallback data untuk testing
const defaultData = [
  { name: "Penambahan Fitur", value: 40, status: "APPROVE IT", count: 1 },
  { name: "Integrasi Modul", value: 50, status: "APPROVE BPO", count: 1 },
  {
    name: "Approval Permintaan",
    value: 65,
    status: "CR Implementation",
    count: 1,
  },
  {
    name: "Docking & Maintenance",
    value: 78,
    status: "CR Implementation",
    count: 1,
  },
  { name: "Report Dashboard", value: 100, status: "Closed", count: 1 },
];

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
    // Group data by application name and calculate progress based on status_cr
    const groupedData = apiData.reduce((acc, item) => {
      const appName = item.ticket?.application?.name || "Unknown Application";
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
        // If multiple CRs for same app, use the highest progress
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

  // Jika tidak ada data API, gunakan dummy data dengan 5 entries
  return [
    { name: "ITSM Portal", value: 75, status: "CR IMPLEMENTATION", count: 3 },
    { name: "Helpdesk System", value: 50, status: "APPROVE BPO", count: 2 },
    { name: "Asset Management", value: 100, status: "CLOSED", count: 1 },
    { name: "Monitoring Dashboard", value: 25, status: "APPROVE IT", count: 4 },
    { name: "Reporting Module", value: 0, status: "PLAN CR", count: 2 },
  ];
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
