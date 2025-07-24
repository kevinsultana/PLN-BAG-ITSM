import React from "react";
import CardPln from "./CardPln";
import { MdSupervisorAccount, MdAccountTree } from "react-icons/md";
import { FaDiagramPredecessor, FaPeopleArrows } from "react-icons/fa6";
import { BiSolidComponent } from "react-icons/bi";
import { SiAfterpay } from "react-icons/si";
import { PiNotepadFill } from "react-icons/pi";
import { IoMdMailOpen } from "react-icons/io";

export default function IntegrationService() {
  const dataItegration = [
    {
      title: "PLN - SIMKP",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola kinerja pegawai.",
      icon: <MdSupervisorAccount />,
    },
    {
      title: "PLN - COS",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola kepatuhan pada tata kelola perusahaan.",
      icon: <FaDiagramPredecessor />,
    },
    {
      title: "PLN - PORTAL HC",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola data profiling kepegawaian.",
      icon: <FaPeopleArrows />,
    },
    {
      title: "PLN - BBO",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola transaksi angkutan batu bara.",
      icon: <BiSolidComponent />,
    },
    {
      title: "PLN - AMS",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola surat kedinasan.",
      icon: <SiAfterpay />,
    },
    {
      title: "PLN - ESS",
      desc: "Solusi aplikasi milik PLN Pusat untuk administratif informasi kepegawaian.",
      icon: <PiNotepadFill />,
    },
    {
      title: "PLN - AMOR",
      desc: "Solusi aplikasi milik PLN Pusat untuk data dan informasi tata kelola organisasi.",
      icon: <MdAccountTree />,
    },
    {
      title: "PLN - EMAIL",
      desc: "Solusi aplikasi milik PLN Pusat untuk mendukung komunikasi internal dan eksternal pada perusahaan.",
      icon: <IoMdMailOpen />,
    },
  ];
  return (
    <div className=" flex flex-col gap-6 py-5 px-5 bg-white">
      <p className="text-xl font-bold">PLN Integration Services</p>

      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {dataItegration.map((item, index) => (
          <CardPln key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
