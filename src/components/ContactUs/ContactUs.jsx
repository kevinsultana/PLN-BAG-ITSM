"use client";
import React from "react";
import { FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

export default function ContactUs() {
  return (
    <div className="bg-slate-100 py-6 px-14 h-full">
      <div className="bg-white rounded-xl pb-6">
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-2xl font-bold">Hubungi Kami</h1>
          <p className="text-sm text-slate-500">
            Beranda / <span className="text-gray-700">Hubungi Kami</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
          {/* Kantor Pusat */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-md font-semibold text-sky-600 mb-1">
              kantor Pusat
            </h3>
            <h4 className="text-blue-900 font-semibold mb-3">
              PT. Pelayaran Bahtera Adhiguna
            </h4>

            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-start gap-2">
                <FiMapPin className="mt-1 text-sky-600" />
                Gedung Prudential Centre, Lantai 11 unit A B C D E, Kota
                Kasablanka Jl Casablanca Raya Kav.88, Jakarta Selatan 12870
              </p>
              <p className="flex items-start gap-2">
                <FiPhone className="mt-1 text-sky-600" />
                +62 216912547, 216912548, 216912549
                <br />
                +62-21 216904150, 6902726
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-sky-600" />
                pelba@bahteradhiguna.co.id
              </p>
              <p className="flex items-center gap-2">
                <FiGlobe className="text-sky-600" />
                www.bahteradhiguna.co.id
              </p>
            </div>
          </div>

          {/* Kantor Cabang */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-md font-semibold text-sky-600 mb-1">
              Kantor Cabang
            </h3>
            <h4 className="text-blue-900 font-semibold mb-3">
              PT. Pelayaran Bahtera Adhiguna
            </h4>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">Tanjung Jati</p>
                <p className="flex items-start gap-2">
                  <FiMapPin className="mt-1 text-sky-600" />
                  Jl. Raya Jepara Bangsri Km. 12, Desa Sekuro RT 23 RW 05 Kec.
                  Mlonggo, Kab. Jepara, 59452 - Indonesia.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Pangkalan Susu (Unit 3 & 4)
                </p>
                <p className="flex items-start gap-2">
                  <FiMapPin className="mt-1 text-sky-600" />
                  Dusun VI/Sei Dua, Desa Tanjung Pasir Kec. Pangkalan Susu, Kab.
                  Langkat, Sumatra Utara - Indonesia
                </p>
              </div>

              <p className="flex items-center gap-2">
                <FiPhone className="text-sky-600" />
                0291-7730660
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-sky-600" />
                bagtjb2019@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <FiGlobe className="text-sky-600" />
                www.bahteradhiguna.co.id
              </p>
            </div>
          </div>

          {/* Affiliasi */}
          <div className="bg-white border rounded-xl p-6 shadow-sm md:col-span-2">
            <h3 className="text-md font-semibold text-sky-600 mb-1">
              Affiliasi
            </h3>
            <h4 className="text-sky-700 font-semibold mb-3">
              PT. Adhi Guna Putera
            </h4>

            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-start gap-2">
                <FiMapPin className="mt-1 text-sky-600" />
                Jl. Kartini VII No.2 Jakarta Pusat 10750 - Indonesia
              </p>
              <p className="flex items-start gap-2">
                <FiPhone className="mt-1 text-sky-600" />
                +62-21 22685989 / 22686001
                <br />
                +62-21 22685669
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-sky-600" />
                adhiragpusat@yahoo.com
              </p>
              <p className="flex items-center gap-2">
                <FiGlobe className="text-sky-600" />
                www.adhigunaputera.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
