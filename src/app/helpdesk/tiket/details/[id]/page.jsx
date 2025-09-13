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
        <div className="flex items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold ">Tiket {data?.subject}</h1>
        </div>
        <TiketDetails data={data} />
      </HelpdeskLayout>
    </div>
  );
}
