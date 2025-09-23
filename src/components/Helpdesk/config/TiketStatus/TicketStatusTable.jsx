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
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";

const initialTicketStatus = [];

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama", key: "Name" },
  { label: "Code", key: "Code" },
  { label: "Aksi", key: "aksi", disableSorting: true },
];

export default function TicketStatusTable({
  data,
  onClickNewTiketStats,
  onClickEdit,
  onClickDelete,
  loading,
}) {
  // Map API data to table format with no
  const mappedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return initialTicketStatus;
    return data.map((item, idx) => ({
      no: idx + 1,
      ...item,
    }));
  }, [data]);

  const [ticketStatus, setTicketStatus] = useState(mappedData);
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleEdit = (row) => {
    if (onClickEdit) onClickEdit(row);
    handleCloseMenu();
  };

  const handleDelete = (row) => {
    if (onClickDelete) onClickDelete(row);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  useEffect(() => {
    setTicketStatus(mappedData);
  }, [mappedData]);

  // MUI Menu provides click-outside handling

  const sortedAndFilteredStatus = useMemo(() => {
    let filteredList = ticketStatus.filter((status) =>
      Object.values(status).some((value) =>
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
  }, [ticketStatus, orderBy, order, searchTerm]);

  const paginatedStatus = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredStatus.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredStatus, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredStatus.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Status Tiket</h2>
        <div className="flex justify-between items-center gap-4">
          {/* <button
            onClick={onClickNewTiketStats}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
          >
            <FaPlus />
            <span>New</span>
          </button> */}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              paginatedStatus.map((row) => (
                <TableRow key={row.ID || row.no} hover>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Code}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                      <RiMore2Fill />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Menu
          id="ticket-status-actions"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              if (activeRow) handleEdit(activeRow);
            }}
          >
            Edit
          </MenuItem>
          {/* <MenuItem
            sx={{ color: "red" }}
            onClick={() => {
              if (activeRow) handleDelete(activeRow);
            }}
          >
            Delete
          </MenuItem> */}
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
