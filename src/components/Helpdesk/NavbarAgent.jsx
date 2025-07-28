"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logoNavbar from "../../assets/logoNavbar.png";
import { FaBell, FaUser } from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function NavbarAgent({ onClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    "Notifikasi 1: Permintaan baru",
    "Notifikasi 2: Jadwal diperbarui",
    "Notifikasi 3: Akun berhasil dibuat",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex bg-white px-10 py-3 justify-between items-center relative z-20">
        <div className="flex items-center w-52 justify-between">
          <Image
            src={logoNavbar}
            alt="Logo"
            width={120}
            height={44}
            className="object-cover"
          />
          <HiOutlineMenuAlt2
            onClick={onClick}
            className="text-xl text-gray-600 cursor-pointer"
          />
        </div>

        <div className="flex gap-6 items-center relative">
          {/* Bell + dropdown */}
          <div className="relative" ref={notifRef}>
            <FaBell
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                <div className="p-4 font-semibold border-b">Notifikasi</div>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="p-4 text-sm text-gray-500">
                      Tidak ada notifikasi.
                    </li>
                  ) : (
                    notifications.map((notif, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {notif}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <FaUser className="text-xl text-gray-600" />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold">Pedro Gozales</h4>
            <p className="text-xs">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
