"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateTicketStatusForm from "@/components/Helpdesk/config/TiketStatus/CreateTicketStatusForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const handleCreate = async (formData) => {
    try {
      await ProxyUrl.post("/ticket-statuses", formData);
      router.back();
    } catch (error) {
      console.error("Failed to create ticket status:", error);
    }
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateTicketStatusForm
          onSubmit={handleCreate}
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
