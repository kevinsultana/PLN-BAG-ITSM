"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import BagCloudTable from "@/components/Beranda/Dokumen/BagCloudTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/docs/" + param.id);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [param.id]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Dokumen</h1>
          <BagCloudTable data={data} loading={loading} />
        </div>
      </MainLayout>
    </div>
  );
}
