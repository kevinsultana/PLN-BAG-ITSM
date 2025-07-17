import DocumentTable from "@/components/Dokumen/DocumentTable";
import MainLayout from "@/components/Layout/MainLayout";
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
