"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import TiketDetails from "@/components/Helpdesk/Tiket/TiketDetails";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";

export default function Page() {
  const params = useParams();
  const ticketNo = params.id;
  const [data, setData] = useState(null);
  const [dataFeedback, setDataFeedback] = useState([]);

  const getDataTicket = async () => {
    try {
      const res = await ProxyUrl.get(`/tickets/${ticketNo}`);
      const data = res.data.data || {};
      setData(data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  const getDataFeedback = async () => {
    try {
      const res = await ProxyUrl.get(`/tickets/${ticketNo}/feedback`);
      const feedback = res.data.data || [];
      setDataFeedback(feedback);
    } catch (error) {
      console.error("Error fetching ticket feedback:", error);
    }
  };

  useEffect(() => {
    getDataTicket();
    getDataFeedback();
  }, [ticketNo]);

  const handleClickStart = async (status) => {
    toast.promise(ProxyUrl.put(`/tickets/${ticketNo}/status`, { status }), {
      loading: `Memperbarui status tiket...`,
      success: `Status tiket berhasil diubah ke "${status}"`,
      error: {
        render({ error }) {
          return (
            <div>
              <b>Gagal memperbarui status tiket</b>
              <div className="text-sm text-red-600">
                {error?.message || "Terjadi kesalahan jaringan atau server."}
              </div>
            </div>
          );
        },
      },
    });
    const promise = ProxyUrl.put(`/tickets/${ticketNo}/status`, { status });
    promise.then(() => getDataTicket());
  };

  const handleSubmitFeedback = async (feedback) => {
    try {
      const res = await ProxyUrl.post(`/tickets/${ticketNo}/feedback`, {
        description: feedback,
      });
      toast.success("Feedback submitted successfully");
      getDataFeedback();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  // console.log(data);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold ">Tiket {data?.subject}</h1>
        </div>
        <TiketDetails
          data={data}
          feedback={dataFeedback}
          onClickStart={() => handleClickStart("IN PROGRESS")}
          onClickPause={() => handleClickStart("ON HOLD")}
          onClickEnd={() => handleClickStart("RESOLVED")}
          onClickSubmitFeedback={handleSubmitFeedback}
        />
      </HelpdeskLayout>
    </div>
  );
}
