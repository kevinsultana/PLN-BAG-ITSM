"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  RiCalendarLine,
  RiInformationLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import FilterModalTanggal from "./FilterModalTanggal";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { ProxyUrl } from "@/api/BaseUrl";

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState({
    date_from: getTodayDate(),
    date_to: getTodayDate(),
  });

  const [isModalTanggalOpen, setIsModalTanggalOpen] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({});
  const lastFetchedDate = useRef("");

  const statusTotals = useMemo(() => {
    const list = dataDashboard?.ticket_status_total ?? [];
    const map = {};
    for (const item of list) {
      if (!item) continue;
      const key = String(item.status || "").toUpperCase();
      const value = Number(
        (typeof item.total !== "undefined" ? item.total : item.count) ?? 0
      );
      if (key) map[key] = value;
    }
    return map;
  }, [dataDashboard]);

  const ticketSummary = [
    {
      status: "Open",
      count: statusTotals.OPEN ?? 0,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      status: "In Progress",
      count: statusTotals["IN PROGRESS"] ?? statusTotals.IN_PROGRESS ?? 0,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      status: "Waiting",
      count: statusTotals.WAITING ?? 0,
      color: "bg-orange-400",
      textColor: "text-orange-400",
    },
    {
      status: "Resolved",
      count: statusTotals.RESOLVED ?? 0,
      color: "bg-blue-400",
      textColor: "text-blue-400",
    },
    {
      status: "Closed",
      count: statusTotals.CLOSED ?? 0,
      color: "bg-gray-400",
      textColor: "text-gray-400",
    },
  ];

  // Filter hanya tiket dengan priority Kritis dan Tinggi, batasi 5 teratas
  const ticketList = useMemo(() => {
    const allTickets = dataDashboard.list_ticket ?? [];
    return allTickets
      .filter(
        (ticket) =>
          ticket.priority?.level === "Kritis" ||
          ticket.priority?.level === "Tinggi"
      )
      .slice(0, 5);
  }, [dataDashboard.list_ticket]);

  const slaPerformance = [
    {
      label: "Total Ticket Todays",
      value: dataDashboard.sla_performance?.total_ticket_today ?? "-",
    },
    {
      label: "SLA on Track",
      value: dataDashboard.sla_performance?.sla_on_track ?? "-",
    },
    {
      label: "SLA on Breached",
      value: dataDashboard.sla_performance?.sla_on_breached ?? "-",
    },
    {
      label: "AVG Resolution Time",
      value:
        dataDashboard.sla_performance?.avg_resolution_time !== undefined
          ? `${dataDashboard.sla_performance.avg_resolution_time} Jam`
          : "-",
    },
    {
      label: "AVG Response Time",
      value:
        dataDashboard.sla_performance?.avg_response_time !== undefined
          ? `${dataDashboard.sla_performance.avg_response_time} Menit`
          : "-",
    },
  ];

  const getData = async (dateRange) => {
    const dateKey = `${dateRange.date_from}_${dateRange.date_to}`;

    // Cegah duplicate API call dengan date yang sama
    if (lastFetchedDate.current === dateKey) {
      console.log("Skipping duplicate API call for same date range");
      return;
    }

    lastFetchedDate.current = dateKey;
    console.log("Fetching dashboard data for:", dateRange);

    try {
      const res = await ProxyUrl.get("/helpdesk/dashboard", {
        params: dateRange,
      });
      setDataDashboard(res.data.data);
    } catch (error) {
      console.log(error);
      // Reset lastFetchedDate jika ada error, biar bisa retry
      lastFetchedDate.current = "";
    }
  };

  useEffect(() => {
    getData(currentDate);
  }, [currentDate.date_from, currentDate.date_to]);

  return (
    <div className="p-4 mt-4 bg-gray-50 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div
          className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm cursor-pointer relative"
          onClick={() => setIsModalTanggalOpen(true)}
        >
          <RiCalendarLine className="mr-2 text-gray-500" />
          <span>
            {(() => {
              const from = currentDate.date_from;
              const to = currentDate.date_to;
              const format = (dateStr) => {
                const d = new Date(dateStr);
                return d.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
              };
              if (from === to) return format(from);
              return `${format(from)} - ${format(to)}`;
            })()}
          </span>
          <RiArrowDownSLine className="ml-2 text-gray-500" />
        </div>
      </div>

      {/* Ticket Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {ticketSummary.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-6 rounded-lg shadow-md ${item.color} text-white`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{item.status}</span>
              <RiInformationLine className="text-xl" />
            </div>
            <span className="text-5xl font-bold">{item.count}</span>
          </div>
        ))}
      </div>
      {/* List Tiket & SLA Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Tiket */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            List Tiket
          </h2>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Prioritas
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Subjek
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    SLA Deadline
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: "center", py: 4 }}>
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <RiInformationLine className="text-4xl mb-2 text-gray-400" />
                        <p className="text-lg font-medium">
                          Tidak ada tiket dengan prioritas Tinggi dan Kritis
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  ticketList.map((ticket, index) => {
                    // Priority color mapping
                    let priorityColor = "bg-gray-100 text-gray-700";
                    if (ticket.priority?.level === "Kritis")
                      priorityColor = "bg-red-100 text-red-700";
                    else if (ticket.priority?.level === "Tinggi")
                      priorityColor = "bg-orange-100 text-orange-700";
                    else if (ticket.priority?.level === "Sedang")
                      priorityColor = "bg-yellow-100 text-yellow-700";
                    else if (ticket.priority?.level === "Rendah")
                      priorityColor = "bg-blue-100 text-blue-700";

                    // Format SLA Deadline (created_at + SLA name)
                    const createdDate = new Date(ticket.created_at);
                    const formattedDate = createdDate.toLocaleString("id-ID", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const slaDeadline = `${formattedDate} `;

                    return (
                      <TableRow key={ticket.id || index}>
                        <TableCell>
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${priorityColor}`}
                          >
                            {ticket.priority?.level || "-"}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{slaDeadline}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* SLA Performance */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            SLA Performance
          </h2>
          <div className="divide-y divide-gray-200">
            {slaPerformance.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3"
              >
                <span className="text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FilterModalTanggal
        isOpen={isModalTanggalOpen}
        onClose={() => setIsModalTanggalOpen(false)}
        onClickApply={(setFilters) => {
          setCurrentDate(setFilters);
        }}
      />
    </div>
  );
}
