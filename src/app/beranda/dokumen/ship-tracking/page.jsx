import ShipTrackingTable from "@/components/Beranda/Dokumen/ShipTrackingTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col">
      <MainLayout>
        <div className="bg-slate-100 py-6 px-14 h-full space-y-4">
          <h1 className="text-2xl font-bold">Dokumen</h1>
          <ShipTrackingTable />
        </div>
      </MainLayout>
    </div>
  );
}
