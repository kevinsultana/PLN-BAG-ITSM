"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaBell, FaUser } from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgArrowsExpandRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext"; // Ganti dengan import useAuth

export default function NavBar({ onClick }) {
  const { user, loading, login, logout } = useAuth(); // Gunakan useAuth
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    {
      id: "001",
      ticket_id: "SCRQ – ERP MM – 29/07/2025",
      title: "Permintaan Akses User",
      message:
        "Tiket 'Permintaan Akses User VP Niaga' telah berhasil dibuat dengan ID SCRQ – ERP MM – 29/07/2025 - 001. Klik detail untuk melihat progres.",
      status: "unread",
      datetime: "2025-07-29 09:00:00",
    },
    {
      id: "2",
      ticket_id: " SCRQ – ERP MM – 29/07/2025 ",
      title: "Reset Password Email",
      message:
        "Tiket 'Reset Password Email' telah berpindah status menjadi 'In Progress'.",
      status: "unread",
      datetime: "2025-07-29 10:15:00",
    },
    {
      id: "1",
      ticket_id: "INFR – ERP e-Procurement – 29/07/2025 ",
      title: "Permintaan Pembuatan Vendor Baru dengan status DPT Active",
      message:
        "Tiket ‘Permintaan Pembuatan Vendor Baru dengan status DPT Active' telah diselesaikan. Silakan berikan feedback Anda.",
      status: "unread",
      datetime: "2025-07-29 11:30:00",
    },
    {
      id: "2",
      ticket_id: "INFR – HRIS – 29/07/2025 ",
      title: "Penambahan Cuti pada Employe dengan NIK BAG12345",
      message:
        "Tiket ' Penambahan Cuti pada Employe dengan NIK BAG12345' sudah melewati 2 hari setelah selesai. Tiket telah ditutup",
      status: "unread",
      datetime: "2025-08-29 12:00:00",
    },
    {
      id: "1",
      ticket_id: "INSP – ERP FM – 29/07/2025",
      title: "Vendor Bill tidak bisa berstatus Paid",
      message:
        "Tiket ' Vendor Bill tidak bisa berstatus Paid' mendekati batas waktu penyelesaian. Cek kembali untuk hindari keterlambatan.",
      status: "unread",
      datetime: "2025-07-29 13:45:00",
    },
  ];

  const groupedNotifications = notifications.reduce((acc, notif) => {
    const date = notif.datetime.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {});

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

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      login();
    }
  };

  return (
    <div className="relative">
      <div className="flex bg-white px-10 py-3 justify-between items-center relative z-20">
        <div className="flex items-center w-52 justify-between">
          <Image
            src="/logoNavbar.png"
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
              <div className="absolute right-0 mt-2 w-[400px] bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                <div className="p-4 font-semibold border-b flex justify-between">
                  <h1 className="text-xl">Notifikasi</h1>
                  <div className="flex gap-4">
                    <CgArrowsExpandRight className="text-xl cursor-pointer" />
                    <IoClose
                      onClick={() => setShowNotifications(false)}
                      className="text-xl cursor-pointer"
                    />
                  </div>
                </div>
                <div className="p-4 text-sm text-gray-500 font-semibold cursor-pointer">
                  Marks As Read
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {Object.keys(groupedNotifications).length === 0 ? (
                    <li className="p-4 text-sm text-gray-500">
                      Tidak ada notifikasi.
                    </li>
                  ) : (
                    Object.keys(groupedNotifications).map((date, dateIndex) => (
                      <React.Fragment key={dateIndex}>
                        <div className="text-center text-xs text-gray-600 my-2">
                          {formatDate(date)}
                        </div>
                        {groupedNotifications[date].map((notif, index) => (
                          <li
                            key={index}
                            className="px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center  w-full">
                                <div className="w-1/15">
                                  {notif.status === "unread" && (
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                  )}
                                </div>
                                <div className="w-4/5">
                                  <h1 className="font-semibold text-sm">
                                    {notif.ticket_id}
                                  </h1>
                                  <h1 className="font-semibold text-sm">
                                    {notif.title}
                                  </h1>
                                </div>
                                <div className="text-xs text-gray-500 w-1/5 text-right">
                                  {notif.datetime.split(" ")[1].substring(0, 5)}{" "}
                                  WIB
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 px-4 py-2">
                              {notif.message}
                            </p>
                          </li>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <FaUser className="text-xl text-gray-600" />
          <div className="flex flex-col">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="text-xs">{user.email}</p>
              </>
            ) : (
              <>
                <h4 className="text-sm font-semibold">Tamu</h4>
                <p className="text-xs">belum login</p>
              </>
            )}
          </div>
          <button
            onClick={handleAuthAction}
            className="px-4 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
