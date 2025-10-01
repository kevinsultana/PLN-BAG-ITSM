"use client";
import ApplicationService from "@/components/Beranda/Home/ApplicationService";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProxyUrl } from "@/api/BaseUrl";

export default function Page() {
  const router = useRouter();
  const [dataApps, setDataApps] = useState([]);

  const handleNavigateTo = (id) => {
    router.push(`/beranda/dokumen/${id}`);
  };

  const getData = async () => {
    try {
      const res = await ProxyUrl.get("/docs/client");
      setDataApps(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Dokumen</h1>
          <ApplicationService
            data={dataApps}
            handleNavigate={handleNavigateTo}
          />
        </div>
      </MainLayout>
    </div>
  );
}
