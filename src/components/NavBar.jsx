"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoNavbar from "../assets/logoNavbar.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaBurger,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function NavBar({ onClick }) {
  const pathname = usePathname();
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false);

  const getLinkClassName = (path) => {
    return pathname === path ? "text-blue-500 font-bold" : "text-gray-700";
  };

  return (
    <div>
      <div className="flex bg-white px-10 py-3 justify-between items-center relative">
        <div className="flex items-center w-52 justify-between">
          <Image
            src={logoNavbar}
            alt="Logo"
            width="auto"
            className="w-32 h-11 object-cover"
          />
          <HiOutlineMenuAlt2
            onClick={onClick}
            className="text-xl text-gray-600"
          />
        </div>

        <div className="flex gap-6 items-center">
          <FaBell className="text-xl text-gray-600" />
          <FaUser className="text-xl text-gray-600" />
          <div className="flex flex-col ">
            <h4 className="text-sm font-semibold">Pedro Gozales</h4>
            <p className="text-xs">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
