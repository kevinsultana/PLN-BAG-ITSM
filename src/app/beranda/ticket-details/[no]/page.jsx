"use client";
import DetailTicketForm from "@/components/Beranda/HelpDesk/DetailTikcket/DetailTicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const ticketNo = params.no;
  return (
    <div className="bg-slate-100 min-h-screen h-full">
      <MainLayout>
        <div className="flex flex-col gap-6 py-6 px-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Beranda</h1>
            <button className="text-white bg-sky-400 px-4 py-2 rounded-2xl">
              Status
            </button>
          </div>
          <h1 className="text-2xl font-bold">Ticket No. {ticketNo}</h1>
          <DetailTicketForm />
        </div>
      </MainLayout>
    </div>
  );
}
