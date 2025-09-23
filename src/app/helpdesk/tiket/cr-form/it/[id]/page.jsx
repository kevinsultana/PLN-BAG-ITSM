"use client";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";
import CRFormIt from "@/components/Helpdesk/CRForm/CRFormIt";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id;

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticketId) {
      const getTicketData = async () => {
        setLoading(true);
        try {
          // Anda mungkin perlu mengambil data tiket dan data CRF yang sudah ada
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

  const handleItFormSubmit = (formData) => {
    // Di sini Anda akan mengirimkan `formData` ke endpoint API Anda
    console.log("Submitting IT CR Form Data:", formData);
    toast.promise(
      // Ganti dengan logika API call Anda yang sebenarnya
      new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1500)
      ),
      {
        loading: "Menyimpan data CRF IT...",
        success: "Data CRF IT berhasil disimpan!",
        error: "Gagal menyimpan data.",
      }
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Formulir CRF (IT)</h1>
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
        {loading ? (
          <div className="text-center p-10">
            <p>Memuat data formulir...</p>
          </div>
        ) : (
          <CRFormIt
            data={ticketData}
            onSubmit={handleItFormSubmit}
            onCancel={() => router.back()}
          />
        )}
      </HelpdeskLayout>
    </div>
  );
}
