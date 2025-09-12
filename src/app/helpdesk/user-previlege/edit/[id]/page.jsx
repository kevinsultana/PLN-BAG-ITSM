"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const initialPrivileges = [
  {
    no: 1,
    access: "Dokumen",
    create: false,
    read: false,
    update: false,
    delete: true,
  },
  {
    no: 2,
    access: "Tiket",
    create: true,
    read: false,
    update: true,
    delete: true,
  },
];

export default function EditPrivilegeUserPage() {
  const params = useParams();
  const router = useRouter();
  const [privileges, setPrivileges] = useState(initialPrivileges);
  const [saving, setSaving] = useState(false);

  const handleCheck = (rowIdx, key) => {
    setPrivileges((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, [key]: !row[key] } : row
      )
    );
  };

  const handleSave = () => {
    setSaving(true);
    // Simulasi update, bisa diganti dengan API call
    setTimeout(() => {
      setSaving(false);
      console.log("Updated privilege for id:", params.id, privileges);
      // router.back(); // jika ingin kembali setelah save
    }, 800);
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <div className="bg-slate-100 ">
          <div>
            <h1 className="text-2xl font-bold mb-6">Privilege User</h1>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold mb-4">Detail Privilege User</h2>
              <div className="overflow-x-auto">
                <TableContainer
                  component={Paper}
                  className="rounded-2xl shadow-sm border border-gray-100"
                >
                  <Table
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 1.5,
                        px: 2,
                      },
                      "& thead .MuiTableCell-root": { py: 2, fontWeight: 600 },
                      "& tbody .MuiTableCell-root": { py: 1.5 },
                    }}
                  >
                    <TableHead>
                      <TableRow className="bg-gray-50">
                        <TableCell sx={{ width: 60, textAlign: "left" }}>
                          No.
                        </TableCell>
                        <TableCell sx={{ width: "auto", textAlign: "left" }}>
                          Role Access
                        </TableCell>
                        <TableCell sx={{ width: 100, textAlign: "center" }}>
                          Create
                        </TableCell>
                        <TableCell sx={{ width: 100, textAlign: "center" }}>
                          Read
                        </TableCell>
                        <TableCell sx={{ width: 100, textAlign: "center" }}>
                          Update
                        </TableCell>
                        <TableCell sx={{ width: 100, textAlign: "center" }}>
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {privileges.map((row, idx) => (
                        <TableRow key={row.no} hover>
                          <TableCell sx={{ width: 60, textAlign: "left" }}>
                            {row.no}.
                          </TableCell>
                          <TableCell sx={{ width: "auto", textAlign: "left" }}>
                            {row.access}
                          </TableCell>
                          {["create", "read", "update", "delete"].map((key) => (
                            <TableCell
                              sx={{ width: 100, textAlign: "center" }}
                              key={key}
                            >
                              <input
                                type="checkbox"
                                checked={row[key]}
                                onChange={() => handleCheck(idx, key)}
                                className={
                                  row[key]
                                    ? "accent-green-500 w-5 h-5 border-2 border-green-500 focus:ring-2 focus:ring-green-400"
                                    : "w-5 h-5 border-2 border-gray-300 focus:ring-2 focus:ring-gray-300"
                                }
                                style={{
                                  boxShadow: row[key]
                                    ? "0 0 0 2px #22c55e"
                                    : "none",
                                }}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  className="px-7 py-2 rounded-xl font-semibold text-gray-700 bg-[#F1F3F6] border-none shadow-sm hover:bg-[#E2E8F0]"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`px-7 py-2 rounded-xl font-bold text-white border-none shadow-sm transition-all duration-150 ${
                    saving ? "bg-gray-400" : "bg-[#65C7D5] hover:bg-[#4EB6C7]"
                  }`}
                  disabled={saving}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </HelpdeskLayout>
    </div>
  );
}
