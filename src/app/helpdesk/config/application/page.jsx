"use client";
import ApplicationTable from "@/components/Helpdesk/config/Aplikasi/ApplicationTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const handleNewApplication = () => {
    router.push("/helpdesk/config/application/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <ApplicationTable onClickNewApps={handleNewApplication} />
      </HelpdeskLayout>
    </div>
  );
}
