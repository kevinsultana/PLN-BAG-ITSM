"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const formList = [
  {
    id: 1,
    path: "uaa-01",
    name: "[UAA-01] Formulir Permintaan Pembuatan User Account Aplikasi",
  },
  {
    id: 2,
    path: "uaa-02",
    name: "[UAA-02] Formulir Permintaan Reset Akun User Aplikasi",
  },
  {
    id: 3,
    path: "uaa-03",
    name: "[UAA-03] Formulir Permintaan Perubahan Otorisasi Aplikasi",
  },
  {
    id: 4,
    path: "uaa-04",
    name: "[UAA-04] Formulir Permintaan Penghapusan User Account Aplikasi",
  },
  {
    id: 5,
    path: "pakta-integritas",
    name: "Pakta Integritas",
    action: "Download",
    file: "/docs/Pakta-Integritas.docx",
  },
  {
    id: 6,
    path: "serah-terima-laptop",
    name: "Serah Terima Laptop",
    action: "Download",
    file: "/docs/Serah-Terima-Laptop.docx",
  },
];

export default function FormulirTable({ handleOpenForm }) {
  const handleOnClickForm = (item) => {
    // item tanpa file = buka form biasa
    if (!item.file) {
      handleOpenForm(item.path);
    }
  };

  return (
    <div className="bg-slate-100 h-full space-y-6">
      <div className="bg-white rounded-xl p-4 space-y-4">
        <h1 className="text-lg">List Formulir</h1>

        <div className="px-5">
          <table className="table-fixed w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-12 px-4 py-3">No.</th>
                <th className="px-4 py-3">Formulir Akun Pengguna</th>
                <th className="w-40 px-4 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {formList.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}.</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center">
                    {item.file ? (
                      <a
                        href={item.file}
                        download
                        className="flex items-center gap-2 w-fit bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                      >
                        {item.action || "Download"}
                        <FaChevronRight className="text-xs" />
                      </a>
                    ) : (
                      <button
                        onClick={() => handleOnClickForm(item)}
                        className="flex items-center gap-2 bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                      >
                        {item.action ? item.action : "Buka"}
                        <FaChevronRight className="text-xs" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
