import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CreateUserForm from "@/components/Helpdesk/User/CreateUserForm";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">User</h1>
        <CreateUserForm />
      </HelpdeskLayout>
    </div>
  );
}
