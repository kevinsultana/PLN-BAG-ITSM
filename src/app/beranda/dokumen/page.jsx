import DocumentTable from "@/components/Beranda/Dokumen/DocumentTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <MainLayout>
        <DocumentTable />
      </MainLayout>
    </div>
  );
}
