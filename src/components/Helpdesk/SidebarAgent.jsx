"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  RiHome4Line,
  RiFileEditLine,
  RiQuestionAnswerLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFileList2Line,
  RiUser3Line,
  RiBuildingLine,
  RiSettings3Line,
} from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { BiPhoneCall } from "react-icons/bi";

export default function SidebarAgent({ show }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const getLinkClassName = (paths) => {
    const isActive = Array.isArray(paths)
      ? paths.some((p) =>
          p.includes("[")
            ? pathname.startsWith(p.split("/[")[0])
            : pathname === p
        )
      : paths.includes("[")
      ? pathname.startsWith(paths.split("/[")[0])
      : pathname === paths;
    return isActive
      ? "text-[#65C7D5] font-bold flex items-center gap-2"
      : "text-gray-700 flex items-center gap-2";
  };

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <div
      className={`w-1/6 bg-white transition-all duration-300 ease-in-out relative ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="ml-8 my-3">
        <ul className="flex flex-col gap-3">
          <li>
            <Link href="/helpdesk" className={getLinkClassName(["/helpdesk"])}>
              <RiHome4Line />
              Helpdesk
            </Link>
          </li>

          {/* Tiket Dropdown */}
          <li>
            <div
              className={`flex items-center justify-between cursor-pointer ${
                pathname.startsWith("/helpdesk/tiket")
                  ? "text-[#65C7D5] font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => toggleDropdown("tiket")}
            >
              <div className="flex items-center gap-2">
                <RiFileEditLine />
                Tiket
              </div>
              {openDropdown === "tiket" ? (
                <RiArrowUpSLine className="mr-4" />
              ) : (
                <RiArrowDownSLine className="mr-4" />
              )}
            </div>
            {/* Animasi untuk submenu */}
            <ul
              className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openDropdown === "tiket"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0" // max-h-96 adalah nilai arbitrer, sesuaikan jika perlu
              }`}
            >
              <li>
                <Link
                  href="/helpdesk/tiket/my-ticket"
                  className={getLinkClassName("/helpdesk/tiket/my-ticket")}
                >
                  Tiket Saya
                </Link>
              </li>
              <li>
                <Link
                  href="/helpdesk/tiket/all-ticket"
                  className={getLinkClassName("/helpdesk/tiket/all-ticket")}
                >
                  Semua Tiket
                </Link>
              </li>
            </ul>
          </li>

          {/* Reporting Dropdown */}
          <li>
            <div
              className={`flex items-center justify-between cursor-pointer ${
                openDropdown === "reporting" ||
                pathname.startsWith("/reporting")
                  ? "text-gray-700"
                  : "text-gray-700"
              }`}
              onClick={() => toggleDropdown("reporting")}
            >
              <div className="flex items-center gap-2">
                <RiFileList2Line />
                Reporting
              </div>
              {openDropdown === "reporting" ? (
                <RiArrowUpSLine className="mr-4" />
              ) : (
                <RiArrowDownSLine className="mr-4" />
              )}
            </div>
            <ul
              className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openDropdown === "reporting"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href="/reporting/data-a"
                  className={getLinkClassName("/reporting/data-a")}
                >
                  Tiket Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/reporting/data-b"
                  className={getLinkClassName("/reporting/data-b")}
                >
                  SLA Status Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/reporting/data-b"
                  className={getLinkClassName("/reporting/data-b")}
                >
                  CR Tracking
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href="/beranda/dokumen"
              className={getLinkClassName("/beranda/dokumen")}
            >
              <LuClipboardList />
              Dokumen aplikasi
            </Link>
          </li>

          <li>
            <Link
              href="/beranda/dokumen"
              className={getLinkClassName("/beranda/dokumen")}
            >
              <RiUser3Line />
              User
            </Link>
          </li>

          <li>
            <Link
              href="/beranda/dokumen"
              className={getLinkClassName("/beranda/dokumen")}
            >
              <RiBuildingLine />
              BPO
            </Link>
          </li>

          {/* Konfigurasi Dropdown */}
          <li>
            <div
              className={`flex items-center justify-between cursor-pointer ${
                openDropdown === "konfigurasi" ||
                pathname.startsWith("/konfigurasi")
                  ? "text-gray-700"
                  : "text-gray-700"
              }`}
              onClick={() => toggleDropdown("konfigurasi")}
            >
              <div className="flex items-center gap-2">
                <RiSettings3Line />
                Konfigurasi
              </div>
              {openDropdown === "konfigurasi" ? (
                <RiArrowUpSLine className="mr-4" />
              ) : (
                <RiArrowDownSLine className="mr-4" />
              )}
            </div>
            <ul
              className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openDropdown === "konfigurasi"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Team Member
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Status Tiket
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  SLA Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Tipe Tiket
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Aplikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Feature Aplikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurasi/umum"
                  className={getLinkClassName("/konfigurasi/umum")}
                >
                  Helpdesk Info
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
