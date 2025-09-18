"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateAgentForm from "@/components/Helpdesk/config/AgentManagement/CreateAgentForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    toast.loading("Membuat agen...");
    try {
      const res = await ProxyUrl.post("/teams", data);

      toast.success("Agen berhasil dibuat");
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss();
    }
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateAgentForm
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
        />
      </HelpdeskLayout>
    </div>
  );
}
