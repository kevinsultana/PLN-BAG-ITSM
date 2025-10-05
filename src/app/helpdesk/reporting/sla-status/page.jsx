"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import SlaTicketAnalysisTable from "@/components/Helpdesk/Reporting/SlaTicketAnalysisTable";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [slaData, setSlaData] = useState({ items: [], summary: {} });
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const { user } = useAuth();

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reporting</h1>
          {user.data.role === "Lead Agent" ||
            (user.data.role === "Administrator" && (
              <button
                onClick={() => {}}
                disabled={loadingDownload}
                className="flex items-center min-w-20 justify-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
              >
                {loadingDownload ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Exports"
                )}
              </button>
            ))}
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
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
