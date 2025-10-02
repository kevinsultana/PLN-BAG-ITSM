"use client";
import React, { useState, useMemo, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { TbClockCheck, TbProgressCheck } from "react-icons/tb";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineTimerOff } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

// Mapping status ke ikon dan warna background
const statusIcon = (status) => {
  const s = (status || "").toString().toUpperCase();
  let icon = <HourglassTopIcon fontSize="small" />;
  let bgColor = "bg-green-100 text-green-700"; // Default for OPEN
  let textColor = "text-green-700";

  if (s === "RESOLVED" || s === "DONE") {
    icon = <TbClockCheck fontSize="small" />;
    bgColor = "bg-blue-100";
    textColor = "text-blue-700";
  } else if (s === "IN PROGRESS" || s === "ON PROGRESS") {
    icon = <TbProgressCheck fontSize="small" />;
    bgColor = "bg-red-100";
    textColor = "text-red-700";
  } else if (s === "WAITING" || s === "PENDING" || s === "ON HOLD") {
    icon = <LuTimerReset fontSize="small" />;
    bgColor = "bg-orange-100";
    textColor = "text-orange-700";
  } else if (s === "CLOSED") {
    icon = <MdOutlineTimerOff fontSize="small" />;
    bgColor = "bg-gray-100";
    textColor = "text-gray-700";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full ${bgColor} ${textColor} px-3 py-1 text-sm font-medium`}
    >
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
  onPageChange,
  loading = false,
}) {
  const [orderBy, setOrderBy] = useState("ticket_id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const { privilege } = useAuth();

  // Update page state when dataMetaTiket changes
  useEffect(() => {
    if (dataMetaTiket.page) {
      setPage(dataMetaTiket.page);
    }
  }, [dataMetaTiket.page]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // Map API data to table columns
  const mappedTickets = useMemo(() => {
    // Check if dataTiket has items property, if not treat dataTiket as array directly
    const ticketArray = dataTiket.items || dataTiket || [];
    return ticketArray.map((item) => ({
      ticket_id: item.id,
      ticket_detail: item.subject,
      created_by: item.requester?.name || item.fullname || item.email,
      created_date: item.created_at
        ? new Date(item.created_at).toLocaleString("id-ID")
        : "",
      status: item.status,
      ticket_code: item.ticket_code || "-",
      raw: item,
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

  // Since data is already paginated from server, we don't need to slice again
  const paginatedTickets = sortedTickets;

  return (
    <div className="p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">List Tiket</h2>
        {privilege.data.includes("user.ticket.create") && (
          <Link
            href="/beranda/new-ticket"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm"
          >
            <FaPlus />
            <h3>New</h3>
          </Link>
        )}
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress size={40} sx={{ color: "#65C7D5" }} />
                    <span className="text-gray-600 text-sm">
                      Loading tickets...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedTickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">Tidak ada tiket</p>
                    <p className="text-sm">Belum ada tiket yang tersedia</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((row, index) => (
                <TableRow
                  onClick={() => onRowClick?.(row.raw, index)}
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <TableCell className="border border-gray-200">
                    {((dataMetaTiket.page || 1) - 1) *
                      (dataMetaTiket.page_size || 5) +
                      index +
                      1}
                  </TableCell>
                  <TableCell className="border border-gray-200 ">
                    {row.ticket_code ? row.ticket_code : "-"}
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
              ))
            )}
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
            onChange={handlePageChange}
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
