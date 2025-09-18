"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import TeamMemberTable from "@/components/Helpdesk/config/TeamMember/TeamMemberTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewTeamMember = () => {
    router.push("/helpdesk/config/team-member/new");
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/team-groups");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching team groups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (data) => {
    const toastId = toast.loading("Menghapus Team Member...");
    try {
      const res = await ProxyUrl.delete(`/team-groups/${data.id}`);
      toast.success("Berhasil menghapus Team Member");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
      getData();
    }
  };

  const handleEdit = (data) => {
    router.push(`/helpdesk/config/team-member/edit/${data.id}`);
  };

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TeamMemberTable
          data={data}
          onClickNew={handleNewTeamMember}
          loading={loading}
          onClickDelete={handleDelete}
          onClickEdit={handleEdit}
        />
      </HelpdeskLayout>
    </div>
  );
}
