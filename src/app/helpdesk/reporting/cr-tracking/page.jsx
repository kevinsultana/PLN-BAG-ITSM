import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CrTrackingChart from "@/components/Helpdesk/Reporting/CrTrackingChart";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Reporting</h1>
        <CrTrackingChart />
      </HelpdeskLayout>
    </div>
  );
}
