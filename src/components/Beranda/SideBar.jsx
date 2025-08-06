"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  RiHome4Line,
  RiFileEditLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { BiPhoneCall } from "react-icons/bi";

export default function SideBar({ show }) {
  const pathname = usePathname();

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

  return (
    <div
      className={`w-1/6 bg-white transition-all duration-300 ease-in-out relative ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="ml-8 my-3">
        <ul className="flex flex-col gap-6">
          <li>
            <Link
              href="/beranda"
              className={getLinkClassName([
                "/beranda",
                "/beranda/new-ticket",
                "/beranda/ticket-details/[no]",
              ])}
            >
              <RiHome4Line />
              Beranda
            </Link>
          </li>

          <li>
            <Link
              href="/beranda/formulir"
              className={getLinkClassName([
                "/beranda/formulir",
                "/beranda/formulir/[no]",
              ])}
            >
              <RiFileEditLine />
              Formulir
            </Link>
          </li>
          <li>
            <Link
              href="/beranda/dokumen"
              className={getLinkClassName("/beranda/dokumen")}
            >
              <LuClipboardList />
              Dokumen
            </Link>
          </li>
          <li>
            <Link
              href="/beranda/contact-us"
              className={getLinkClassName("/beranda/contact-us")}
            >
              <BiPhoneCall />
              Hubungi Helpdesk
            </Link>
          </li>
          <li>
            <Link
              href="/beranda/faq"
              className={getLinkClassName("/beranda/faq")}
            >
              <RiQuestionAnswerLine />
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
