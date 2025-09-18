"use client";
import { PostProxyUrl, ProxyUrl } from "@/api/BaseUrl";
import CreateAppDocumentForm from "@/components/Helpdesk/AppDocument/CreateAppDocumentForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [appList, setAppList] = useState([]);

  const router = useRouter();

  const handleSubmit = async (form) => {
    try {
      if (form.file_url === null) {
        // tidak perlu upload gambar
        await ProxyUrl.post("/docs", {
          ...form,
          attachment_ids: [],
        });
      } else {
        const formData = new FormData();
        formData.append("files", form.file_url);
        const res = await PostProxyUrl.post("/attachments", formData);

        await ProxyUrl.post("/docs", {
          ...form,
          attachment_ids: [res?.data.data[0].id],
        });
      }
      router.back();
      toast.success("Dokumen berhasil dibuat!", {
        description: `Dokumen "${form.title}" telah berhasil ditambahkan.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const getAppList = async () => {
    try {
      const response = await ProxyUrl.get("/applications");
      const data = response.data.data;
      setAppList(data);
    } catch (error) {
      console.error("Error fetching app list:", error);
    }
  };

  useEffect(() => {
    getAppList();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Dokumen Aplikasi</h1>
        <CreateAppDocumentForm
          appList={appList}
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
        />
      </HelpdeskLayout>
    </div>
  );
}
