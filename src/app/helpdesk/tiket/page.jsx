import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Tiket</h1>
      </HelpdeskLayout>
    </div>
  );
}
