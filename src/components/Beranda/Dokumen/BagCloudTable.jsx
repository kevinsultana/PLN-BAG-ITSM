import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

export default function BagCloudTable({ data, loading = false }) {
  // Expecting data.attachments to be an array of attachment objects
  const attachments = data?.attachments || [];

  return (
    <div className="bg-slate-100 space-y-6">
      <div className="bg-white rounded-xl p-4 space-y-4">
        <h1 className="text-lg font-semibold text-gray-800">
          List Dokumen {data?.application_name || ""}
        </h1>

        <TableContainer
          component={Paper}
          className="rounded-xl shadow-sm border border-gray-200"
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell sx={{ width: "80px", fontWeight: "bold" }}>
                  No.
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nama Dokumen</TableCell>
                <TableCell
                  sx={{
                    width: "150px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <div className="flex flex-col items-center gap-2">
                      <CircularProgress size={40} sx={{ color: "#65C7D5" }} />
                      <span className="text-gray-600 text-sm">
                        Memuat dokumen...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : attachments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">Tidak ada dokumen</p>
                      <p className="text-sm">Belum ada dokumen yang tersedia</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                attachments.map((item, index) => (
                  <TableRow
                    key={item.id || index}
                    hover
                    className="hover:bg-gray-50"
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{index + 1}.</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Lihat Dokumen">
                        <IconButton
                          component="a"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          sx={{
                            color: "#2563eb",
                            "&:hover": {
                              color: "#1d4ed8",
                              backgroundColor: "#eff6ff",
                            },
                          }}
                        >
                          <HiOutlineDocumentSearch className="text-xl" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
