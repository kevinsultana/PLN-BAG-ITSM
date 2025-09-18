"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import AppDocumentTable from "@/components/Helpdesk/AppDocument/AppDocumentTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNewDocApps = () => {
    router.push("/helpdesk/apps-document/new");
  };

  const handleEdit = (row) => {
    router.push(`/helpdesk/apps-document/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    try {
      await ProxyUrl.delete(`/docs/${row.id}`);
      toast.success("Dokumen berhasil dihapus!", {
        description: `Dokumen "${row.title}" telah berhasil dihapus.`,
        duration: 3000,
      });
      getData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/docs");
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Dokumen Aplikasi</h1>
        <AppDocumentTable
          onClickDelete={handleDelete}
          onClickEdit={handleEdit}
          data={data}
          onClickNewDocApps={handleNewDocApps}
          loading={data.length === 0 || loading}
        />
      </HelpdeskLayout>
    </div>
  );
}
