"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import AllListTicketTable from "@/components/Helpdesk/Tiket/AllListTicketTable";
import {
  TicketDataProvider,
  useTicketData,
  TicketDataContext,
} from "@/context/TicketDataContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function page() {
  const { setSelectedDataTicket } = useContext(TicketDataContext);
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
          onRowClick={(row) => handleNavigateToDetails(row, index)}
        />
      </HelpdeskLayout>
    </div>
  );
}
