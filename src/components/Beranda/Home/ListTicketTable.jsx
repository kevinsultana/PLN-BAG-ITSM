"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Pagination,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useMemo } from "react";

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

// Dummy data
const initialTickets = [
  {
    ticket_id: " SCRQ – ERP MM – 29/07/2025 - 001",
    ticket_name: " Permintaan Akses User VP Niaga pada modul ERP MM ",
    ticket_detail: "User meminta akses ke layanan internal pada modul ERP MM.",
    created_by: "Nadia Salsabila",
    created_date: "2025-07-25 08:45:00",
    status: "Open",
  },
  {
    ticket_id: " SCRQ – ERP MM – 29/07/2025 - 002",
    ticket_name: "Reset Password Email",
    ticket_detail:
      "Permintaan reset password email untuk akun Budi Santoso pada ERP MM.",
    created_by: "Budi Santoso",
    created_date: "2025-07-26 10:30:00",
    status: "In Progress",
  },
  {
    ticket_id: " INFR – ERP e-Procurement – 29/07/2025 - 001 ",
    ticket_name: " Permintaan Pembuatan Vendor Baru dengan status DPT Active ",
    ticket_detail:
      "Pembuatan vendor baru atas nama PT INDAH JAYA sampai ke status DPT Active.",
    created_by: "Siti Nurhaliza",
    created_date: "2025-07-27 13:15:00",
    status: "Resolved",
  },
  {
    ticket_id: " INFR – HRIS – 29/07/2025 - 002",
    ticket_name: "Perbaiki Riwayat Cuti pada Employe dengan NIK BAG12345",
    ticket_detail:
      "Tolong ubah jatah cuti pada employee BAG12345, dimana saat ini user terkait belum melakukan cuti sama sekali.",
    created_by: "Rizky Hidayat",
    created_date: "2025-07-27 14:50:00",
    status: "Closed",
  },
  {
    ticket_id: " INSP – ERP FM – 29/07/2025 - 001",
    ticket_name: "Vendor Bill tidak bisa berstatus PAID",
    ticket_detail:
      "Seluruh vendor bill saat ini tidak bisa diubah statusnya menjadi PAID.",
    created_by: "Yuli Andriani",
    created_date: "2025-07-28 09:00:00",
    status: "Waiting",
  },
  {
    ticket_id: " INFR – ERP e-Procurement – 29/07/2025 - 001 ",
    ticket_name: " Permintaan Pembuatan Vendor Baru dengan status DPT Active ",
    ticket_detail:
      "Pembuatan vendor baru atas nama PT INDAH JAYA sampai ke status DPT Active.",
    created_by: "Siti Nurhaliza",
    created_date: "2025-07-27 13:15:00",
    status: "Resolved",
  },
  {
    ticket_id: " SCRQ – ERP MM – 29/07/2025 - 001",
    ticket_name: " Permintaan Akses User VP Niaga pada modul ERP MM ",
    ticket_detail: "User meminta akses ke layanan internal pada modul ERP MM.",
    created_by: "Nadia Salsabila",
    created_date: "2025-07-25 08:45:00",
    status: "Open",
  },
  {
    ticket_id: " SCRQ – ERP MM – 29/07/2025 - 002",
    ticket_name: "Reset Password Email",
    ticket_detail:
      "Permintaan reset password email untuk akun Budi Santoso pada ERP MM.",
    created_by: "Budi Santoso",
    created_date: "2025-07-26 10:30:00",
    status: "In Progress",
  },
  {
    ticket_id: " INSP – ERP FM – 29/07/2025 - 001",
    ticket_name: "Vendor Bill tidak bisa berstatus PAID",
    ticket_detail:
      "Seluruh vendor bill saat ini tidak bisa diubah statusnya menjadi PAID.",
    created_by: "Yuli Andriani",
    created_date: "2025-07-28 09:00:00",
    status: "Waiting",
  },

  {
    ticket_id: " INFR – HRIS – 29/07/2025 - 002",
    ticket_name: "Perbaiki Riwayat Cuti pada Employe dengan NIK BAG12345",
    ticket_detail:
      "Tolong ubah jatah cuti pada employee BAG12345, dimana saat ini user terkait belum melakukan cuti sama sekali.",
    created_by: "Rizky Hidayat",
    created_date: "2025-07-27 14:50:00",
    status: "Closed",
  },
];

export default function ListTicketTable({ onRowClick }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [orderBy, setOrderBy] = useState("no");
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
      const aVal = a[orderBy];
      const bVal = b[orderBy];
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
              {["kode", "deskripsi", "requester", "tanggal", "status"].map(
                (key) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : "asc"}
                      onClick={() => handleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTickets.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 trasnition duration-300 cursor-pointer"
                onClick={() => onRowClick(row, index)}
              >
                <TableCell className="border border-gray-200">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border border-gray-200">
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

        <div className="flex justify-end p-4">
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
