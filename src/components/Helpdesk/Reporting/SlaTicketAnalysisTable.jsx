"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Pagination,
} from "@mui/material";
import { RiArrowDownSLine } from "react-icons/ri";

const initialSlaData = [
  {
    priority: "Kritis",
    jumlahTicket: 12,
    avgResolution: "2 Hours",
    successRate: "10%",
  },
  {
    priority: "Tinggi",
    jumlahTicket: 8,
    avgResolution: "3 Hours",
    successRate: "25%",
  },
  {
    priority: "Sedang",
    jumlahTicket: 5,
    avgResolution: "1 Hours",
    successRate: "10%",
  },
  {
    priority: "Rendah",
    jumlahTicket: 2,
    avgResolution: "1 Hours",
    successRate: "12%",
  },
];

const totals = {
  jumlahTicket: 10,
  avgResolution: "5 Hours",
  successRate: "8.33%",
};

const priorityStyle = {
  Kritis: { dot: "bg-red-500" },
  Tinggi: { dot: "bg-orange-500" },
  Sedang: { dot: "bg-yellow-500" },
  Rendah: { dot: "bg-green-500" },
};

const columns = [
  { label: "Priority", key: "priority" },
  { label: "Jumlah Tiket", key: "jumlahTicket" },
  { label: "AVG Hours Resolution", key: "avgResolution" },
  { label: "% of Success Rate", key: "successRate" },
];

export default function SlaTicketAnalysisTable({ items = [], summary = {} }) {
  const [orderBy, setOrderBy] = useState("total_tickets");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, orderBy, order]);

  const columns = [
    { label: "Priority", key: "priority_level" },
    { label: "Jumlah Tiket", key: "total_tickets" },
    { label: "AVG Hours Resolution", key: "avg_resolution_hours" },
    { label: "% of Success Rate", key: "success_rate" },
  ];

  const priorityStyle = {
    Kritis: { dot: "bg-red-500" },
    Tinggi: { dot: "bg-orange-500" },
    Sedang: { dot: "bg-yellow-500" },
    Rendah: { dot: "bg-green-500" },
  };

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <h2 className="text-xl font-bold mb-4">SLA Tiket Analysis</h2>
      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-sm border border-gray-100"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : "asc"}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={row.priority_id || index} hover>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        priorityStyle[row.priority_level]?.dot || "bg-gray-400"
                      }`}
                    />
                    {row.priority_level}
                  </span>
                </TableCell>
                <TableCell>{row.total_tickets}</TableCell>
                <TableCell>{row.avg_resolution_hours}</TableCell>
                <TableCell>{row.success_rate}%</TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow className="bg-gray-100 font-bold">
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">
                {summary.total_tickets}
              </TableCell>
              <TableCell className="font-bold">
                {summary.avg_resolution_hours}
              </TableCell>
              <TableCell className="font-bold">
                {summary.success_rate}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
