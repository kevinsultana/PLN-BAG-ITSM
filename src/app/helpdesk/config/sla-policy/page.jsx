"use client";
import SlaPolicyTable from "@/components/Helpdesk/config/SlaPolicy/SlaPolicyTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const handleNewSLAPolicy = () => {
    router.push("/helpdesk/config/sla-policy/new");
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <SlaPolicyTable onClickNewSLAPolicy={handleNewSLAPolicy} />
      </HelpdeskLayout>
    </div>
  );
}
