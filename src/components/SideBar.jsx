"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  RiHome4Line,
  RiFileEditLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { LuTicket, LuClipboardList } from "react-icons/lu";
import { BiPhoneCall } from "react-icons/bi";

export default function SideBar({ show }) {
  const pathname = usePathname();

  const getLinkClassName = (path) => {
    return pathname === path
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
            <Link href="/" className={getLinkClassName("/")}>
              <RiHome4Line />
              Beranda
            </Link>
          </li>

          <li>
            <Link
              href="/helpdesk"
              className={getLinkClassName("/helpdesk" && "/helpdesk/new")}
            >
              <LuTicket />
              Helpdesk
            </Link>
          </li>

          <li>
            <Link href="/formulir" className={getLinkClassName("/formulir")}>
              <RiFileEditLine />
              Formulir
            </Link>
          </li>
          <li>
            <Link href="/dokumen" className={getLinkClassName("/dokumen")}>
              <LuClipboardList />
              Dokumen
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className={getLinkClassName("/contact-us")}
            >
              <BiPhoneCall />
              Hubungi Kami
            </Link>
          </li>
          <li>
            <Link href="/faq" className={getLinkClassName("/faq")}>
              <RiQuestionAnswerLine />
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
