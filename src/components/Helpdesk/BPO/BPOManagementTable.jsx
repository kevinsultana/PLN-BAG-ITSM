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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";
import Link from "next/link";

const initialBPOData = [
  { no: 1, namaManager: "Jhon Doe", namaBPO: "BPO IT", divisi: "IT" },
  {
    no: 2,
    namaManager: "Alika Prameswari",
    namaBPO: "BPO Finance",
    divisi: "Keuangan",
  },
  {
    no: 3,
    namaManager: "Ferdy Anggara",
    namaBPO: "BPO Pengadaan",
    divisi: "Pengadaan",
  },
];

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama Manager", key: "namaManager" },
  { label: "Nama BPO", key: "namaBPO" },
  { label: "Divisi", key: "divisi" },
  { label: "Aksi", key: "aksi", disableSorting: true },
];

export default function BPOManagementTable() {
  const [bpoData, setBpoData] = useState(initialBPOData);
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenMenu = (id) => {
    // handled by handleOpenMenuWithEvent
    setOpenMenuId(id);
  };

  const handleEdit = (row) => {
    console.log("Edit item:", row);
    handleCloseMenu();
  };

  const handleDelete = (row) => {
    console.log("Delete item:", row);
    setBpoData(bpoData.filter((item) => item.no !== row.no));
    handleCloseMenu();
  };

  const handleOpenMenuWithEvent = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
    setOpenMenuId(row.no);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
    setOpenMenuId(null);
  };

  const sortedAndFilteredData = useMemo(() => {
    let filteredList = bpoData.filter((item) =>
      Object.values(item).some((value) =>
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
  }, [bpoData, orderBy, order, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredData.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Pengelolaan BPO</h2>
        <div className="flex justify-end items-center gap-4">
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
            {paginatedData.map((row) => (
              <TableRow key={row.no} hover>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.namaManager}</TableCell>
                <TableCell>{row.namaBPO}</TableCell>
                <TableCell>{row.divisi}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleOpenMenuWithEvent(e, row)}>
                    <RiMore2Fill />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* MUI Menu for row actions */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => activeRow && handleEdit(activeRow)}>
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => activeRow && handleDelete(activeRow)}
            sx={{ color: "error.main" }}
          >
            Delete
          </MenuItem>
        </Menu>
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
