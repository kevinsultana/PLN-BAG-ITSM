"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import AllListTicketTable from "@/components/Helpdesk/Tiket/AllListTicketTable";
import { useTicketData } from "@/context/TicketDataContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { setSelectedDataTicket } = useTicketData();
  const router = useRouter();

  const handleNavigateToDetails = (ticket, index) => {
    setSelectedDataTicket(ticket);
    router.push(`/helpdesk/tiket/details/${index}`);
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Semua Tiket</h1>
        <AllListTicketTable
          onRowClick={(item, index) => handleNavigateToDetails(item, index)}
        />
      </HelpdeskLayout>
    </div>
  );
}
