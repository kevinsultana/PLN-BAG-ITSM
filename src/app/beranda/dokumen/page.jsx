"use client";
import ApplicationService from "@/components/Beranda/Home/ApplicationService";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleNavigateTo = (path) => {
    router.push(`/beranda/dokumen/${path}`);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col py-6 px-14 space-y-4">
          <h1 className="text-2xl font-bold">Dokumen</h1>
          <ApplicationService handleNavigate={handleNavigateTo} />
        </div>
      </MainLayout>
    </div>
  );
}
