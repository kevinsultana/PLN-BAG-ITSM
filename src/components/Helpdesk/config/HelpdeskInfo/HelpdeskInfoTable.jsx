"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";

const initialHelpdeskInfo = [
  {
    no: 1,
    sosialMedia: "Email",
    informasiAkun: "servicedesk@bahteradhiguna.co.id",
  },
  { no: 2, sosialMedia: "No. Whatsapp", informasiAkun: "085121053911" },
  { no: 3, sosialMedia: "No. Telephone", informasiAkun: "085121053911" },
  {
    no: 4,
    sosialMedia: "URL Portal",
    informasiAkun: "https://portal-internal-bag.vercel.app/helpdesk",
  },
  { no: 5, sosialMedia: "Linkedin", informasiAkun: "linkedin/ptbag" },
];

const columns = [
  { label: "No.", key: "no" },
  { label: "Sosial Media", key: "sosialMedia" },
  { label: "Informasi Akun", key: "informasiAkun" },
  { label: "Aksi", key: "aksi", disableSorting: true },
];

export default function HelpdeskInfoTable({ onClickNewInfo }) {
  const [helpdeskInfo, setHelpdeskInfo] = useState(initialHelpdeskInfo);
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (row) => {
    console.log("Edit item:", row);
    setOpenMenuId(null);
  };

  const handleDelete = (row) => {
    console.log("Delete item:", row);
    setHelpdeskInfo(helpdeskInfo.filter((item) => item.no !== row.no));
    setOpenMenuId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

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
                <TableCell className="relative" ref={menuRef}>
                  <IconButton onClick={() => handleOpenMenu(row.no)}>
                    <RiMore2Fill />
                  </IconButton>
                  {openMenuId === row.no && (
                    <div className="absolute right-30 -translate-y-1/2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <ul className="py-1">
                        <li
                          onClick={() => handleEdit(row)}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Edit
                        </li>
                        <li
                          onClick={() => handleDelete(row)}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
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
