"use client";
import DetailTicketForm from "@/components/Beranda/Ticket/DetailTicket/DetailTicketForm";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";

export default function Page() {
  const [data, setData] = useState(null);

  const params = useParams();
  const tiketId = params.id;

  const dataTiket = {
    ticket_detail: {
      created_name: "Faye Puteri",
      division_name: "IT",
      email: "faye@gmail.com",
      whatsapp_number: "08123456789",
      application_name: "e-Procurement",
      ticket_subject: "Tidak bisa meng-input field Deskripsi Tender",
      ticket_description:
        "<p>Mohon bantuannya, field Deskripsi Tender tidak dapat diinput.</p>",
      attachments: [
        {
          file_name: "photo.jpg",
          file_type: "image/jpg",
          file_size_kb: 571,
          file_base64: "<BASE64_STRING>",
        },
      ],
      submitted_at: "2025-07-30 13:10:00+07:00",
      ticket_status: "Resolved",
    },
    comment_thread: [
      {
        timestamp: "2025-07-30 13:11:00+07:00",
        role: "User",
        comment_by: "Faye Puteri",
        message: "Mohon segera dibantu ya, ini urgent. 🙏",
      },
      {
        timestamp: "2025-07-30 13:25:00+07:00",
        role: "Helpdesk",
        comment_by: "Nando (Helpdesk)",
        message: "Tiket sudah kami terima, akan diteruskan ke tim terkait.",
      },
      {
        timestamp: "2025-07-30 14:10:00+07:00",
        role: "IT Support",
        comment_by: "Sarah (IT Support)",
        message:
          "Kami sedang cek modul e-Procurement-nya ya kak. Tunggu update selanjutnya.",
      },
      {
        timestamp: "2025-07-30 15:00:00+07:00",
        role: "IT Support",
        comment_by: "Sarah (IT Support)",
        message: "Sudah kami perbaiki. Silakan dicoba kembali. 🙌",
      },
      {
        timestamp: "2025-07-30 15:05:00+07:00",
        role: "User",
        comment_by: "Faye Puteri",
        message:
          "Oke, sekarang sudah bisa input. Terima kasih banyak ya tim IT! 🤝",
      },
    ],
  };

  const getDataTiketById = async (id) => {
    try {
      const res = await ProxyUrl.get(`/tickets/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTiketById(tiketId);
  }, [tiketId]);

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

          <DetailTicketForm data={dataTiket} />
        </div>
      </MainLayout>
    </div>
  );
}
