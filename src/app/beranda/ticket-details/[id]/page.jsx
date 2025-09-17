"use client";
import DetailTicketForm from "@/components/Beranda/Ticket/DetailTicket/DetailTicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const params = useParams();
  const tiketId = params.id;

  const getDataTiketById = async (id) => {
    try {
      const res = await ProxyUrl.get(`/tickets/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFeedback = async (id) => {
    try {
      const res = await ProxyUrl.get(`/tickets/${id}/feedback`);
      setFeedback(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTiketById(tiketId);
    getDataFeedback(tiketId);
  }, [tiketId]);

  const handleSubmitFeedback = async (feedback) => {
    const data = { description: feedback };
    const toastId = toast.loading("Mengirim feedback...");
    try {
      await ProxyUrl.post(`/tickets/${tiketId}/feedback`, data);
      getDataFeedback(tiketId);
      toast.success("Feedback berhasil dikirim", { duration: 3000 });
    } catch (error) {
      toast.error("Gagal mengirim feedback", { duration: 3000 });
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col gap-6 py-6 px-14">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Beranda</h1>
            <button className="text-white bg-sky-400 px-4 py-2 rounded-2xl">
              {data?.status}
            </button>
          </div>

          <DetailTicketForm
            data={data}
            feedback={feedback}
            onClickSubmitFeedback={handleSubmitFeedback}
          />
        </div>
      </MainLayout>
    </div>
  );
}
