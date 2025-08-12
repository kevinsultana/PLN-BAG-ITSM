"use client";
import AppFeatureTable from "@/components/Helpdesk/config/AppFeature/AppFeatureTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNewAppFeature = () => {
    router.push("/helpdesk/config/apps-features/new");
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <AppFeatureTable onClickNewAppFeature={handleNewAppFeature} />
      </HelpdeskLayout>
    </div>
  );
}
