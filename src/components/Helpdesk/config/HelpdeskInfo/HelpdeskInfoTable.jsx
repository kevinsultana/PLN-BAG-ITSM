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
  TextField,
  InputAdornment,
} from "@mui/material";
import { RiSearchLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

const initialHelpdeskInfo = [];

const humanizeKey = (key) => {
  if (!key) return "";
  // convert snake_case or camelCase to Title Case
  const withSpaces = key
    // insert space before capital letters
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // replace underscores and dashes with spaces
    .replace(/[_-]+/g, " ")
    .toLowerCase();
  return withSpaces
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const mapApiToRows = (api) => {
  if (!api || Object.keys(api).length === 0) return initialHelpdeskInfo;

  // preferred order and label overrides for common keys
  const preferred = [
    "email",
    "whatsapp",
    "whatsapp_number",
    "phone",
    "telephone",
    "instagram",
    "facebook",
    "portal_url",
    "linkedin",
    "hours_mon_thu",
    "hours_fri",
  ];

  const labelOverrides = {
    email: "Email",
    whatsapp: "Whatsapp",
    whatsapp_number: "Whatsapp",
    phone: "Phone",
    telephone: "Phone",
    instagram: "Instagram",
    facebook: "Facebook",
    portal_url: "Portal URL",
    linkedin: "Linkedin",
    hours_mon_thu: "Hours (Mon-Thu)",
    hours_fri: "Hours (Fri)",
  };

  const rows = [];
  const usedKeys = new Set();

  // add preferred keys first if present
  preferred.forEach((k) => {
    if (api[k] !== undefined) {
      rows.push({
        key: k,
        sosialMedia: labelOverrides[k] || humanizeKey(k),
        informasiAkun: api[k] ?? "-",
      });
      usedKeys.add(k);
    }
  });

  // add any other keys from API that weren't included above
  Object.keys(api).forEach((k) => {
    if (!usedKeys.has(k)) {
      rows.push({
        key: k,
        sosialMedia: humanizeKey(k),
        informasiAkun: api[k] ?? "-",
      });
      usedKeys.add(k);
    }
  });

  // assign sequential numbers
  return rows.map((r, idx) => ({
    no: idx + 1,
    sosialMedia: r.sosialMedia,
    informasiAkun: r.informasiAkun,
  }));
};

const columns = [
  { label: "No.", key: "no" },
  { label: "Sosial Media", key: "sosialMedia" },
  { label: "Informasi Akun", key: "informasiAkun" },
];

export default function HelpdeskInfoTable({ onClickNewInfo, data }) {
  const [helpdeskInfo, setHelpdeskInfo] = useState(() => mapApiToRows(data));
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setHelpdeskInfo(mapApiToRows(data));
  }, [data]);

  const sortedAndFilteredInfo = useMemo(() => {
    let filteredList = helpdeskInfo.filter((info) =>
      Object.values(info).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return filteredList.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [helpdeskInfo, orderBy, order, searchTerm]);

  const paginatedInfo = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredInfo.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredInfo, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredInfo.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Helpdesk Info</h2>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onClickNewInfo}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
          >
            <FaPencil />
            <span>Edit</span>
          </button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiSearchLine className="text-gray-400" />
                </InputAdornment>
              ),
              className: "rounded-full h-9 bg-gray-100 pr-2",
            }}
          />
        </div>
      </div>
      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-sm border border-gray-100"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sortDirection={orderBy === column.key ? order : false}
                >
                  {column.disableSorting ? (
                    column.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === column.key}
                      direction={orderBy === column.key ? order : "asc"}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInfo.map((row) => (
              <TableRow key={row.no} hover>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.sosialMedia}</TableCell>
                <TableCell>{row.informasiAkun}</TableCell>
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
