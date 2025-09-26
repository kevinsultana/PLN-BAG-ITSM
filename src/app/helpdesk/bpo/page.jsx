"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import BPOManagementTable from "@/components/Helpdesk/BPO/BPOManagementTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  const getDataBPO = async () => {
    try {
      const res = await ProxyUrl.get("/bpos");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataBPO();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">BPO</h1>
        <BPOManagementTable data={data} />
      </HelpdeskLayout>
    </div>
  );
}
