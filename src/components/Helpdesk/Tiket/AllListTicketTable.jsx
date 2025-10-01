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
  CircularProgress,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { FaPlus } from "react-icons/fa";
import { TbClockCheck, TbProgressCheck } from "react-icons/tb";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineTimerOff } from "react-icons/md";

const initialTickets = []; // fallback jika belum ada data API

const priorityStyle = {
  Kritis: { dot: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
  Tinggi: { dot: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
  Sedang: { dot: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" },
  Rendah: { dot: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
};

const priorityOrder = { Kritis: 4, Tinggi: 3, Sedang: 2, Rendah: 1, "": 0 };

const StatusPill = ({ status }) => {
  const s = (status || "").toString().toUpperCase();
  let icon = <HourglassTopIcon fontSize="small" />;
  let bgColor = "bg-green-100"; // Default for OPEN
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

const PriorityBadge = ({ value }) => {
  // guard against objects or unexpected types coming from API
  if (value == null || value === "")
    return <span className="text-gray-400">-</span>;
  const str =
    typeof value === "object"
      ? value.level || value.name || value.toString()
      : String(value);
  const s = priorityStyle[str] || priorityStyle.Rendah;
  return (
    <span
      className={`inline-flex items-center gap-2 ${s.bg} ${s.text} px-3 py-1 rounded-full text-sm font-medium`}
    >
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.dot}`} />
      {str}
    </span>
  );
};

const normalizeDate = (str) => {
  if (!str) return null;
  const isoLike = str.includes("T") ? str : str.replace(" ", "T");
  const d = new Date(isoLike);
  return isNaN(d.getTime()) ? null : d;
};

// Calculate SLA deadline: created_at + resolve_time (working hours only)
function addWorkingHours(startDate, hoursToAdd) {
  let date = new Date(startDate);
  let hoursLeft = hoursToAdd;
  while (hoursLeft > 0) {
    // If outside working hours, move to next working day 08:00
    if (
      date.getHours() < 8 ||
      date.getHours() >= 17 ||
      date.getDay() === 0 ||
      date.getDay() === 6
    ) {
      // Move to next weekday
      date.setDate(date.getDate() + 1);
      date.setHours(8, 0, 0, 0);
      continue;
    }
    // Calculate remaining working hours today
    const endHour = 17;
    const currentHour = date.getHours() + date.getMinutes() / 60;
    const hoursToday = endHour - currentHour;
    if (hoursLeft <= hoursToday) {
      date.setHours(date.getHours() + hoursLeft);
      break;
    } else {
      // Use up today's hours, move to next day
      date.setHours(endHour, 0, 0, 0);
      hoursLeft -= hoursToday;
      date.setDate(date.getDate() + 1);
      date.setHours(8, 0, 0, 0);
    }
  }
  return date;
}

const formatSLA = (created_at, sla_policy) => {
  if (!created_at || !sla_policy || !sla_policy.resolve_time) return "-";
  const start = normalizeDate(created_at);
  if (!start) return "-";
  const deadline = addWorkingHours(start, sla_policy.resolve_time);
  const tanggal = deadline.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const jam = deadline.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${tanggal} - ${jam} WIB`;
};

export default function AllListTicketTable({
  onRowClick,
  onPageChange,
  items = [],
  meta = [],
  loading,
  isMyTicket = false,
}) {
  // Parent mengirim langsung array `items` dari API
  const itemsFromApi = useMemo(() => {
    return (items || []).map((it) => ({
      id: it?.id ?? "-",
      priority:
        it?.priority && typeof it.priority === "object"
          ? it.priority.level || it.priority.name || ""
          : it?.priority ?? "",
      subject: it?.subject ?? "-",
      application: it?.application?.name ?? it?.application ?? "-",
      assign_team: (it?.team_group && it.team_group.name) || "",
      requester:
        it?.requester?.name ||
        it?.requester?.fullname ||
        it?.fullname ||
        it?.requester ||
        "-",
      sla_deadline: it?.sla_deadline || "",
      status: it?.status || "-",
      created_at: it?.created_at,
      sla_policy: it?.sla_policy,
    }));
  }, [items]);

  const [orderBy, setOrderBy] = useState("subject");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(meta?.page || 1);
  React.useEffect(() => {
    if (meta?.page) setPage(meta.page);
  }, [meta?.page]);
  const rowsPerPage = 5;

  const tickets = itemsFromApi.length ? itemsFromApi : initialTickets;

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

  const totalPages =
    meta?.total_pages ?? Math.ceil(sortedTickets.length / rowsPerPage);
  const paginatedTickets = useMemo(() => {
    if (onPageChange) return sortedTickets; // server-side pagination handled by parent
    const start = (page - 1) * rowsPerPage;
    return sortedTickets.slice(start, start + rowsPerPage);
  }, [sortedTickets, page, onPageChange]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          List {isMyTicket ? "Tiket Saya" : "Semua Tiket"}
        </h2>
        <Link
          href="/helpdesk/tiket/new"
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
              <TableCell>No</TableCell>

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Tidak ada data tiket.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  hover
                  className="cursor-pointer"
                  onClick={() => onRowClick?.(row, index)}
                >
                  <TableCell className="text-gray-800">
                    {((meta?.page || page) - 1) *
                      (meta?.page_size || rowsPerPage) +
                      index +
                      1}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge value={row.priority} />
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {row.subject || "-"}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {row.application || "-"}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {row.assign_team || "-"}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {row.requester || "-"}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {formatSLA(row.created_at, row.sla_policy)}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={row.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-gray-600">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages || 1}</span>
          </div>
          <Pagination
            count={totalPages || 1}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              onPageChange?.(value);
            }}
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
