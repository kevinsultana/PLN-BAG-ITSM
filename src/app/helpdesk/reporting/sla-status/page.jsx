"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import SlaTicketAnalysisTable from "@/components/Helpdesk/Reporting/SlaTicketAnalysisTable";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [slaData, setSlaData] = useState({ items: [], summary: {} });
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/reports/tickets/sla-analysis");
      setSlaData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Reporting</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader border-t-transparent  animate-spin rounded-full border-8 border-t-8 border-blue-200 h-16 w-16"></div>
          </div>
        ) : (
          <SlaTicketAnalysisTable
            items={slaData.items}
            summary={slaData.summary}
          />
        )}
      </HelpdeskLayout>
    </div>
  );
}
