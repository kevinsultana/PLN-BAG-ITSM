"use client";
import TicketForm from "@/components/Beranda/Ticket/NewTicket/TicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [tiketSelection, setTiketSelection] = useState({});

  const router = useRouter();

  const getTiketSelection = async () => {
    try {
      const res = await ProxyUrl.get("/tickets/users/selections");
      setTiketSelection(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTiketSelection();
  }, []);

  const handleSubmitTicket = async (data) => {
    try {
      const res = await ProxyUrl.post("/tickets/users", data);
      if (res.data.success === true) {
        toast.success("Tiket berhasil dibuat!");
        router.back();
      } else {
        throw new Error(res.data.message || "Gagal membuat tiket.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal membuat tiket.");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Beranda</h1>
          <TicketForm
            dataSelection={tiketSelection}
            onSubmit={handleSubmitTicket}
          />
        </div>
      </MainLayout>
    </div>
  );
}
