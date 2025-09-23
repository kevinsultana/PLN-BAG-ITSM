"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";
import CRFormAgent from "@/components/Helpdesk/CRForm/CRFormAgent";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id;

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      const getTicketData = async () => {
        try {
          const res = await ProxyUrl.get(`/tickets/${ticketId}`);
          setTicketData(res.data.data || {});
        } catch (error) {
          console.error("Gagal mengambil data tiket:", error);
          toast.error("Gagal memuat data tiket.");
        } finally {
          setLoading(false);
        }
      };
      getTicketData();
    }
  }, [ticketId]);

  const handleCRSubmit = (formData) => {
    console.log("Submitting CR Form Data:", formData);
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 2000)
      ),
      {
        loading: "Menyimpan Change Request Form...",
        success: "CRF berhasil disimpan!",
        error: "Gagal menyimpan CRF.",
      }
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Formulir Agent</h1>
          <button
            onClick={() =>
              router.push(`/helpdesk/tiket/cr-form/it/${ticketId}`)
            }
            className="px-4 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Submit CRF
          </button>
        </div>
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <CRFormAgent
            data={ticketData}
            onSubmit={handleCRSubmit}
            onCancel={() => router.back()}
          />
        )}
      </HelpdeskLayout>
    </div>
  );
}
