"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import TeamMemberTable from "@/components/Helpdesk/config/TeamMember/TeamMemberTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleNewTeamMember = () => {
    router.push("/helpdesk/config/team-member/new");
  };

  const getData = async () => {
    try {
      const res = await ProxyUrl.get("/team-groups");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching team groups:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TeamMemberTable data={data} onClickNew={handleNewTeamMember} />
      </HelpdeskLayout>
    </div>
  );
}
