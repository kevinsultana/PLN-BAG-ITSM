import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8 w-screen h-screen justify-center items-center bg-slate-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-md border border-gray-200">
        <img src="/logoNavbar.png" alt="Logo" className="w-32 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-[#65C7D5]">
          Selamat Datang
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Silakan login untuk mengakses sistem ITSM PLN
        </p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Email</label>
            <input
              type="email"
              className="input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#65C7D5]"
              placeholder="user@company.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Password</label>
            <input
              type="password"
              className="input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#65C7D5]"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#65C7D5] hover:bg-[#4FB3C1] text-white font-semibold rounded-xl py-2 mt-2 shadow transition"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex gap-6">
        <button className="bg-cyan-400 cursor-pointer p-4 text-white rounded-xl shadow hover:bg-cyan-500 transition">
          <Link href="/beranda">Beranda side</Link>
        </button>
        <button className="bg-cyan-400 cursor-pointer p-4 text-white rounded-xl shadow hover:bg-cyan-500 transition">
          <Link href="/helpdesk">Helpdesk Side</Link>
        </button>
      </div>
    </div>
  );
}
