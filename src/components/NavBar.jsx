"use client";
import React from "react";
import Image from "next/image";
import logoNavbar from "../assets/logoNavbar.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

export default function NavBar() {
  const router = useRouter(); // Initialize router

  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });

  // Helper function to check if the current page matches the link
  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "text-blue-500 font-bold" // Apply a style for active page
      : "text-gray-700"; // Default style for other pages
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex bg-white px-14 py-6 justify-between items-center">
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
            <li>
              <Link href="/helpdesk" className={getLinkClassName("/helpdesk")}>
                Helpdesk
                <span>
                  <FaChevronDown />
                </span>
              </Link>
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

        {/* Optionally, display the current date */}
        <div>
          <p>{formattedDate + " WIB"}</p>
        </div>
      </div>
    </div>
  );
}
