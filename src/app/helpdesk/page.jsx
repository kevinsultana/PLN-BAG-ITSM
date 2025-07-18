"use client";

import MainLayout from "@/components/Layout/MainLayout";
import React from "react";
import { FaPlus } from "react-icons/fa";
import TableHelpDesk from "@/components/HelpDesk/TableHelpDesk";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const handleClick = (i) => {
    const query = new URLSearchParams({
      kode: i.kode,
      deskripsi: i.deskripsi,
      requester: i.requester,
      tanggal: i.tanggal,
      status: i.status,
    }).toString();
    router.push(`/helpdesk/details/?${query}`);
  };
  return (
    <div className="bg-slate-100 h-full">
      <MainLayout>
        <div className="flex flex-col gap-6 py-6 px-10">
          <h1 className="text-2xl font-bold">Helpdesk</h1>
          <div className=" bg-white p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">List Tiket</h2>
              <Link
                href="/helpdesk/new"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl"
              >
                <FaPlus />
                <h3>New</h3>
              </Link>
            </div>
            <TableHelpDesk onRowClick={(i) => handleClick(i)} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
