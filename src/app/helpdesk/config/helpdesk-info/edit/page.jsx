"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import EditHelpdeskInfoForm from "@/components/Helpdesk/config/HelpdeskInfo/EditHelpdeskInfoForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState({});
  const router = useRouter();

  const getDataHelpdeskInfo = async () => {
    try {
      const res = await ProxyUrl.get("/helpdesk-info");
      setData(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataHelpdeskInfo();
  }, []);

  const handleFormSubmit = async (formData) => {
    const toastId = toast.loading("Menyimpan perubahan...");
    try {
      const res = await ProxyUrl.put("/helpdesk-info", formData);
      if (res.data.success === true) {
        toast.success("Informasi helpdesk berhasil diperbarui!");
      }
      router.back();
    } catch (error) {
      console.error("Error submitting helpdesk info:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <EditHelpdeskInfoForm
          data={data}
          onCancel={handleCancel}
          onSubmit={handleFormSubmit}
        />
      </HelpdeskLayout>
    </div>
  );
}
