"use client";
import FormulirTable from "@/components/Beranda/Formulir/FormulirTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(`/beranda/formulir/${path}`);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Formulir</h1>
          <FormulirTable handleOpenForm={handleNavigate} />
        </div>
      </MainLayout>
    </div>
  );
}
