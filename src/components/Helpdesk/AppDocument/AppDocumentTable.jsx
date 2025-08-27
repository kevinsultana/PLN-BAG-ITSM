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
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";

const initialAppDocuments = [
  {
    no: 1,
    nama: "User Guide BAg Daily",
    aplikasi: "BAg Daily",
    fileTemplate: "UserguideBAgDaily.pdf",
  },
  {
    no: 2,
    nama: "Draft Kontrak Tender Non Kapal",
    aplikasi: "e-Procurement",
    fileTemplate: "Kontraknonkapal.docx",
  },
  {
    no: 3,
    nama: "RKS Tender Kapal",
    aplikasi: "e-Procurement",
    fileTemplate: "RKSKapal.pdf",
  },
  {
    no: 4,
    nama: "SOP Divisi Pengusul B/J",
    aplikasi: "ShipTracking",
    fileTemplate: "SOPVendor.pdf",
  },
  {
    no: 5,
    nama: "User Guide BAg Daily",
    aplikasi: "BAg Daily",
    fileTemplate: "UserguideBAgDaily.pdf",
  },
];

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama", key: "nama" },
  { label: "Aplikasi", key: "aplikasi" },
  { label: "File Template", key: "fileTemplate" },
  { label: "Aksi", key: "aksi", disableSorting: true },
];

export default function AppDocumentTable({ onClickNewDocApps }) {
  const [appDocuments, setAppDocuments] = useState(initialAppDocuments);
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
    setAppDocuments(appDocuments.filter((item) => item.no !== row.no));
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

  const sortedAndFilteredDocuments = useMemo(() => {
    let filteredList = appDocuments.filter((doc) =>
      Object.values(doc).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return filteredList;
  }, [appDocuments, searchTerm]);

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredDocuments.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredDocuments, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredDocuments.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Dokumen Aplikasi</h2>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onClickNewDocApps}
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
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.map((row) => (
              <TableRow key={row.no} hover>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.aplikasi}</TableCell>
                <TableCell>{row.fileTemplate}</TableCell>
                <TableCell className="relative" ref={menuRef}>
                  <IconButton onClick={() => handleOpenMenu(row.no)}>
                    <RiMore2Fill />
                  </IconButton>
                  {openMenuId === row.no && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
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
