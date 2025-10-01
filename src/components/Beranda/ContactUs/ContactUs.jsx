"use client";
import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaHeadset,
  FaTicketAlt,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactUs({ data }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Hubungi Helpdesk</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Jam Operasional */}
        <div className="mb-8 border p-4 rounded-xl">
          <div className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <FaClock className="mr-3 text-blue-500" />
            Jam Operasional
          </div>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-500" />
              <span>Senin – Kamis: {data.hours_mon_thu} WIB</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-500" />
              <span>Jumat: {data.hours_fri} WIB</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-red-500" />
              <span className="font-medium text-red-600">
                Hari Libur & Libur Nasional: Tidak Tersedia Layanan
              </span>
            </div>
          </div>
        </div>

        {/* Saluran Layanan Helpdesk */}
        <div className="mb-8 border p-4 rounded-xl">
          <div className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <FaHeadset className="mr-3 text-green-500" />
            Saluran Layanan Helpdesk
          </div>
          <p className="text-gray-700 mb-4">
            Pengguna dapat menghubungi tim Helpdesk melalui:
          </p>

          {/* Melapor melalui Email */}
          <div className="mb-6">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center text-blue-600 hover:underline mb-2"
            >
              <FaEnvelope className="mr-2" />
              <span>{data.email}</span>
            </a>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold text-gray-800 mb-2">
                Jika Melapor melalui Email:
              </h4>
              <p className="text-gray-700">
                Gunakan format subjek email seperti berikut:
              </p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-800">
                [Nama Aplikasi] – [Nama Divisi] – [Subjek Tiket / Ringkasan
                Gangguan]
              </p>
            </div>
          </div>

          {/* Melapor melalui Portal Tiket */}
          <div className="mb-6">
            <div className="flex items-center text-blue-600 mb-2">
              <FaTicketAlt className="mr-2" />
              <span>Jika Melapor melalui Portal Tiket:</span>
            </div>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>Akses menu Tiket, lalu klik tombol New</li>
              <li>Isi kebutuhan yang diperlukan dalam form</li>
              <li>Klik Submit untuk mengirimkan tiket</li>
              <li>
                Tunggu update status dari tim Helpdesk → Mohon memberikan
                feedback jika diminta agar tiket dapat diselesaikan dengan baik
              </li>
            </ol>
          </div>

          {/* Kontak Telepon */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/${data.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-600 hover:underline"
            >
              <FaWhatsapp className="mr-2 text-lg" />
              <span>+{data.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
