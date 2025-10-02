"use client";
import DetailTicketForm from "@/components/Beranda/Ticket/DetailTicket/DetailTicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";
import { BACKEND_URL } from "@/api/API";
import { CircularProgress } from "@mui/material";

export default function Page() {
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const params = useParams();
  const tiketId = params.id;

  const getDataTiketById = async (id) => {
    try {
      setLoading(true);
      const res = await ProxyUrl.get(`/tickets/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal memuat data tiket");
    } finally {
      setLoading(false);
    }
  };

  const getDataFeedback = async (id, showLoading = false) => {
    try {
      if (showLoading) setFeedbackLoading(true);
      const res = await ProxyUrl.get(`/tickets/${id}/feedback`);
      setFeedback(res.data.data);
    } catch (error) {
      console.log(error);
      if (showLoading) toast.error("Gagal memuat feedback");
    } finally {
      if (showLoading) setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getDataTiketById(tiketId),
        getDataFeedback(tiketId, true),
      ]);
    };
    loadData();
  }, [tiketId]);

  const feedbackWebSocket = () => {
    const api = BACKEND_URL;
    const wsUrl =
      api.replace(/^http/, api.startsWith("https") ? "ws" : "ws") +
      `/tickets/${tiketId}/feedback/stream`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = async (event) => {
      await getDataFeedback(tiketId);
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

  const handleSubmitFeedback = async (feedbackText) => {
    const data = { description: feedbackText };
    setFeedbackLoading(true);
    const toastId = toast.loading("Mengirim feedback...");
    try {
      await ProxyUrl.post(`/tickets/${tiketId}/feedback`, data);
      await getDataFeedback(tiketId);
      toast.success("Feedback berhasil dikirim", { duration: 3000 });
    } catch (error) {
      toast.error("Gagal mengirim feedback", { duration: 3000 });
      console.log(error);
    } finally {
      setFeedbackLoading(false);
      toast.dismiss(toastId);
    }
  };

  const handleCloseStatus = async () => {
    setStatusLoading(true);
    const toastId = toast.loading("Memperbarui status tiket...");
    try {
      const res = await ProxyUrl.put(`/tickets/${tiketId}/status`, {
        status: "CLOSED",
      });
      toast.success("Status tiket berhasil diperbarui", { duration: 3000 });
      await getDataTiketById(tiketId);
    } catch (error) {
      toast.error("Gagal memperbarui status tiket", { duration: 3000 });
      console.log(error);
    } finally {
      setStatusLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Loading state untuk initial load
  if (loading) {
    return (
      <div className="bg-slate-100 min-h-screen">
        <MainLayout>
          <div className="flex flex-col items-center justify-center py-20">
            <CircularProgress size={50} sx={{ color: "#65C7D5", mb: 2 }} />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Memuat Detail Tiket
            </h2>
            <p className="text-sm text-gray-500">Mohon tunggu sebentar...</p>
          </div>
        </MainLayout>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Beranda</h1>
            <button
              onClick={handleCloseStatus}
              disabled={data?.status !== "RESOLVED" || statusLoading}
              className={`text-white bg-sky-400 px-4 py-2 rounded-2xl flex items-center gap-2 ${
                data?.status === "RESOLVED" && !statusLoading
                  ? "opacity-100 cursor-pointer hover:bg-sky-500"
                  : "opacity-60 cursor-not-allowed"
              } transition-all duration-200`}
            >
              {statusLoading && (
                <CircularProgress size={16} sx={{ color: "white" }} />
              )}
              {statusLoading ? "Memperbarui..." : data?.status || "Loading..."}
            </button>
          </div>

          {feedbackLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-700">
                <CircularProgress size={20} sx={{ color: "#3b82f6" }} />
                <span className="text-sm font-medium">
                  Memuat feedback terbaru...
                </span>
              </div>
            </div>
          )}

          <DetailTicketForm
            data={data}
            feedback={feedback}
            onClickSubmitFeedback={handleSubmitFeedback}
            feedbackLoading={feedbackLoading}
          />
        </div>
      </MainLayout>
    </div>
  );
}
