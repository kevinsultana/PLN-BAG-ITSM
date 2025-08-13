import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import SlaTicketAnalysisTable from "@/components/Helpdesk/Reporting/SlaTicketAnalysisTable";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Reporting</h1>
        <SlaTicketAnalysisTable />
      </HelpdeskLayout>
    </div>
  );
}
