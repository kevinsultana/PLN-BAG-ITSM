"use client";
import CRFormBpo from "@/components/Helpdesk/CRForm/CRFormBpo";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Formulir CRF (BPO)</h1>
          <button className="px-4 py-2 rounded-lg text-white bg-[#d31e1e] hover:bg-[#d01818] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            Rejected
          </button>
          <button
            onClick={() =>
              router.push(`/helpdesk/tiket/cr-form/bpo/${ticketId}`)
            }
            className="px-4 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Submit CRF
          </button>
        </div>
        <CRFormBpo />
      </HelpdeskLayout>
    </div>
  );
}
