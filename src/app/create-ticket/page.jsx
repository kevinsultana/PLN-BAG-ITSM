import CreateTicket from "@/components/CreateTicket/CreateTicket";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <CreateTicket />
      <Footer />
    </div>
  );
}
