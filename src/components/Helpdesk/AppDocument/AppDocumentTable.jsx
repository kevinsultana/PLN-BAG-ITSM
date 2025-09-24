"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
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
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiSearchLine, RiMore2Fill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

const initialAppDocuments = [];

const columns = [
  { label: "No.", key: "no" },
  { label: "Name", key: "Title" },
  { label: "Aplikasi", key: "ApplicationID" },
  { label: "File", key: "FileURL" },
];

export default function AppDocumentTable({
  onClickNewDocApps,
  data = [],
  onClickEdit,
  onClickDelete,
  loading,
}) {
  const { privilege } = useAuth();

  const mappedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return initialAppDocuments;
    return data.map((item, idx) => ({
      no: idx + 1,
      ...item,
    }));
  }, [data]);

  const [appDocuments, setAppDocuments] = useState(mappedData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [orderBy, setOrderBy] = useState("no");
  const [order, setOrder] = useState("asc");
  const menuRef = useRef(null);

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
    if (onClickEdit) onClickEdit(row);
    handleCloseMenu();
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
    handleCloseMenu();
  };

  const confirmDelete = () => {
    if (onClickDelete) onClickDelete(selectedRow);
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    setAppDocuments(mappedData);
  }, [mappedData]);

  const handleOpenMenuWithEvent = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
    setOpenMenuId(row.no || row.ID || row.id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
    setOpenMenuId(null);
  };

  const sortedAndFilteredDocuments = useMemo(() => {
    let filteredList = appDocuments.filter((doc) =>
      Object.values(doc).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (orderBy && columns.some((col) => col.key === orderBy)) {
      filteredList = [...filteredList].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredList;
  }, [appDocuments, searchTerm, orderBy, order]);

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAndFilteredDocuments.slice(start, start + rowsPerPage);
  }, [sortedAndFilteredDocuments, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredDocuments.length / rowsPerPage);

  return (
    <div className="p-6 mt-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Dokumen Aplikasi</h2>
        <div
          className={`flex ${
            privilege.data.includes("document.application.create")
              ? "justify-between"
              : "justify-end"
          } items-center gap-4`}
        >
          {privilege.data.includes("document.application.create") && (
            <button
              onClick={onClickNewDocApps}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
            >
              <FaPlus />
              <span>New</span>
            </button>
          )}
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
                    <span
                      className="cursor-pointer select-none"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      {orderBy === column.key
                        ? order === "asc"
                          ? " ▲"
                          : " ▼"
                        : null}
                    </span>
                  )}
                </TableCell>
              ))}
              {privilege.data.includes("document.application.update") ||
              privilege.data.includes("document.application.delete") ? (
                <TableCell>Aksi</TableCell>
              ) : null}
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
              paginatedDocuments.map((row) => (
                <TableRow key={row.ID || row.no} hover>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {row.application_name ? row.application_name : "-"}
                  </TableCell>
                  <TableCell>
                    {row.attachments ? (
                      <a
                        href={row.attachments[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#65C7D5] underline"
                      >
                        {row.attachments[0].name.length <= 20
                          ? row.attachments[0].name
                          : row.attachments[0].name.substring(0, 20) + "..."}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  {privilege.data.includes("document.application.update") ||
                  privilege.data.includes("document.application.delete") ? (
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleOpenMenuWithEvent(e, row)}
                      >
                        <RiMore2Fill />
                      </IconButton>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus dokumen <b>{selectedRow?.Title}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
            Batal
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
