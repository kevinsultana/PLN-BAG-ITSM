"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CreateTeamMemberForm from "@/components/Helpdesk/config/TeamMember/CreateTeamMemberForm";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState({});

  const getData = async (id) => {
    try {
      const res = await ProxyUrl.get(`/team-groups/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching team group:", error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleSubmit = async (formData) => {
    const toastId = toast.loading("Updating team member...");
    try {
      const res = await ProxyUrl.put(`/team-groups/${id}`, formData);
      toast.success("Team member updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
      router.back();
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <CreateTeamMemberForm
          data={data}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </HelpdeskLayout>
    </div>
  );
}
