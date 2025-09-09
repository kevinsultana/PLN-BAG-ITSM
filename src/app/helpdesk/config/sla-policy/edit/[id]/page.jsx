"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { ProxyUrl } from "@/api/BaseUrl";
import { CircularProgress } from "@mui/material";
import CreateSlaPolicyForm from "@/components/Helpdesk/config/SlaPolicy/CreateSlaPolicyForm";
import { toast } from "sonner";

export default function EditSlaPolicyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProxyUrl.get(`/sla-policies/${id}`);
        console.log(response.data.data);
        setData(response.data.data || null);
      } catch (err) {
        toast.error("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async (form) => {
    try {
      await ProxyUrl.put(`/sla-policies/${id}`, {
        name: form.name,
        description: form.description,
        priority: form.priority,
        response_time: Number(form.response_time),
        resolve_time: Number(form.resolve_time),
      });
      router.back();
      toast.success("SLA Policy berhasil diperbarui");
    } catch (err) {
      console.log(err);
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Konfigurasi</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <CreateSlaPolicyForm
            data={data}
            onSubmit={handleSave}
            onCancel={() => router.back()}
            submitLabel="Update"
          />
        )}
      </HelpdeskLayout>
    </div>
  );
}
