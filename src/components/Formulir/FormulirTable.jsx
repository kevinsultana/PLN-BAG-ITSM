"use client";
import React from "react";

const formList = [
  {
    id: 1,
    name: "[UAA-01] Formulir Permintaan Pembuatan User Account Aplikasi",
  },
  {
    id: 2,
    name: "[UAA-02] Formulir Permintaan Reset Akun User Aplikasi",
  },
  {
    id: 3,
    name: "[UAA-03] Formulir Permintaan Perubahan Otorisasi Aplikasi",
  },
  {
    id: 4,
    name: "[UAA-04] Formulir Permintaan Penghapusan User Account Aplikasi",
  },
  {
    id: 5,
    name: "Pakta Integritas",
  },
  {
    id: 6,
    name: "Serah Terima Laptop",
  },
  {
    id: 7,
    name: "Formulir Permintaan Integrasi Aplikasi Baru",
  },
];

export default function FormulirTable() {
  return (
    <div className="bg-slate-100 py-6 px-14 h-full ">
      <div className="bg-white rounded-xl pb-6">
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-2xl font-bold">Formulir</h1>
          <p className="text-sm text-slate-500">
            Beranda / <span className="text-gray-700">Form List</span>
          </p>
        </div>

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
                    <button className="bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition">
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
