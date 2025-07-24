"use client";
import React from "react";
import HeroImg from "@/components/Beranda/Home/HeroImg";
import HomeContactUs from "@/components/Beranda/Home/HomeContactUs";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import ListTicketTable from "@/components/Beranda/Home/ListTicketTable";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleRowClick = (item) => {
    router.push(`/beranda/ticket-details/${item.no}`);
  };
  return (
    <div className="bg-slate-100 h-full">
      <MainLayout>
        <div className="flex flex-col py-6 px-14">
          <h1 className="text-2xl font-bold mb-6">Beranda</h1>
          <HeroImg />
          <HomeContactUs />
          <ListTicketTable onRowClick={handleRowClick} />
        </div>
      </MainLayout>
    </div>
  );
}
