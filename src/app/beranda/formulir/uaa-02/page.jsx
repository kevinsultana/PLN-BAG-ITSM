"use client";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col py-6 px-14 h-auto">
          <h1 className="text-2xl font-bold mb-4">Formulir</h1>
          <div className="bg-white rounded-xl p-4">
            <form className="bg-white rounded-xl shadow p-6 space-y-6 text-sm text-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Kode:</p>
                  <p className="font-semibold">UAA-02</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">FORMULIR PERMINTAAN</p>
                  <p className="text-xs mt-1">RESET PASSWORD APLIKASI</p>
                </div>
                <Image
                  src="/logoNavbar.png"
                  alt="logo"
                  width={127}
                  height={44}
                  className="w-28 object-contain"
                />
              </div>

              <p className="text-xs text-center">
                (Formulir ini diisi oleh User Aplikasi / calon User Aplikasi dan
                perlu disetujui oleh supervisor atau manager yang bersangkutan
                atau Business Process Owner sebelum diberikan kepada Service
                Desk / Help Desk)
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Nama Aplikasi" required full />
                <Input label="Lokasi" required />
                <Input label="Nomor Induk Pegawai" required />
                <Input label="Nama Lengkap" required />
                <Input label="Email Korporat" placeholder="Company@gmail.com" />
                <Input label="Jabatan" required />
                <Input label="Phone/Ext/HP" required adminOnly />
                <Input label="Unit/Bidang/Bagian" />
                <Input label="User Account" required adminOnly />
              </div>

              <p className="text-xs text-gray-600">
                User Account akan dinonaktifkan jika tidak digunakan selama 3
                bulan, mutasi, pensiun atau permintaan dari manager terkait
              </p>

              <div>
                <Label text="Alasan Reset Password Aplikasi" required />
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  rows={3}
                />
              </div>

              <div className="border rounded p-4">
                <Label text="Konfirmasi" />
                <table className="w-full text-sm mt-2">
                  <thead>
                    <tr className="text-left border-b">
                      <th> </th>
                      <th>Nama</th>
                      <th>Tanda Tangan</th>
                      <th>Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dimintai Oleh *</td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input type="date" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">
                        Disetujui oleh Supervisor / Manager / PH Manager / BPO *
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input type="date" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  * : Harus diisi oleh User, jika tidak diisi maka permintaan
                  tidak akan diproses
                </p>
                <p>** : Diisi oleh User Admin</p>
              </div>

              <button
                type="submit"
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

function Input({
  label,
  required,
  adminOnly,
  full,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      {label && (
        <label className="block text-xs font-semibold mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {adminOnly && <span className="text-red-500 ml-1">**</span>}
        </label>
      )}
      <input
        type={type}
        className="w-full border border-gray-300 rounded p-2 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function Label({ text, required }) {
  return (
    <label className="block text-xs font-semibold mb-1">
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
