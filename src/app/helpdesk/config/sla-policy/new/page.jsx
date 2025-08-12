import CreateSlaPolicyForm from "@/components/Helpdesk/Config/SlaPolicy/CreateSlaPolicyForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateSlaPolicyForm />
      </HelpdeskLayout>
    </div>
  );
}
