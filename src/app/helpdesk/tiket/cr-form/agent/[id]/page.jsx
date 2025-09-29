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
  const [crForm, setCrForm] = useState({});

  useEffect(() => {
    if (ticketId) {
      const getTicketData = async () => {
        try {
          const res = await ProxyUrl.get(`/tickets/${ticketId}`);
          const data = res.data.data || {};
          setTicketData(data);
          // Initialize CR form state based on ticket data
          setCrForm({
            additional_notes: "",
            application_database: "",
            application_type: "",
            change_description: "",
            data_type: "",
            database_name: "",
            division_name: data?.division?.name || "",
            hardware_name: "",
            software_name: "",
            software_version: "",
            implementation_scope: "",
            ticket_id: ticketId,
          });
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

  const handleCRSubmit = async () => {
    // Basic validation (adjust as needed)
    console.log(crForm);
    const requiredFields = [
      "application_type",
      "application_database",
      "data_type",
      "database_name",
      "hardware_name",
      "software_name",
      "software_version",
      "implementation_scope",
      "change_description",
    ];
    const missing = requiredFields.filter(
      (f) => !crForm[f] || crForm[f].toString().trim() === ""
    );
    if (missing.length) {
      toast.error(`Field wajib belum lengkap: ${missing.join(", ")}`);
      return;
    }

    // try {
    //   const res = await ProxyUrl.post(`/change-requests`, crForm);
    //   console.log(res.data);
    //   toast.success("CR Form berhasil disimpan!");
    //   // Navigate to next step (IT form) after success
    //   router.replace(`/helpdesk/tiket/all-ticket`);
    // } catch (error) {
    //   console.log(error);
    // }

    toast.promise(ProxyUrl.post(`/change-requests`, crForm), {
      loading: "Menyimpan Change Request Form...",
      success: () => {
        // Navigate to next step (IT form) after success
        router.replace(`/helpdesk/tiket/all-ticket`);
        return "CR Form berhasil disimpan!";
      },
      error: (err) =>
        err?.response?.data?.message
          ? err.response.data.message
          : "Gagal menyimpan CR Form.",
    });
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Formulir Agent</h1>
          <button
            onClick={handleCRSubmit}
            disabled={loading}
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
            form={crForm}
            onFormChange={setCrForm}
          />
        )}
      </HelpdeskLayout>
    </div>
  );
}
