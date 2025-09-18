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
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

const columns = [
  { label: "No.", key: "no" },
  { label: "Nama", key: "name" },
  { label: "Deskripsi", key: "description" },
  { label: "Email", key: "is_email" },
  { label: "Auto Assign", key: "is_autoassign" },
  { label: "Jumlah Anggota", key: "team_count" },
  { label: "Aksi", key: "actions" },
];

export default function TeamMemberTable({
  onClickNew,
  data = [],
  loading,
  onClickEdit,
  onClickDelete,
}) {
  const [teamMembers, setTeamMembers] = useState(data);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  useEffect(() => {
    setTeamMembers(data);
  }, [data]);

  // Sorting handler
  const handleSort = (columnKey) => {
    if (orderBy === columnKey) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(columnKey);
      setOrder("asc");
    }
  };

  const sortedAndFilteredMembers = useMemo(() => {
    let filteredList = teamMembers.filter((member) =>
      Object.values(member).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // Sorting
    if (orderBy && orderBy !== "no") {
      filteredList = [...filteredList].sort((a, b) => {
        let aValue = a[orderBy];
        let bValue = b[orderBy];
        // For boolean columns, sort false before true
        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        // For string columns
        aValue = aValue ? aValue.toString().toLowerCase() : "";
        bValue = bValue ? bValue.toString().toLowerCase() : "";
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredList;
  }, [teamMembers, searchTerm, orderBy, order]);

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
                <TableCell key={column.key}>
                  {column.key === "no" ? (
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
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && paginatedMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <h1>Tidak Ada Data</h1>
                </TableCell>
              </TableRow>
            )}
            {paginatedMembers.map((row, idx) => (
              <TableRow key={row.id || idx} hover>
                <TableCell>{(page - 1) * rowsPerPage + idx + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <span dangerouslySetInnerHTML={{ __html: row.description }} />
                </TableCell>
                <TableCell>{row.is_email ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{row.is_autoassign ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{row.team_count}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleOpenMenu(e, row)}
                    aria-controls={anchorEl ? "team-member-actions" : undefined}
                    aria-haspopup="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Menu
          id="team-member-actions"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              if (typeof onClickEdit === "function") onClickEdit(activeRow);
              handleCloseMenu();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (typeof onClickDelete === "function") onClickDelete(activeRow);
              handleCloseMenu();
            }}
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
