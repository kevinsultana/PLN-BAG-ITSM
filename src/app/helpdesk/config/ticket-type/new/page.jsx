"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";
import CreateTicketTypeForm from "@/components/Helpdesk/config/TicketType/CreateTicketTypeForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleCreate = async (form) => {
    try {
      await ProxyUrl.post("/ticket-types", {
        name: form.name,
        code: form.code,
        description: form.description,
        status: form.status,
      });
      router.back();
      toast.success("Tipe tiket berhasil dibuat");
    } catch (err) {
      console.log(err);
      toast.error("Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateTicketTypeForm
          onSubmit={handleCreate}
          submitLabel="Save"
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
