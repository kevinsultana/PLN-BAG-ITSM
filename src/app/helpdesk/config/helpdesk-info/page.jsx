"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskInfoTable from "@/components/Helpdesk/config/HelpdeskInfo/HelpdeskInfoTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewInfo = () => {
    router.push("/helpdesk/config/helpdesk-info/edit");
  };

  const getDataHelpdeskInfo = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/helpdesk-info");
      setData(res.data.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataHelpdeskInfo();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <HelpdeskInfoTable
          data={data}
          onClickNewInfo={handleNewInfo}
          loading={loading}
        />
      </HelpdeskLayout>
    </div>
  );
}
