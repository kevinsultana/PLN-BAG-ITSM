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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

// Mapping status ke ikon
const statusIcon = (status) => {
  switch (status) {
    case "Resolved":
      return <CheckCircleOutlineIcon className="text-green-500" />;
    case "In Progress":
      return <TimelapseIcon className="text-yellow-500" />;
    case "Waiting":
      return <HourglassTopIcon className="text-blue-500" />;
    case "Closed":
      return <CancelIcon className="text-gray-400" />;
    default:
      return null;
  }
};

// Kolom tabel: label & properti data
const columns = [
  { label: "Tiket", key: "ticket_id" },
  { label: "Deskripsi Tiket", key: "ticket_detail" },
  { label: "Requester", key: "created_by" },
  { label: "Tanggal", key: "created_date" },
  { label: "Status", key: "status" },
];

// Data dummy
const initialTickets = [
  {
    ticket_id: "SCRQ – ERP MM – 29/07/2025 - 001",
    ticket_detail: "User meminta akses ke modul ERP MM.",
    created_by: "Nadia Salsabila",
    created_date: "25 Juli 2025 08.45 WIB",
    status: "Open",
  },
  {
    ticket_id: "SCRQ – ERP MM – 29/07/2025 - 002",
    ticket_detail: "Reset password email untuk akun Budi Santoso.",
    created_by: "Budi Santoso",
    created_date: "26 Juli 2025 10.30 WIB",
    status: "In Progress",
  },
  {
    ticket_id: "INFR – ERP e-Proc – 29/07/2025 - 001",
    ticket_detail: "Vendor baru PT INDAH JAYA status DPT Active.",
    created_by: "Siti Nurhaliza",
    created_date: "27 Juli 2025 13.15 WIB",
    status: "Resolved",
  },
  {
    ticket_id: "INFR – HRIS – 29/07/2025 - 002",
    ticket_detail: "Ubah jatah cuti employee BAG12345.",
    created_by: "Rizky Hidayat",
    created_date: "27 Juli 2025 14.50 WIB",
    status: "Closed",
  },
  {
    ticket_id: "INSP – ERP FM – 29/07/2025 - 001",
    ticket_detail: "Vendor bill tidak bisa diubah menjadi PAID.",
    created_by: "Yuli Andriani",
    created_date: "28 Juli 2025 09.00 WIB",
    status: "Waiting",
  },
];

export default function ListTicketTable({ onRowClick }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [orderBy, setOrderBy] = useState("ticket_id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => {
      const aVal = a[orderBy]?.toString().toLowerCase();
      const bVal = b[orderBy]?.toString().toLowerCase();
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [tickets, orderBy, order]);

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedTickets.slice(start, start + rowsPerPage);
  }, [sortedTickets, page]);

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
                  onClick={() => onRowClick?.(row, index)}
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
                    <span>{row.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between p-4">
          <div>
            <p className="text-sm">
              Page {page} of {Math.ceil(tickets.length / rowsPerPage)}
            </p>
          </div>
          <Pagination
            count={Math.ceil(tickets.length / rowsPerPage)}
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
