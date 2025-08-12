"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import MyListTicketTable from "@/components/Helpdesk/Tiket/MyListTicketTable";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  const handleNavigateToDetails = (ticket, index) => {
    router.push(`/helpdesk/tiket/details/${index}`);
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Tiket Saya</h1>
        <MyListTicketTable
          onRowClick={(item, index) => {
            handleNavigateToDetails(item, index);
          }}
        />
      </HelpdeskLayout>
    </div>
  );
}
