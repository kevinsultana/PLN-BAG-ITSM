import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import UserManagementTable from "@/components/Helpdesk/User/UserManagementTable";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">User</h1>
        <UserManagementTable />
      </HelpdeskLayout>
    </div>
  );
}
