"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, []);

  return (
    <div>
      <NavBar onClick={() => setShowSideBar(!showSideBar)} />
      <div className="flex h-full">
        <SideBar show={showSideBar} />
        <div
          className={`transition-all duration-300 ease-in-out w-full ${
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
