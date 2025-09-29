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

const privilegeRows = [
  {
    no: 1,
    access: "Dokumen",
    keys: {
      create: "user.doc.create",
      read: "user.doc.read",
      update: "user.doc.update",
      delete: "user.doc.delete",
    },
  },
  {
    no: 2,
    access: "Tiket",
    keys: {
      create: "user.ticket.create",
      read: "user.ticket.read",
      update: "user.ticket.update",
      delete: "user.ticket.delete",
    },
  },
  {
    no: 3,
    access: "CR Approval Beranda",
    keys: {
      create: "cr.approval.beranda.create",
      read: "cr.approval.beranda.read",
      update: "cr.approval.beranda.update",
      delete: "cr.approval.beranda.delete",
    },
  },
  {
    no: 4,
    access: "CR Approval Helpdesk",
    keys: {
      create: "cr.approval.helpdesk.create",
      read: "cr.approval.helpdesk.read",
      update: "cr.approval.helpdesk.update",
      delete: "cr.approval.helpdesk.delete",
    },
  },
  {
    no: 5,
    access: "Helpdesk",
    keys: {
      create: "helpdesk.create",
      read: "helpdesk.read",
      update: "helpdesk.update",
      delete: "helpdesk.delete",
    },
  },
  {
    no: 6,
    access: "Tiket => Tiket Saya",
    keys: {
      create: "ticket.my.create",
      read: "ticket.my.read",
      update: "ticket.my.update",
      delete: "ticket.my.delete",
    },
  },
  {
    no: 7,
    access: "Tiket => Semua Tiket",
    keys: {
      create: "ticket.all.create",
      read: "ticket.all.read",
      update: "ticket.all.update",
      delete: "ticket.all.delete",
    },
  },
  {
    no: 8,
    access: "Reporting => Tiket Analisis",
    keys: {
      create: "reporting.analysis.create",
      read: "reporting.analysis.read",
      update: "reporting.analysis.update",
      delete: "reporting.analysis.delete",
    },
  },
  {
    no: 9,
    access: "Reporting => SLA Analysis",
    keys: {
      create: "reporting.sla.create",
      read: "reporting.sla.read",
      update: "reporting.sla.update",
      delete: "reporting.sla.delete",
    },
  },
  {
    no: 10,
    access: "Reporting => CR Tracking",
    keys: {
      create: "reporting.cr.create",
      read: "reporting.cr.read",
      update: "reporting.cr.update",
      delete: "reporting.cr.delete",
    },
  },
  {
    no: 11,
    access: "Dokumen Aplikasi",
    keys: {
      create: "document.application.create",
      read: "document.application.read",
      update: "document.application.update",
      delete: "document.application.delete",
    },
  },
  {
    no: 12,
    access: "User Privilege",
    keys: {
      create: "user.privilege.create",
      read: "user.privilege.read",
      update: "user.privilege.update",
      delete: "user.privilege.delete",
    },
  },
  {
    no: 13,
    access: "BPO",
    keys: {
      create: "bpo.create",
      read: "bpo.read",
      update: "bpo.update",
      delete: "bpo.delete",
    },
  },
  {
    no: 14,
    access: "Konfigurasi Team Member",
    keys: {
      create: "config.team.member.create",
      read: "config.team.member.read",
      update: "config.team.member.update",
      delete: "config.team.member.delete",
    },
  },
  {
    no: 15,
    access: "Konfigurasi Agent Management",
    keys: {
      create: "config.teams.create",
      read: "config.teams.read",
      update: "config.teams.update",
      delete: "config.teams.delete",
    },
  },
  {
    no: 16,
    access: "Konfigurasi Status Tiket",
    keys: {
      create: "config.ticket.status.create",
      read: "config.ticket.status.read",
      update: "config.ticket.status.update",
      delete: "config.ticket.status.delete",
    },
  },
  {
    no: 17,
    access: "Konfigurasi SLA Policy",
    keys: {
      create: "config.sla.create",
      read: "config.sla.read",
      update: "config.sla.update",
      delete: "config.sla.delete",
    },
  },
  {
    no: 18,
    access: "Konfigurasi Tipe Tiket",
    keys: {
      create: "config.ticket.type.create",
      read: "config.ticket.type.read",
      update: "config.ticket.type.update",
      delete: "config.ticket.type.delete",
    },
  },
  {
    no: 19,
    access: "Konfigurasi Aplikasi",
    keys: {
      create: "config.application.create",
      read: "config.application.read",
      update: "config.application.update",
      delete: "config.application.delete",
    },
  },
  {
    no: 20,
    access: "Konfigurasi Helpdesk Information",
    keys: {
      create: "config.helpdesk.info.create",
      read: "config.helpdesk.info.read",
      update: "config.helpdesk.info.update",
      delete: "config.helpdesk.info.delete",
    },
  },
];

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
          return "Privileges saved successfully!";
        },
        error: (error) => {
          setSaving(false);
          console.log(error);
          return "Failed to save privileges.";
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
