"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import TiketDetails from "@/components/Helpdesk/Tiket/TiketDetails";
import { ProxyUrl } from "@/api/BaseUrl";

export default function Page() {
  const params = useParams();
  const ticketNo = params.id;
  const [data, setData] = useState(null);

  const dummyData = [
    {
      ticket_id: "SCRQ – ERP HRIS – 09/01/202025 – 001",
      status: "Open",
      submitted_at: "2025-08-04 08:10:00+07:00",
      lampiran: ["error_screenshot.png"],
      nama_aplikasi: "ERP HRIS",
      nama_divisi: "HCM Umum",
      nama_requester: "Sinta Ayu Larasati",
      no_wa: "081234567890",
      email: "sinta.larasati@company.com",
      deskripsi_tiket:
        "Tidak bisa melakukan input Cuti sejak tadi pagi. Error muncul 'Server Timeout'.",
    },
    {
      ticket_id: "SCRQ – ERP FM – 09/01/202025 – 001",
      status: "In Progress",
      submitted_at: "2025-08-03 14:20:00+07:00",
      team: "Functional -  SLA High Priority",
      assigned_to: "Budi Santosa",
      priority: "High",
      sla_policy: "SLA High Priority",
      tipe: "SCRQ",
      lampiran: ["form_gagal_upload.jpg"],
      nama_aplikasi: "ERP FM",
      nama_divisi: "Keuangan",
      nama_requester: "Daniel Siregar",
      no_wa: "+6282123456789",
      email: "daniel.siregar@company.com",
      deskripsi_tiket:
        "Saat upload file CSV untuk pajak, muncul error 'Invalid format'.",
    },
    {
      ticket_id: "SCRQ – Fuel Monitoring - 09/01/202025 – 001 ",
      status: "Resolved",
      submitted_at: "2025-08-02 09:45:00+07:00",
      team: "Tech – SLA Medium Priority",
      assigned_to: "Nina Kurnia",
      priority: "Sedang",
      sla_policy: "SLA Medium Priority",
      tipe: "SCRQ",
      lampiran: ["topologi.png"],
      nama_aplikasi: "VPN Remote Access",
      nama_divisi: "Audit Internal",
      nama_requester: "Rizky Pratama",
      no_wa: "081576543210",
      email: "rizky.pratama@company.com",
      deskripsi_tiket:
        "Memerlukan akses ke server audit via VPN untuk pengecekan log.",
      feedback: [
        {
          oleh: "Nina Kurnia",
          waktu: "2025-08-03T09:40:00+07:00",
          isi: "VPN sudah diaktifkan, silakan coba login kembali.",
        },
        {
          oleh: "Rizky Pratama",
          waktu: "2025-08-03T10:22:00+07:00",
          isi: "Terima kasih, akses sudah bisa digunakan. Fast response!",
        },
      ],
    },
  ];

  const getDataTicket = async () => {
    try {
      const res = await ProxyUrl.get(`/tickets/${ticketNo}`);
      const data = res.data.data || {};
      setData(data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    getDataTicket();
  }, [ticketNo]);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        {/* <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold ">Tiket {ticketNo}</h1>
          <select onChange={(e) => setSelectedIndex(e.target.value)}>
            <option value="0">OPEN</option>
            <option value="1">IN PROGRESS</option>
            <option value="2">RESOLVED</option>
          </select>
        </div> */}
        <TiketDetails data={data} />
      </HelpdeskLayout>
    </div>
  );
}
