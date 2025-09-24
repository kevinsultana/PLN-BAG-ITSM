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

  const handleRowClick = (item) => {
    router.push(`/beranda/ticket-details/${item.id}`);
  };

  const getDataTiket = async (page = 1) => {
    try {
      const res = await ProxyUrl.get(`/tickets?page=${page}&page_size=5`);
      setDataTiket(res.data.data);
      setDataMetaTiket(res.data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    getDataTiket(newPage);
  };

  useEffect(() => {
    getDataTiket(1);
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
            onPageChange={handlePageChange}
          />
        </div>
      </MainLayout>
    </div>
  );
}
