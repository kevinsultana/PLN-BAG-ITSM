"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CrApprovalTableUser from "@/components/Beranda/CRApproval/CrApprovalTableUser";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getDataCRApproval = async () => {
    try {
      setLoading(true);
      const res = await ProxyUrl.get("/change-requests");

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

  const handleEditClick = (row) => {
    if (row.is_bpo1_approve === false && user.data.role === "BPO 1") {
      router.push(`/beranda/cr-approval/edit/bpo1/${row.id}`);
    } else if (
      row.is_bpo1_approve === "APPROVED" &&
      user.data.role === "BPO 1"
    ) {
      router.push(`/beranda/cr-approval/edit/bpo1/${row.id}`);
    } else {
      router.push(`/beranda/cr-approval/edit/bpo2/${row.id}`);
    }
  };

  useEffect(() => {
    getDataCRApproval();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col py-6 px-14">
          <h1 className="text-2xl font-bold mb-4">CR Approval</h1>
          <CrApprovalTableUser
            items={data}
            loading={loading}
            onEditClick={handleEditClick}
          />
        </div>
      </MainLayout>
    </div>
  );
}
