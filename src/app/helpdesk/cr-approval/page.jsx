"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CrApprovalTable from "@/components/Helpdesk/CRApproval/CrApprovalTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React, { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataCRApproval = async () => {
    try {
      setLoading(true);
      const res = await ProxyUrl.get("/change-requests");
      console.log(res.data);

      // Handle different API response structures
      if (res.data.data) {
        setData(res.data.data);
      } else {
        setData(res.data || []);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (row, index) => {
    console.log("Row clicked:", row, index);
    // Add navigation to detail page or open modal
    // Example: router.push(`/helpdesk/cr-approval/details/${row.id}`);
  };

  useEffect(() => {
    getDataCRApproval();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">CR Approval</h1>
        <CrApprovalTable
          items={data}
          loading={loading}
          onRowClick={handleRowClick}
        />
      </HelpdeskLayout>
    </div>
  );
}
