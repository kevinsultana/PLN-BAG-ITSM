"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { ProxyUrl } from "@/api/BaseUrl";
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
      await ProxyUrl.put(`/docs/${id}`, form);
      router.back();
      toast.success("Aplikasi berhasil diperbarui");
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
