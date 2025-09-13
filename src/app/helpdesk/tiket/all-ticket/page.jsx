"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import AllListTicketTable from "@/components/Helpdesk/Tiket/AllListTicketTable";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total_pages: 1, page_size: 5 });
  const [loading, setLoading] = useState(false);

  const handleNavigateToDetails = (ticket) => {
    if (ticket?.id) {
      router.push(`/helpdesk/tiket/details/${ticket.id}`);
    }
  };

  const getDataTicket = async (page = 1) => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/tickets", {
        params: { page, page_size: 5 },
      });

      const body = res.data || {};
      const items = body?.data?.items || [];
      const meta = body?.meta || {
        page: 1,
        total_pages: 5,
        page_size: items.length,
      };

      setItems(items);
      setMeta(meta);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    getDataTicket(1);
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold mb-6">Semua Tiket</h1>
        <AllListTicketTable
          items={items}
          meta={meta}
          onRowClick={(item) => handleNavigateToDetails(item)}
          onPageChange={(newPage) => getDataTicket(newPage)}
          loading={loading}
        />
      </HelpdeskLayout>
    </div>
  );
}
