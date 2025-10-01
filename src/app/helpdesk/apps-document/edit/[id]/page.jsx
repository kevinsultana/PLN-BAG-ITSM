"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { PostProxyUrl, ProxyUrl } from "@/api/BaseUrl";
import { CircularProgress } from "@mui/material";
import { toast } from "sonner";
import CreateAppDocumentForm from "@/components/Helpdesk/AppDocument/CreateAppDocumentForm";

export default function EditApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProxyUrl.get(`/docs/${id}`);
        setData(response.data.data || {});
      } catch (err) {
        toast.error("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const fetchAppList = async () => {
      try {
        const response = await ProxyUrl.get("/applications");
        setAppList(response.data.data || []);
      } catch (err) {
        toast.error("Gagal mengambil daftar aplikasi");
      }
    };
    fetchAppList();
  }, [id]);

  const handleSave = async (form) => {
    try {
      const newform = {
        application_id: form.application_id,
        attachment_ids: form.attachment_ids,
        description: form.description,
        is_publish: form.is_publish,
        title: form.title,
      };
      const resp = await ProxyUrl.put(`/docs/${id}`, newform);
      // console.log(resp.data);
      router.back();
      toast.success("Dokumen berhasil diperbarui", {
        description: `Dokumen "${form.title}" telah berhasil diperbarui.`,
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Konfigurasi</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <CreateAppDocumentForm
            appList={appList}
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
