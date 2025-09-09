"use client";
import React, { useEffect, useState } from "react";
import NavbarAgent from "../NavbarAgent";
import SidebarAgent from "../SidebarAgent";
import Footer from "@/components/Beranda/Footer";

export default function HelpdeskLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAgent onClick={() => setShowSideBar(!showSideBar)} />
      <div className="flex flex-1">
        <SidebarAgent show={showSideBar} />
        <div
          className={`transition-all p-6 duration-300 ease-in-out w-full ${
            showSideBar ? "ml-0" : "ml-[-16%]"
          }`}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
