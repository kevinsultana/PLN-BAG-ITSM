"use client";
import React, { useState } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

export default function MainLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div>
      <NavBar onClick={() => setShowSideBar(!showSideBar)} />
      <div className="flex">
        {showSideBar && <SideBar />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
