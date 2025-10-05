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
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";
import Link from "next/link";

// initialBPOData removed, always use API data

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama Manager", key: "namaManager" },
  // { label: "Nama BPO", key: "namaBPO" },
  { label: "Divisi", key: "divisi" },
  { label: "Aksi", key: "aksi", disableSorting: true },
];

export default function BPOManagementTable({ data, loading }) {
  // Always map API data to table format
  const mappedBpoData = Array.isArray(data)
    ? data.map((item, idx) => ({
        no: idx + 1,
        namaManager: item.fullname,
        namaBPO: item.name,
        divisi: item.division_name,
        id: item.id,
        raw: item,
      }))
    : [];

  const [bpoData, setBpoData] = useState(mappedBpoData);
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    setBpoData(mappedBpoData);
  }, [data]);

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
    handleCloseMenu();
  };

  const handleDelete = (row) => {
    setBpoData((prev) => prev.filter((item) => item.id !== row.id));
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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
                      style={{ cursor: "pointer", width: "25%" }}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={row.no} hover>
                  <TableCell style={{ width: "5%" }}>{row.no}</TableCell>
                  <TableCell style={{ width: "20%" }}>
                    {row.namaManager}
                  </TableCell>
                  {/* <TableCell style={{ width: "15%" }}>{row.namaBPO}</TableCell> */}
                  <TableCell style={{ width: "55%" }}>{row.divisi}</TableCell>
                  <TableCell style={{ width: "5%" }}>
                    <IconButton
                      onClick={(e) => handleOpenMenuWithEvent(e, row)}
                    >
                      <RiMore2Fill />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
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
