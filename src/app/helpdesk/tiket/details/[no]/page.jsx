"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useTicketData } from "@/context/TicketDataContext";

export default function Page() {
  const params = useParams();
  const ticketNo = params.no;
  const { selectedDataTicket } = useTicketData();

  return <div>Page {ticketNo}</div>;
}
