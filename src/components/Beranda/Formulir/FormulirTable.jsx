"use client";
import React from "react";

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
  },
  {
    id: 6,
    path: "serah-terima-laptop",
    name: "Serah Terima Laptop",
  },
  {
    id: 7,
    path: "formulir-permintaan-integrasi-aplikasi-baru",
    name: "Formulir Permintaan Integrasi Aplikasi Baru",
  },
];

export default function FormulirTable({ handleOpenForm }) {
  const handleOnClickForm = (item) => {
    handleOpenForm(item.path);
  };
  return (
    <div className="bg-slate-100 py-6 px-14 h-full space-y-6">
      <h1 className="text-2xl font-bold">Formulir</h1>
      <div className="bg-white rounded-xl p-4 space-y-4">
        <h1 className="text-lg">List Formulir</h1>

        <div className="px-5">
          <table className="table-fixed w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-12 px-4 py-3">No.</th>
                <th className="px-4 py-3">Formulir Akun Pengguna</th>
                <th className="w-32 px-4 py-3 text-center">Aksi</th>
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
                    <button
                      onClick={() => handleOnClickForm(item)}
                      className="bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                    >
                      Buka &rsaquo;
                    </button>
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
