"use client";
import FormulirTable from "@/components/Beranda/Formulir/FormulirTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(`/beranda/formulir/${path}`);
  };

  return (
    <div className="flex flex-col">
      <MainLayout>
        <FormulirTable handleOpenForm={handleNavigate} />
      </MainLayout>
    </div>
  );
}
