"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import BPOManagementTable from "@/components/Helpdesk/BPO/BPOManagementTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataBPO = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/bpos");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataBPO();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">BPO</h1>
        <BPOManagementTable data={data} loading={loading} />
      </HelpdeskLayout>
    </div>
  );
}
