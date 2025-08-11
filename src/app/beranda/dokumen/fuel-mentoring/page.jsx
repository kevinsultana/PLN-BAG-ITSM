import FuelMentoringTable from "@/components/Beranda/Dokumen/FuelMentoringTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col py-6 px-14 space-y-4">
          <h1 className="text-2xl font-bold">Dokumen</h1>
          <FuelMentoringTable />
        </div>
      </MainLayout>
    </div>
  );
}
