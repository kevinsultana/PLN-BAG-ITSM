"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CreateTicketForm from "@/components/Helpdesk/Tiket/CreateTicketForm";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleFormSubmit = async (formData) => {
    // const submitData = {
    //   team_id: formData.team,
    //   application_id: formData.namaAplikasi,
    //   division_id: formData.namaDivisi,

    // };
    // try {
    //   const res = await ProxyUrl.post("/tickets", submitData);
    // } catch (error) {
    //   console.error("Error submitting ticket:", error);
    // }
    console.log("Form Data Submitted:", formData);
    toast.success("Tiket berhasil dibuat!", {
      description: "Tiket baru telah berhasil dibuat.",
    });
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Buat Tiket Baru</h1>
        <CreateTicketForm
          onSubmit={handleFormSubmit}
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
