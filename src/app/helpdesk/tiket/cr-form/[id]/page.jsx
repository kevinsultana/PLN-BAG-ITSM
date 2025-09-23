"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const ticketNo = params.id;

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold ">Tiket {ticketNo} </h1>
        </div>
      </HelpdeskLayout>
    </div>
  );
}
