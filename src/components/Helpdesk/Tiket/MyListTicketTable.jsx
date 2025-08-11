"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
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
  Checkbox,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaPlus } from "react-icons/fa";

const initialTickets = [
  {
    id: 1,
    priority: "Tinggi",
    subject: "Permintaan akses ERP",
    application: "ERP FM",
    assign_team: "Func - Adam",
    requester: "Raka Pratama",
    sla_deadline: "2025-08-05 17:00:00",
    status: "In Progress",
  },
  {
    id: 2,
    priority: "Rendah",
    subject: "Akses approval PO hilang",
    application: "ERP CRM",
    assign_team: "",
    requester: "Dian Sari",
    sla_deadline: "",
    status: "Open",
  },
  {
    id: 3,
    priority: "Kritis",
    subject: "Modul e-Proc error saat submit",
    application: "e-Procurement",
    assign_team: "Tech - Yola",
    requester: "Budi Santoso",
    sla_deadline: "2025-08-04T10:00:00",
    status: "Resolved",
  },
  {
    id: 4,
    priority: "Sedang",
    subject: "Butuh data laporan vendor",
    application: "ERP CRM",
    assign_team: "",
    requester: "Lestari Wulandari",
    sla_deadline: "",
    status: "Open",
  },
  {
    id: 5,
    priority: "Tinggi",
    subject: "Tidak bisa login e-Proc",
    application: "e-Procurement",
    assign_team: "Tech - Yola",
    requester: "Irfan Hidayat",
    sla_deadline: "2025-08-05T12:00:00",
    status: "In Progress",
  },
];

const priorityStyle = {
  Kritis: { dot: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
  Tinggi: { dot: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
  Sedang: { dot: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" },
  Rendah: { dot: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
};

const priorityOrder = { Kritis: 4, Tinggi: 3, Sedang: 2, Rendah: 1, "": 0 };

const StatusPill = ({ status }) => {
  let icon = null;
  switch (status) {
    case "Resolved":
      icon = <CheckCircleOutlineIcon fontSize="small" />;
      break;
    case "In Progress":
      icon = <TimelapseIcon fontSize="small" />;
      break;
    case "Waiting":
      icon = <HourglassTopIcon fontSize="small" />;
      break;
    case "Closed":
      icon = <CancelIcon fontSize="small" />;
      break;
    default:
      icon = <HourglassTopIcon fontSize="small" />;
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">
      {icon} {status}
    </span>
  );
};

const PriorityBadge = ({ value }) => {
  if (!value) return <span className="text-gray-400">-</span>;
  const s = priorityStyle[value] || priorityStyle.Rendah;
  return (
    <span
      className={`inline-flex items-center gap-2 ${s.bg} ${s.text} px-3 py-1 rounded-full text-sm font-medium`}
    >
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.dot}`} />
      {value}
    </span>
  );
};

const normalizeDate = (str) => {
  if (!str) return null;
  const isoLike = str.includes("T") ? str : str.replace(" ", "T");
  const d = new Date(isoLike);
  return isNaN(d.getTime()) ? null : d;
};

const formatSLA = (str) => {
  const d = normalizeDate(str);
  if (!d) return "-";
  const tanggal = d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const jam = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${tanggal} - ${jam} WIB`;
};

export default function MyListTicketTable({ onRowClick }) {
  const [tickets] = useState(initialTickets);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparable = (row, key) => {
    if (key === "priority") return priorityOrder[row.priority] ?? 0;
    if (key === "sla_deadline") {
      const d = normalizeDate(row.sla_deadline);
      return d ? d.getTime() : Number.POSITIVE_INFINITY;
    }
    const v = row[key];
    if (typeof v === "number") return v;
    return (v || "").toString().toLowerCase();
  };

  const sortedTickets = useMemo(() => {
    const data = [...tickets];
    data.sort((a, b) => {
      const av = getComparable(a, orderBy);
      const bv = getComparable(b, orderBy);
      if (av < bv) return order === "asc" ? -1 : 1;
      if (av > bv) return order === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [tickets, orderBy, order]);

  const totalPages = Math.ceil(sortedTickets.length / rowsPerPage);
  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedTickets.slice(start, start + rowsPerPage);
  }, [sortedTickets, page]);

  const pageIds = paginatedTickets.map((t) => t.id);
  const allPageChecked = pageIds.every((id) => selectedIds.has(id));
  const indeterminate =
    !allPageChecked && pageIds.some((id) => selectedIds.has(id));

  const toggleSelectAllPage = (checked) => {
    const copy = new Set(selectedIds);
    if (checked) pageIds.forEach((id) => copy.add(id));
    else pageIds.forEach((id) => copy.delete(id));
    setSelectedIds(copy);
  };
  const toggleSelectRow = (id) => {
    const copy = new Set(selectedIds);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setSelectedIds(copy);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">List Tiket Saya</h2>
        <Link
          href="/beranda/new-ticket"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90"
        >
          <FaPlus />
          <span>New</span>
        </Link>
      </div>

      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-sm border border-gray-100"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allPageChecked}
                  indeterminate={indeterminate}
                  onChange={(e) => toggleSelectAllPage(e.target.checked)}
                />
              </TableCell>

              <TableCell sortDirection={orderBy === "id" ? order : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={orderBy === "priority" ? order : false}>
                <TableSortLabel
                  active={orderBy === "priority"}
                  direction={orderBy === "priority" ? order : "asc"}
                  onClick={() => handleSort("priority")}
                >
                  Priority
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={orderBy === "subject" ? order : false}>
                <TableSortLabel
                  active={orderBy === "subject"}
                  direction={orderBy === "subject" ? order : "asc"}
                  onClick={() => handleSort("subject")}
                >
                  Subjek
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "application" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "application"}
                  direction={orderBy === "application" ? order : "asc"}
                  onClick={() => handleSort("application")}
                >
                  Aplikasi
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "assign_team" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "assign_team"}
                  direction={orderBy === "assign_team" ? order : "asc"}
                  onClick={() => handleSort("assign_team")}
                >
                  Assign Team
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "requester" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "requester"}
                  direction={orderBy === "requester" ? order : "asc"}
                  onClick={() => handleSort("requester")}
                >
                  Requester
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "sla_deadline" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "sla_deadline"}
                  direction={orderBy === "sla_deadline" ? order : "asc"}
                  onClick={() => handleSort("sla_deadline")}
                >
                  SLA Deadline
                </TableSortLabel>
              </TableCell>

              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTickets.map((row) => (
              <TableRow
                key={row.id}
                hover
                className="cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                <TableCell
                  padding="checkbox"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                  />
                </TableCell>

                <TableCell className="text-gray-800">{row.id}</TableCell>

                <TableCell>
                  <PriorityBadge value={row.priority} />
                </TableCell>

                <TableCell className="text-gray-800">{row.subject}</TableCell>

                <TableCell className="text-gray-800">
                  {row.application}
                </TableCell>

                <TableCell className="text-gray-800">
                  {row.assign_team || <span className="text-gray-400">-</span>}
                </TableCell>

                <TableCell className="text-gray-800">{row.requester}</TableCell>

                <TableCell className="text-gray-800">
                  {formatSLA(row.sla_deadline)}
                </TableCell>

                <TableCell>
                  <StatusPill status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-gray-600">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages || 1}</span>
          </div>
          <Pagination
            count={totalPages}
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
              "& .MuiPaginationItem-ellipsis": { color: "#65C7D5" },
            }}
          />
        </div>
      </TableContainer>
    </div>
  );
}
