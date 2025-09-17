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
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { TbClockCheck, TbProgressCheck } from "react-icons/tb";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineTimerOff } from "react-icons/md";

// Mapping status ke ikon
const statusIcon = (status) => {
  const s = (status || "").toString().toUpperCase();
  let icon = <HourglassTopIcon fontSize="small" />;

  if (s === "RESOLVED" || s === "DONE")
    icon = <TbClockCheck fontSize="small" />;
  else if (s === "IN PROGRESS" || s === "ON PROGRESS")
    icon = <TbProgressCheck fontSize="small" />;
  else if (s === "WAITING" || s === "PENDING" || s === "ON HOLD")
    icon = <LuTimerReset fontSize="small" />;
  else if (s === "CLOSED") icon = <MdOutlineTimerOff fontSize="small" />;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">
      {icon} {status || "-"}
    </span>
  );
};

// Kolom tabel: label & properti data
const columns = [
  { label: "Tiket", key: "ticket_id" },
  { label: "Deskripsi Tiket", key: "ticket_detail" },
  { label: "Requester", key: "created_by" },
  { label: "Tanggal", key: "created_date" },
  { label: "Status", key: "status" },
];

export default function ListTicketTable({
  onRowClick,
  dataTiket = [],
  dataMetaTiket = {},
}) {
  const [orderBy, setOrderBy] = useState("ticket_id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(dataMetaTiket.page || 1);
  const rowsPerPage = dataMetaTiket.page_size || 10;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Map API data to table columns
  const mappedTickets = useMemo(() => {
    return (dataTiket.items || []).map((item) => ({
      ticket_id: item.id,
      ticket_detail: item.subject,
      created_by: item.requester?.name || item.fullname || item.email,
      created_date: item.created_at
        ? new Date(item.created_at).toLocaleString("id-ID")
        : "",
      status: item.status,
      raw: item, // keep original for row click
    }));
  }, [dataTiket]);

  const sortedTickets = useMemo(() => {
    return [...mappedTickets].sort((a, b) => {
      const aVal = a[orderBy]?.toString().toLowerCase();
      const bVal = b[orderBy]?.toString().toLowerCase();
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [mappedTickets, orderBy, order]);

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedTickets.slice(start, start + rowsPerPage);
  }, [sortedTickets, page, rowsPerPage]);

  return (
    <div className="p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">List Tiket</h2>
        <Link
          href="/beranda/new-ticket"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm"
        >
          <FaPlus />
          <h3>New</h3>
        </Link>
      </div>

      <TableContainer component={Paper} className="rounded-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTickets.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-200">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  onClick={() => onRowClick?.(row.raw, index)}
                  className="border border-gray-200 hover:underline transition-all duration-300 cursor-pointer"
                >
                  {row.ticket_id}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.ticket_detail}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.created_by}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.created_date}
                </TableCell>
                <TableCell className="border border-gray-200">
                  <div className="flex items-center gap-2">
                    {statusIcon(row.status)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between p-4">
          <div>
            <p className="text-sm">
              Page {page} of {dataMetaTiket.total_pages || 1}
            </p>
          </div>
          <Pagination
            count={dataMetaTiket.total_pages || 1}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#65C7D5",
                borderColor: "#65C7D5",
              },
              "& .Mui-selected": {
                backgroundColor: "#65C7D5 !important",
                color: "#fff !important",
                borderColor: "#65C7D5 !important",
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#65C7D5",
              },
            }}
          />
        </div>
      </TableContainer>
    </div>
  );
}
