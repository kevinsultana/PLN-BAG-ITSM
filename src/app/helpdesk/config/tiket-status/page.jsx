"use client";
import TicketStatusTable from "@/components/Helpdesk/Config/TiketStatus/TicketStatusTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNewTiketStats = () => {
    router.push("/helpdesk/config/tiket-status/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TicketStatusTable onClickNewTiketStats={handleNewTiketStats} />
      </HelpdeskLayout>
    </div>
  );
}
