"use client";
import HelpdeskInfoTable from "@/components/Helpdesk/config/HelpdeskInfo/HelpdeskInfoTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNewInfo = () => {
    router.push("/helpdesk/config/helpdesk-info/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <HelpdeskInfoTable onClickNewInfo={handleNewInfo} />
      </HelpdeskLayout>
    </div>
  );
}
