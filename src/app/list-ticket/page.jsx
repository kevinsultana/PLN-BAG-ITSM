import Footer from "@/components/Footer";
import ListTicket from "@/components/ListTicket/ListTicket";
import NavBar from "@/components/NavBar";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <ListTicket />
      <Footer />
    </div>
  );
}
