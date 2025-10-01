"use client";
import React, { useMemo, useState, useEffect } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function PrivilegeUserTable({
  onClickEdit,
  onClickDelete,
  data = [],
}) {
  const { privilege } = useAuth();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(
      data.length
        ? data.map((item, idx) => ({
            ...item,
            no: idx + 1, // for table numbering
          }))
        : []
    );
  }, [data]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
    setOpenMenuId(row.id);
  };

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
      setRoles((prev) => prev.filter((r) => r.id !== row.id));
    }
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
    setOpenMenuId(null);
  };

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return roles.filter((r) => r.name.toLowerCase().includes(q));
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
              {privilege.data.includes("user.privilege.update") ||
              privilege.data.includes("user.privilege.delete") ? (
                <TableCell sx={{ width: 80, textAlign: "left" }}>
                  Aksi
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ width: 60, textAlign: "left" }}>
                  {row.no}.
                </TableCell>
                <TableCell sx={{ width: "auto", textAlign: "left" }}>
                  <div className="font-semibold">{row.name}</div>
                  {row.description && (
                    <div className="text-xs text-gray-500">
                      {row.description}
                    </div>
                  )}
                </TableCell>
                {privilege.data.includes("user.privilege.update") ||
                privilege.data.includes("user.privilege.delete") ? (
                  <TableCell sx={{ width: 80, textAlign: "left" }}>
                    <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                      <RiMore2Fill />
                    </IconButton>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {privilege.data.includes("user.privilege.update") && (
            <MenuItem onClick={() => activeRow && handleEdit(activeRow)}>
              Edit
            </MenuItem>
          )}
          {privilege.data.includes("user.privilege.delete") && (
            <MenuItem
              onClick={() => activeRow && handleDelete(activeRow)}
              sx={{ color: "error.main" }}
            >
              Delete
            </MenuItem>
          )}
        </Menu>

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
