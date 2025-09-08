"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import TicketTypeTable from "@/components/Helpdesk/config/TicketType/TicketTypeTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleNewTicketType = () => {
    router.push("/helpdesk/config/ticket-type/new");
  };

  const getData = async () => {
    try {
      const response = await ProxyUrl.get("/ticket-types");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TicketTypeTable onClickNewTicketType={handleNewTicketType} />
      </HelpdeskLayout>
    </div>
  );
}
