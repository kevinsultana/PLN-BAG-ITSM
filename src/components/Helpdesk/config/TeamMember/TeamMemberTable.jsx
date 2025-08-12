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
  TextField,
  InputAdornment,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

const initialTeamMembers = [
  {
    no: 1,
    nama: "Functional",
    slaPolicy: "SLA - Critical Incident",
    jumlahAgent: 4,
  },
  {
    no: 2,
    nama: "Technical",
    slaPolicy: "SLA - Low Priority Request",
    jumlahAgent: 7,
  },
  {
    no: 3,
    nama: "Functional",
    slaPolicy: "SLA - Emergency Access Request",
    jumlahAgent: 3,
  },
  {
    no: 4,
    nama: "Technical",
    slaPolicy: "SLA - IT Procurement Approval",
    jumlahAgent: 2,
  },
  {
    no: 5,
    nama: "Functional",
    slaPolicy: "SLA - Emergency Access Request",
    jumlahAgent: 3,
  },
];

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama", key: "nama" },
  { label: "SLA Policy", key: "slaPolicy" },
  { label: "Jumlah Agent", key: "jumlahAgent" },
];

export default function TeamMemberTable({ onClickNew }) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
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

  const sortedAndFilteredMembers = useMemo(() => {
    let filteredList = teamMembers.filter((member) =>
      Object.values(member).some((value) =>
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
  }, [teamMembers, orderBy, order, searchTerm]);

  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredMembers.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredMembers, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredMembers.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Team Member</h2>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onClickNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90"
          >
            <FaPlus />
            <span>New</span>
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
            {paginatedMembers.map((row) => (
              <TableRow key={row.no} hover>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.slaPolicy}</TableCell>
                <TableCell>{row.jumlahAgent}</TableCell>
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
