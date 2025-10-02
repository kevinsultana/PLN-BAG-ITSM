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
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaPlus, FaDownload, FaEye, FaPencilAlt } from "react-icons/fa";
import { RiMore2Fill } from "react-icons/ri";
import { MdOutlineAttachment } from "react-icons/md";

const statusColors = {
  DRAFT: { bg: "bg-gray-100", text: "text-gray-700", color: "default" },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", color: "warning" },
  APPROVED: { bg: "bg-green-100", text: "text-green-700", color: "success" },
  REJECTED: { bg: "bg-red-100", text: "text-red-700", color: "error" },
  "Plan CR": { bg: "bg-sky-100", text: "text-sky-700", color: "info" },
  "Approve IT": {
    bg: "bg-amber-100",
    text: "text-amber-700",
    color: "warning",
  },
  "Approve BPO": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    color: "success",
  },
};

const dataTypeColors = {
  Database: { bg: "bg-blue-100", text: "text-blue-700" },
  Application: { bg: "bg-purple-100", text: "text-purple-700" },
  Hardware: { bg: "bg-orange-100", text: "text-orange-700" },
  Software: { bg: "bg-indigo-100", text: "text-indigo-700" },
};

const StatusPill = ({ status }) => {
  const statusConfig = statusColors[status] || statusColors.DRAFT;

  // Custom styling untuk status CR dengan warna khusus
  const getCustomStyle = (status) => {
    switch (status) {
      case "PLAN CR":
        return "bg-sky-100 text-sky-700 border-sky-200";
      case "APPROVE IT":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "APPROVE BPO":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return `${statusConfig.bg} ${statusConfig.text}`;
    }
  };

  return (
    <span
      className={`flex text-nowrap items-center px-3 py-1 rounded-full text-xs font-medium border ${getCustomStyle(
        status
      )}`}
    >
      {status || "DRAFT"}
    </span>
  );
};

const DataTypeBadge = ({ type }) => {
  const typeConfig = dataTypeColors[type] || dataTypeColors.Application;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}
    >
      {type || "-"}
    </span>
  );
};

const AttachmentCell = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <MdOutlineAttachment className="text-gray-500" />
      <span className="text-sm text-gray-600">
        {attachments.length} file(s)
      </span>
      {attachments.map((attachment, index) => (
        <Tooltip key={index} title={`Download ${attachment.name}`}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              window.open(attachment.url, "_blank");
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaDownload size={12} />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

const ApprovalStatus = ({ isBpo1Approve, isBpo2Approve }) => {
  // Function to get status display and styling
  const getStatusDisplay = (approveStatus) => {
    if (approveStatus === "APPROVED") {
      return {
        icon: "✓",
        className: "bg-green-100 border-green-500 text-green-700",
      };
    } else if (approveStatus === "REJECTED") {
      return {
        icon: "✕",
        className: "bg-red-100 border-red-500 text-red-700",
      };
    } else {
      return {
        icon: "○",
        className: "bg-gray-100 border-gray-300 text-gray-500",
      };
    }
  };

  const bpo1Display = getStatusDisplay(isBpo1Approve);
  const bpo2Display = getStatusDisplay(isBpo2Approve);

  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${bpo1Display.className}`}
        >
          {bpo1Display.icon}
        </span>
        <span className="text-xs text-gray-600">BPO1</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${bpo2Display.className}`}
        >
          {bpo2Display.icon}
        </span>
        <span className="text-xs text-gray-600">BPO2</span>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "-";
  }
};

export default function CrApprovalTableUser({
  onEditClick,
  items = [],
  loading = false,
}) {
  const [orderBy, setOrderBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const normalizedData = useMemo(() => {
    return (items || []).map((item) => ({
      id: item?.id || "-",
      ticket_id: item?.ticket_id || "-",
      division_name: item?.division_name || "-",
      change_description: item?.change_description || "-",
      application_type: item?.application_type || "-",
      data_type: item?.data_type || "-",
      database_name: item?.database_name || "-",
      application_database: item?.application_database || "-",
      hardware_name: item?.hardware_name || "-",
      software_name: item?.software_name || "-",
      software_version: item?.software_version || "-",
      implementation_scope: item?.implementation_scope || "-",
      additional_notes: item?.additional_notes || "-",
      is_bpo1_approve: item?.is_bpo1_approve || false,
      is_bpo2_approve: item?.is_bpo2_approve || false,
      status_cr: item?.status_cr,
      created_at: item?.created_at,
      attachments: item?.attachments || [],
    }));
  }, [items]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparable = (row, key) => {
    if (key === "created_at") {
      const d = new Date(row.created_at);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    }
    const v = row[key];
    if (typeof v === "number") return v;
    return (v || "").toString().toLowerCase();
  };

  const sortedData = useMemo(() => {
    const data = [...normalizedData];
    data.sort((a, b) => {
      const av = getComparable(a, orderBy);
      const bv = getComparable(b, orderBy);
      if (av < bv) return order === "asc" ? -1 : 1;
      if (av > bv) return order === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [normalizedData, orderBy, order]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">CR Approval Management</h2>
      </div>

      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-sm border border-gray-100"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>No</TableCell>

              <TableCell
                sortDirection={orderBy === "division_name" ? order : false}
                style={{ width: 300 }}
              >
                <TableSortLabel
                  active={orderBy === "division_name"}
                  direction={orderBy === "division_name" ? order : "asc"}
                  onClick={() => handleSort("division_name")}
                >
                  Divisi
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "change_description" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "change_description"}
                  direction={orderBy === "change_description" ? order : "asc"}
                  onClick={() => handleSort("change_description")}
                >
                  Dampak Implementasi
                </TableSortLabel>
              </TableCell>

              <TableCell>Lampiran</TableCell>

              <TableCell>BPO Approval</TableCell>

              <TableCell
                sortDirection={orderBy === "status_cr" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "status_cr"}
                  direction={orderBy === "status_cr" ? order : "asc"}
                  onClick={() => handleSort("status_cr")}
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "created_at" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "created_at"}
                  direction={orderBy === "created_at" ? order : "asc"}
                  onClick={() => handleSort("created_at")}
                >
                  Created At
                </TableSortLabel>
              </TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Tidak ada data CR approval.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow key={row.id || index} hover>
                  <TableCell className="text-gray-800">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell className="text-gray-800">
                    {row.division_name}
                  </TableCell>

                  <TableCell className="text-gray-800 max-w-xs">
                    <div className="truncate" title={row.change_description}>
                      {row.change_description}
                    </div>
                  </TableCell>

                  <TableCell>
                    <AttachmentCell attachments={row.attachments} />
                  </TableCell>

                  <TableCell>
                    <ApprovalStatus
                      isBpo1Approve={row.is_bpo1_approve}
                      isBpo2Approve={row.is_bpo2_approve}
                    />
                  </TableCell>

                  <TableCell>
                    <StatusPill status={row.status_cr} />
                  </TableCell>

                  <TableCell className="text-gray-800">
                    {formatDate(row.created_at)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => onRowClick?.(row, index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="Edit CR">
                        <IconButton
                          size="small"
                          onClick={() => onEditClick?.(row, index)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaPencilAlt />
                        </IconButton>
                      </Tooltip>
                    </div>
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
