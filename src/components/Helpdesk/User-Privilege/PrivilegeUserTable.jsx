"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
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
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";

const initialRoles = [
  { no: 1, roleName: "TAD" },
  { no: 2, roleName: "Staff" },
  { no: 3, roleName: "Manager" },
  { no: 4, roleName: "VP" },
  { no: 5, roleName: "Direktur" },
];

export default function PrivilegeUserTable({ onClickEdit, onClickDelete }) {
  const [roles, setRoles] = useState(initialRoles);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handleOpenMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

  const handleEdit = (row) => {
    if (onClickEdit) {
      onClickEdit(row);
    }
    setOpenMenuId(null);
  };
  const handleDelete = (row) => {
    if (onClickDelete) {
      onClickDelete(row);
    } else {
      setRoles((prev) => prev.filter((r) => r.no !== row.no));
      console.log("Delete role:", row);
    }
    setOpenMenuId(null);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpenMenuId(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return roles.filter((r) => r.roleName.toLowerCase().includes(q));
  }, [roles, searchTerm]);

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Privilege User</h2>
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
        <Table
          sx={{
            "& .MuiTableCell-root": {
              py: 1.25,
              px: 2,
            },
            "& thead .MuiTableCell-root": { py: 1.5, fontWeight: 600 },
            "& tbody .MuiTableCell-root": { py: 1.25 },
          }}
        >
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell sx={{ width: 60, textAlign: "left" }}>No.</TableCell>
              <TableCell sx={{ width: "auto", textAlign: "left" }}>
                Role Name
              </TableCell>
              <TableCell sx={{ width: 80, textAlign: "left" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row) => (
              <TableRow key={row.no} hover>
                <TableCell sx={{ width: 60, textAlign: "left" }}>
                  {row.no}.
                </TableCell>
                <TableCell sx={{ width: "auto", textAlign: "left" }}>
                  {row.roleName}
                </TableCell>
                <TableCell
                  sx={{ width: 80, textAlign: "left" }}
                  className="relative"
                  ref={menuRef}
                >
                  <IconButton onClick={() => handleOpenMenu(row.no)}>
                    <RiMore2Fill />
                  </IconButton>
                  {openMenuId === row.no && (
                    <div
                      ref={menuRef}
                      className="absolute right-14 top-10/10 -translate-y-1/2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                    >
                      <ul className="py-1">
                        <li
                          onClick={() => {
                            handleEdit(row);
                          }}
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
            <span className="font-medium">{totalPages}</span>
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
