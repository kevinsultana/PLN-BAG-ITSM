"use client";
import TicketTypeTable from "@/components/Helpdesk/Config/TicketType/TicketTypeTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  const handleNewTicketType = () => {
    router.push("/helpdesk/config/ticket-type/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TicketTypeTable onClickNewTicketType={handleNewTicketType} />
      </HelpdeskLayout>
    </div>
  );
}
