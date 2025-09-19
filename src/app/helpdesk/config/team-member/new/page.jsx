"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateTeamMemberForm from "@/components/Helpdesk/config/TeamMember/CreateTeamMemberForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Menyimpan Team Member...");
    try {
      await ProxyUrl.post("/team-groups", data);
      toast.success("Berhasil menambahkan Team Member");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan Team Member");
    } finally {
      toast.dismiss(toastId);
      router.back();
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateTeamMemberForm
          onSubmit={handleFormSubmit}
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
