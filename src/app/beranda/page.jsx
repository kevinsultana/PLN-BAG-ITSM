"use client";
import React, { useEffect, useState } from "react";
import HeroImg from "@/components/Beranda/Home/HeroImg";
import HomeContactUs from "@/components/Beranda/Home/HomeContactUs";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import ListTicketTable from "@/components/Beranda/Home/ListTicketTable";

import { useRouter } from "next/navigation";
import { ProxyUrl } from "@/api/BaseUrl";

export default function Page() {
  const [dataTiket, setDataTiket] = useState([]);
  const [dataMetaTiket, setDataMetaTiket] = useState([]);

  const router = useRouter();

  const handleRowClick = (item, index) => {
    router.push(`/beranda/ticket-details/${index}`, { state: item });
  };

  const getDataTiket = async () => {
    try {
      const res = await ProxyUrl.get("/tickets");
      setDataTiket(res.data.data);
      setDataMetaTiket(res.data.meta);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataTiket();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col py-6 px-14">
          <h1 className="text-2xl font-bold mb-6">Beranda</h1>
          <HeroImg />
          <HomeContactUs />
          <ListTicketTable
            onRowClick={handleRowClick}
            dataTiket={dataTiket}
            dataMetaTiket={dataMetaTiket}
          />
        </div>
      </MainLayout>
    </div>
  );
}
