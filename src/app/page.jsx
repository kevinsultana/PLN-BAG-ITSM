import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-6 w-screen h-screen justify-center items-center">
      <button className="bg-cyan-400 cursor-pointer p-4 text-white">
        <Link href="/beranda">Beranda side</Link>
      </button>
      <button className="bg-cyan-400 cursor-pointer p-4 text-white">
        <Link href="/helpdesk">Heldesk Side</Link>
      </button>
    </div>
  );
}
