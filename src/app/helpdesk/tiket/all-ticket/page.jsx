import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import AllListTicketTable from "@/components/Helpdesk/Tiket/AllListTicketTable";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Semua Tiket</h1>
        <AllListTicketTable />
      </HelpdeskLayout>
    </div>
  );
}
