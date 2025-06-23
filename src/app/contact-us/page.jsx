import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Footer />
    </div>
  );
}
