"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import TiketDetails from "@/components/Helpdesk/Tiket/TiketDetails";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";
import { BACKEND_URL } from "@/api/API";

export default function Page() {
  const params = useParams();
  const ticketNo = params.id;
  const [data, setData] = useState(null);
  const [dataFeedback, setDataFeedback] = useState([]);
  const [dataSelection, setDataSelection] = useState({});

  const router = useRouter();

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

  const getDataSelection = async () => {
    try {
      const res = await ProxyUrl.get("/tickets/agents/selections");
      const selection = res.data.data || {};
      setDataSelection(selection);
    } catch (error) {
      console.error("Error fetching ticket selections:", error);
    }
  };

  useEffect(() => {
    getDataTicket();
    getDataFeedback();
    getDataSelection();
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
    }
  };

  const handleUpdateTiket = async (updatedData) => {
    try {
      toast.promise(ProxyUrl.put(`/tickets/${ticketNo}`, updatedData), {
        loading: `Menyimpan perubahan tiket...`,
        success: `Tiket berhasil diperbarui`,
        error: ({ error }) => (
          <div>
            <b>Gagal memperbarui tiket</b>
            <div className="text-sm text-red-600">
              {error?.message || "Terjadi kesalahan saat memperbarui tiket."}
            </div>
          </div>
        ),
      });
      await getDataTicket();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const feedbackWebSocket = () => {
    const api = BACKEND_URL;
    const wsUrl =
      api.replace(/^http/, api.startsWith("https") ? "ws" : "ws") +
      `/tickets/${ticketNo}/feedback/stream`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = async (event) => {
      await getDataFeedback();
      toast.success("Feedback baru diterima", { duration: 3000 });
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  useEffect(() => {
    feedbackWebSocket();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold ">Tiket {data?.subject}</h1>
        </div>
        <TiketDetails
          data={data}
          feedback={dataFeedback}
          selections={dataSelection}
          onClickStart={() => handleClickStart("IN PROGRESS")}
          onClickPause={() => handleClickStart("ON HOLD")}
          onClickEnd={() => handleClickStart("RESOLVED")}
          onClickSubmitFeedback={handleSubmitFeedback}
          onClickUpdateTiket={handleUpdateTiket}
          onClickCRForm={() =>
            router.push(`/helpdesk/tiket/cr-form/agent/${data?.id}`)
          }
        />
      </HelpdeskLayout>
    </div>
  );
}
