import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CreateTicketForm from "@/components/Helpdesk/Tiket/CreateTicketForm";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Buat Tiket Baru</h1>
        <CreateTicketForm />
      </HelpdeskLayout>
    </div>
  );
}
