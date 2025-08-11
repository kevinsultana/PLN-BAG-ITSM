"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { useTicketData, TicketDataContext } from "@/context/TicketDataContext";

export default function Page() {
  const params = useParams();
  const ticketNo = params.no;
  const { selectedDataTicket } = useContext(TicketDataContext);
  console.log(selectedDataTicket);
  return <div>Page {ticketNo}</div>;
}
