import CreateAppFeatureForm from "@/components/Helpdesk/Config/AppFeature/CreateAppFeatureForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateAppFeatureForm />
      </HelpdeskLayout>
    </div>
  );
}
