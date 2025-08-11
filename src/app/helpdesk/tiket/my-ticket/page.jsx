import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import MyListTicketTable from "@/components/Helpdesk/Tiket/MyListTicketTable";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Tiket Saya</h1>
        <MyListTicketTable />
      </HelpdeskLayout>
    </div>
  );
}
