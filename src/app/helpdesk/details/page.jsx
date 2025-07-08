"use client";

import { useSearchParams } from "next/navigation";

export default function DetailPage() {
  const searchParams = useSearchParams();
  const kode = searchParams.get("kode");
  const deskripsi = searchParams.get("deskripsi");
  const requester = searchParams.get("requester");
  const tanggal = searchParams.get("tanggal");
  const status = searchParams.get("status");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Detail Tiket</h1>
      <p>
        <strong>Kode:</strong> {kode}
      </p>
      <p>
        <strong>Deskripsi:</strong> {deskripsi}
      </p>
      <p>
        <strong>Requester:</strong> {requester}
      </p>
      <p>
        <strong>Tanggal:</strong> {tanggal}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}
