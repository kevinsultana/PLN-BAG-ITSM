"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { ProxyUrl } from "@/api/BaseUrl";
import { privilegeRows } from "@/constant/privilege";

export default function EditPrivilegeUserPage() {
  const params = useParams();
  const router = useRouter();
  const [checkedPrivileges, setCheckedPrivileges] = useState([]);
  const allPrivilegeKeys = privilegeRows.flatMap((row) =>
    Object.values(row.keys)
  );

  const getColumnKeys = (colKey) =>
    privilegeRows.map((row) => row.keys[colKey]);

  const getRowKeys = (row) => Object.values(row.keys);

  const handleCheckAllColumn = (colKey) => {
    const colKeys = getColumnKeys(colKey);
    const allChecked = colKeys.every((key) =>
      (checkedPrivileges || []).includes(key)
    );
    if (allChecked) {
      setCheckedPrivileges((prev) =>
        (prev || []).filter((key) => !colKeys.includes(key))
      );
    } else {
      setCheckedPrivileges((prev) =>
        Array.from(new Set([...(prev || []), ...colKeys]))
      );
    }
  };

  const handleCheckAllRow = (row) => {
    const rowKeys = getRowKeys(row);
    const allChecked = rowKeys.every((key) =>
      (checkedPrivileges || []).includes(key)
    );
    if (allChecked) {
      setCheckedPrivileges((prev) =>
        (prev || []).filter((key) => !rowKeys.includes(key))
      );
    } else {
      setCheckedPrivileges((prev) =>
        Array.from(new Set([...(prev || []), ...rowKeys]))
      );
    }
  };
  const [roleName, setRoleName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCheck = (privKey) => {
    setCheckedPrivileges((prev) =>
      (prev || []).includes(privKey)
        ? (prev || []).filter((k) => k !== privKey)
        : [...(prev || []), privKey]
    );
  };

  const handleSave = () => {
    setSaving(true);
    toast.promise(
      ProxyUrl.put(`/role-permissions/${params.id}/batch`, checkedPrivileges),
      {
        loading: "Saving...",
        success: (res) => {
          setSaving(false);
          return "Hak akses Berhasil disimpan.";
        },
        error: (error) => {
          setSaving(false);
          console.log(error);
          return "Gagal menyimpan hak akses.";
        },
      }
    );
    router.back();
  };

  const getDataDetailRole = async (id) => {
    try {
      const res = await ProxyUrl.get("/role-permissions/" + id);
      setCheckedPrivileges(res.data.data.permissions || []);
      setRoleName(res.data.data.role_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDetailRole(params.id);
  }, [params.id]);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <div className="bg-slate-100 ">
          <div>
            <h1 className="text-2xl font-bold mb-6">User Privilege</h1>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold mb-4">
                Detail User Privilege ({roleName})
              </h2>
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
                        <TableCell sx={{ width: 80, textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={privilegeRows.every((row) =>
                              getRowKeys(row).every((key) =>
                                (checkedPrivileges || []).includes(key)
                              )
                            )}
                            onChange={() => {
                              const allChecked = privilegeRows.every((row) =>
                                getRowKeys(row).every((key) =>
                                  (checkedPrivileges || []).includes(key)
                                )
                              );
                              if (allChecked) {
                                setCheckedPrivileges([]);
                              } else {
                                setCheckedPrivileges(allPrivilegeKeys);
                              }
                            }}
                            className="w-5 h-5 accent-green-300 border-black"
                          />
                          <div className="font-semibold text-xs mt-1">
                            Check All
                          </div>
                        </TableCell>
                        <TableCell sx={{ width: 60, textAlign: "left" }}>
                          No.
                        </TableCell>
                        <TableCell sx={{ width: "auto", textAlign: "left" }}>
                          Role Access
                        </TableCell>
                        {["create", "read", "update", "delete"].map(
                          (colKey) => (
                            <TableCell
                              sx={{ width: 100, textAlign: "center" }}
                              key={colKey}
                            >
                              <input
                                type="checkbox"
                                checked={getColumnKeys(colKey).every((key) =>
                                  (checkedPrivileges || []).includes(key)
                                )}
                                onChange={() => handleCheckAllColumn(colKey)}
                                className="w-5 h-5 accent-green-300"
                              />
                              <div className="mt-1 font-semibold text-xs">
                                {colKey.charAt(0).toUpperCase() +
                                  colKey.slice(1)}
                              </div>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {privilegeRows.map((row) => (
                        <TableRow key={row.no} hover>
                          <TableCell sx={{ width: 80, textAlign: "center" }}>
                            <input
                              type="checkbox"
                              checked={getRowKeys(row).every((key) =>
                                (checkedPrivileges || []).includes(key)
                              )}
                              onChange={() => handleCheckAllRow(row)}
                              className="w-5 h-5 accent-green-300"
                            />
                          </TableCell>
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
                                checked={(checkedPrivileges || []).includes(
                                  row.keys[key]
                                )}
                                onChange={() => handleCheck(row.keys[key])}
                                className={
                                  (checkedPrivileges || []).includes(
                                    row.keys[key]
                                  )
                                    ? "accent-green-300 w-5 h-5 border-2 border-green-300 focus:ring-2 focus:ring-green-300"
                                    : "w-5 h-5 border-2 border-gray-300 focus:ring-2 focus:ring-gray-300"
                                }
                                style={{
                                  boxShadow: (checkedPrivileges || []).includes(
                                    row.keys[key]
                                  )
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
