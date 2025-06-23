"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoNavbar from "../assets/logoNavbar.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function NavBar() {
  const pathname = usePathname();
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });

  const getLinkClassName = (path) => {
    return pathname === path ? "text-blue-500 font-bold" : "text-gray-700";
  };

  return (
    <div>
      <div className="flex bg-white px-14 py-6 justify-between items-center relative">
        <Image
          src={logoNavbar}
          alt="Logo"
          width="auto"
          className="w-32 h-11 object-cover"
        />
        <div>
          <ul className="flex gap-10 justify-center">
            <li>
              <Link href="/" className={getLinkClassName("/")}>
                Beranda
              </Link>
            </li>

            {/* Dropdown Helpdesk */}
            <li
              className="relative group"
              onMouseEnter={() => setIsHelpdeskOpen(true)}
              onMouseLeave={() => setIsHelpdeskOpen(false)}
            >
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setIsHelpdeskOpen(!isHelpdeskOpen)}
              >
                Helpdesk
                {isHelpdeskOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={`absolute top-6 ${
                  isHelpdeskOpen ? "block" : "hidden"
                } group-hover:block bg-white p-4 shadow-md z-10 min-w-[160px] rounded-xl`}
              >
                <ul>
                  <li className="py-2">
                    <Link
                      href="/create-ticket"
                      className={getLinkClassName("/create-ticket")}
                    >
                      Buat Tiket
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link
                      href="/list-ticket"
                      className={getLinkClassName("/list-ticket")}
                    >
                      Urutan Tiket
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link href="/formulir" className={getLinkClassName("/formulir")}>
                Formulir
              </Link>
            </li>
            <li>
              <Link href="/dokumen" className={getLinkClassName("/dokumen")}>
                Dokumen
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={getLinkClassName("/contact-us")}
              >
                Hubungi Kami
              </Link>
            </li>
            <li>
              <Link href="/faq" className={getLinkClassName("/faq")}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p>{formattedDate + " WIB"}</p>
        </div>
      </div>
    </div>
  );
}
