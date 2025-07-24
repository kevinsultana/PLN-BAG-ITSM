import TicketForm from "@/components/Beranda/HelpDesk/NewTicket/TicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-100 h-full">
      <MainLayout>
        <div className="flex flex-col gap-6 py-6 px-10">
          <h1 className="text-2xl font-bold">Beranda</h1>
          <TicketForm />
        </div>
      </MainLayout>
    </div>
  );
}
