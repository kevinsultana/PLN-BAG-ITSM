"use client";
import AppDocumentTable from "@/components/Helpdesk/AppDocument/AppDocumentTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNewDocApps = () => {
    router.push("/helpdesk/apps-document/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Dokumen Aplikasi</h1>
        <AppDocumentTable onClickNewDocApps={handleNewDocApps} />
      </HelpdeskLayout>
    </div>
  );
}
