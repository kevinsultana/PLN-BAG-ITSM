"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CreateTicketForm from "@/components/Helpdesk/Tiket/CreateTicketForm";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleFormSubmit = async (formData, attachment) => {
    const newFormData = { ...formData, attachment_ids: attachment };
    try {
      const res = await ProxyUrl.post("/tickets", newFormData);
      toast.success("Tiket berhasil dibuat!", {
        description: "Tiket baru telah berhasil dibuat.",
      });
      router.back();
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("Gagal membuat tiket.", {
        description: error?.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Buat Tiket Baru</h1>
        <CreateTicketForm
          onSubmit={(formData, attachment) =>
            handleFormSubmit(formData, attachment)
          }
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
