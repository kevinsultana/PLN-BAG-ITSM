"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CrApprovalTable from "@/components/Helpdesk/CRApproval/CrApprovalTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

export default function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false);

  const router = useRouter();

  const getDataCRApproval = async () => {
    if (hasFetchedRef.current) {
      console.log("Skipping duplicate CR Approval API call");
      return;
    }

    hasFetchedRef.current = true;

    try {
      setLoading(true);
      const res = await ProxyUrl.get("/change-requests");

      if (res.data.data) {
        setData(res.data.data);
      } else {
        setData(res.data || []);
      }
    } catch (error) {
      console.log(error);
      setData([]);
      hasFetchedRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (row, index) => {
    router.push(`/helpdesk/cr-approval/details/${row.id}`);
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
