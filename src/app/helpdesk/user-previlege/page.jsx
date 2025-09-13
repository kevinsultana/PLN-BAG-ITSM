"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import PrivilegeUserTable from "@/components/Helpdesk/User-Privilege/PrivilegeUserTable";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleEdit = (role) => {
    // console.log("Edit role:", role);
    // Implement edit logic here, e.g., open a modal or navigate to an edit page
    router.push(`/helpdesk/user-previlege/edit/${role.no}`); // Example navigation to an edit page
  };
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Privilege User</h1>
        <PrivilegeUserTable onClickEdit={handleEdit} />
      </HelpdeskLayout>
    </div>
  );
}
