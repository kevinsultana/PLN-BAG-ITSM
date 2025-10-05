"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateSlaPolicyForm from "@/components/Helpdesk/config/SlaPolicy/CreateSlaPolicyForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const handleSubmit = async (form) => {
    try {
      await ProxyUrl.post("/sla-policies", form);
      router.back();
      toast.success("SLA Policy berhasil dibuat");
    } catch (error) {
      toast.error("Gagal membuat SLA Policy");
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateSlaPolicyForm
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
          submitLabel="Simpan"
        />
      </HelpdeskLayout>
    </div>
  );
}
