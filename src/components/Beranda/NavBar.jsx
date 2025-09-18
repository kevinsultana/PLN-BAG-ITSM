"use client";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { FaBell, FaUser } from "react-icons/fa6";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgArrowsExpandRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProxyUrl } from "@/api/BaseUrl";

export default function NavBar({ onClick }) {
  const { user, loading, login, logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  const router = useRouter();

  const [dataNotifications, setDataNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await ProxyUrl.get("/notifications");
      setDataNotifications(res.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // Group notifications from API by date (YYYY-MM-DD)
  const groupedNotifications = dataNotifications.reduce((acc, notif) => {
    const date = notif.created_at.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {});
  const handleOnClickNotification = async (notification) => {
    router.push(`/beranda/ticket-details/${notification.ticket_id}`);
    try {
      await ProxyUrl.put(`/notifications/${notification.id}/read`);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleAuthAction = async () => {
    if (user) {
      setLogoutLoading(true);
      // toast.loading("Logging out...");
      try {
        await logout();
        toast.success("Berhasil logout!");
        router.replace("/");
      } catch (err) {
        toast.error("Logout gagal!");
      } finally {
        setLogoutLoading(false);
      }
    } else {
      login();
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

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
          {user?.data?.role === "Administrator" && (
            <Link
              href="/helpdesk"
              className="text-gray-500 hover:text-gray-800 transition-all duration-300 hover:bg-sky-600/40 bg-sky-600/20 px-3 py-2 rounded-lg text-sm font-semibold"
            >
              Helpdesk
            </Link>
          )}
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
                        {groupedNotifications[date].map((notif, index) => {
                          const time =
                            notif.created_at.split("T")[1]?.substring(0, 5) ||
                            "";
                          return (
                            <li
                              key={notif.id}
                              onClick={() => handleOnClickNotification(notif)}
                              className="px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center w-full">
                                  <div className="w-1/15">
                                    {!notif.is_read && (
                                      <div className="w-2 h-2 rounded-full bg-red-500" />
                                    )}
                                  </div>
                                  <div className="w-4/5">
                                    <h1 className="font-semibold text-sm">
                                      {notif.title}
                                    </h1>
                                  </div>
                                  <div className="text-xs text-gray-500 w-1/5 text-right">
                                    {time} WIB
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 px-4 py-2">
                                {notif.message}
                              </p>
                            </li>
                          );
                        })}
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
                <h4 className="text-sm font-semibold">{user.data.name}</h4>
                <p className="text-xs">{user.data.email}</p>
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
            className="px-4 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={logoutLoading}
          >
            {logoutLoading && (
              <span className="loader mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {user ? "Sign Out" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
