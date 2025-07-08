"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Pagination,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CancelIcon from "@mui/icons-material/Cancel";

const statusIcon = (status) => {
  switch (status) {
    case "Resolved":
      return <CheckCircleOutlineIcon className="text-green-500" />;
    case "In Progress":
      return <TimelapseIcon className="text-yellow-500" />;
    case "Waiting":
      return <HourglassTopIcon className="text-blue-500" />;
    case "Closed":
      return <CancelIcon className="text-gray-400" />;
    default:
      return null;
  }
};

// Dummy data
const initialTickets = [
  {
    no: 1,
    kode: "TK00001 - Reset Password",
    deskripsi: "Email reset password belum diterima",
    requester: "Jordi Amat",
    tanggal: "11/10/2025 - 11:58 WIB",
    status: "Resolved",
  },
  {
    no: 2,
    kode: "TK00002 - Penambahan Produk",
    deskripsi: "Tolong tambahkan produk A dengan ...",
    requester: "Dimas Rama",
    tanggal: "11/10/2025 - 11:58 WIB",
    status: "In Progress",
  },
  {
    no: 3,
    kode: "TK00003 - Pembuatan Akun Baru",
    deskripsi: "Mohon buatkan akun user atas nama ...",
    requester: "Niken Carla",
    tanggal: "11/10/2025 - 11:58 WIB",
    status: "Waiting",
  },
  {
    no: 4,
    kode: "TK00004 - Email Tender Tidak Muncul",
    deskripsi: "Email pada tender PT/00017/2025 ...",
    requester: "Doni Marco",
    tanggal: "11/10/2025 - 11:58 WIB",
    status: "Closed",
  },
  {
    no: 5,
    kode: "TK00005 - Vendor Bill Tidak Match",
    deskripsi: "Vendor bill dengan nomor VB/BAg/01 ...",
    requester: "Doni Marco",
    tanggal: "11/10/2025 - 11:58 WIB",
    status: "In Progress",
  },
  {
    no: 6,
    kode: "TK00005 - Login Error",
    deskripsi: "Tidak bisa login ke sistem",
    requester: "Ana Putri",
    tanggal: "12/10/2025 - 10:45 WIB",
    status: "Waiting",
  },
  {
    no: 7,
    kode: "TK00007 - Bug Laporan",
    deskripsi: "Laporan tidak bisa diunduh",
    requester: "Budi Setiawan",
    tanggal: "13/10/2025 - 08:22 WIB",
    status: "Resolved",
  },
  {
    no: 8,
    kode: "TK00008 - Koneksi Lambat",
    deskripsi: "Akses sangat lambat di pagi hari",
    requester: "Cici Andini",
    tanggal: "13/10/2025 - 09:30 WIB",
    status: "In Progress",
  },
  {
    no: 9,
    kode: "TK00009 - Tambah Role User",
    deskripsi: "Mohon tambah role manager",
    requester: "Eko Saputra",
    tanggal: "14/10/2025 - 14:12 WIB",
    status: "Closed",
  },
  {
    no: 10,
    kode: "TK00010 - Tambah Role User",
    deskripsi: "Mohon tambah role manager",
    requester: "Eko Saputra",
    tanggal: "14/10/2025 - 14:12 WIB",
    status: "Closed",
  },
];

export default function TicketTable() {
  const [tickets, setTickets] = React.useState(initialTickets);
  const [orderBy, setOrderBy] = React.useState("no");
  const [order, setOrder] = React.useState("asc");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTickets = React.useMemo(() => {
    return [...tickets].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [tickets, orderBy, order]);

  const paginatedTickets = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedTickets.slice(start, start + rowsPerPage);
  }, [sortedTickets, page]);

  return (
    <div className="p-4">
      <TableContainer component={Paper} className="rounded-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              {["kode", "deskripsi", "requester", "tanggal", "status"].map(
                (key) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : "asc"}
                      onClick={() => handleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTickets.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-200">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.kode}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.deskripsi}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.requester}
                </TableCell>
                <TableCell className="border border-gray-200">
                  {row.tanggal}
                </TableCell>
                <TableCell className="border border-gray-200">
                  <div className="flex items-center gap-2">
                    {statusIcon(row.status)}
                    <span>{row.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(tickets.length / rowsPerPage)}
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
              "& .MuiPaginationItem-ellipsis": {
                color: "#65C7D5",
              },
            }}
          />
        </div>
      </TableContainer>
    </div>
  );
}
