"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import EditHelpdeskInfoForm from "@/components/Helpdesk/config/HelpdeskInfo/EditHelpdeskInfoForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

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
  // console.log(data);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <EditHelpdeskInfoForm data={data} />
      </HelpdeskLayout>
    </div>
  );
}
