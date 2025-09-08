"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { ProxyUrl } from "@/api/BaseUrl";
import { CircularProgress } from "@mui/material";
import CreateTicketTypeForm from "@/components/Helpdesk/config/TicketType/CreateTicketTypeForm";
import { toast } from "sonner";

export default function EditTicketTypePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProxyUrl.get(`/ticket-types/${id}`);
        setData(response.data.data || {});
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
      await ProxyUrl.put(`/ticket-types/${id}`, {
        name: form.name,
        code: form.code,
        description: form.description,
        status: form.status,
      });
      router.back();
      toast.success("Tipe tiket berhasil diperbarui");
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
          <CreateTicketTypeForm
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
