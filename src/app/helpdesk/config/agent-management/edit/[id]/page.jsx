"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateAgentForm from "@/components/Helpdesk/config/AgentManagement/CreateAgentForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const { id } = useParams();
  const [data, setData] = useState({});

  const router = useRouter();

  const getDataAgentById = async (id) => {
    try {
      const res = await ProxyUrl.get(`/teams/${id}`);
      const agent = res.data.data || {};

      setData(agent);
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };
  useEffect(() => {
    getDataAgentById(id);
  }, [id]);

  const handleSubmit = async (formData) => {
    const toastId = toast.loading("Menyimpan perubahan...");
    try {
      await ProxyUrl.put(`/teams/${id}`, formData);
      toast.success("Perubahan berhasil disimpan");
      router.back();
    } catch (error) {
      console.error("Error updating agent data:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi </h1>
        <CreateAgentForm
          data={data}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
