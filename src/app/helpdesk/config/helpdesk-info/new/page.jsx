import CreateHelpdeskInfoForm from "@/components/Helpdesk/config/HelpdeskInfo/CreateHelpdeskInfoForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateHelpdeskInfoForm />
      </HelpdeskLayout>
    </div>
  );
}
