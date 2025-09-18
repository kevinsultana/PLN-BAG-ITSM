"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import AgentManagementTable from "@/components/Helpdesk/config/AgentManagement/AgentManagementTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewAgent = () => {
    router.push("/helpdesk/config/agent-management/new");
  };

  const getDataAgent = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/teams");
      const agents = res.data.data || [];
      setData(agents);
    } catch (error) {
      console.error("Error fetching agents data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataAgent();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <AgentManagementTable
          data={data}
          onClickNewAgent={handleNewAgent}
          loading={loading}
          onClickEdit={(id) =>
            router.push(`/helpdesk/config/agent-management/edit/${id}`)
          }
        />
      </HelpdeskLayout>
    </div>
  );
}
