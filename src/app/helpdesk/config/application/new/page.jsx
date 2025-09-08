"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateApplicationForm from "@/components/Helpdesk/config/Aplikasi/CreateApplicationForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (form) => {
    // console.log(form);
    try {
      const response = await ProxyUrl.post("/applications", {
        name: form.name,
        // slaPolicy: form.slaPolicy,
        description: form.description,
      });
      console.log(response.data);
      toast.success("Aplikasi berhasil dibuat");
      router.push("/helpdesk/config/application");
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateApplicationForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Save"
        />
      </HelpdeskLayout>
    </div>
  );
}
