"use client";
import TeamMemberTable from "@/components/Helpdesk/Config/TeamMember/TeamMemberTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleNewTeamMember = () => {
    router.push("/helpdesk/config/team-member/new");
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TeamMemberTable onClickNew={handleNewTeamMember} />
      </HelpdeskLayout>
    </div>
  );
}
