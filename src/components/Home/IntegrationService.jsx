import React from "react";
import Card from "./Card";

export default function IntegrationService() {
  const dataItegration = [
    {
      title: "PLN - SIMKP",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola kinerja pegawai.",
      icon: "",
    },
    {
      title: "PLN - COS",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola kepatuhan pada tata kelola perusahaan.",
      icon: "",
    },
    {
      title: "PLN - PORTAL HC",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola data profiling kepegawaian.",
      icon: "",
    },
    {
      title: "PLN - BBO",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola transaksi angkutan batu bara.",
      icon: "",
    },
    {
      title: "PLN - AMS",
      desc: "Solusi aplikasi milik PLN Pusat untuk mengelola surat kedinasan.",
      icon: "",
    },
    {
      title: "PLN - ESS",
      desc: "Solusi aplikasi milik PLN Pusat untuk administratif informasi kepegawaian.",
      icon: "",
    },
    {
      title: "PLN - AMOR",
      desc: "Solusi aplikasi milik PLN Pusat untuk data dan informasi tata kelola organisasi.",
      icon: "",
    },
    {
      title: "PLN - EMAIL",
      desc: "Solusi aplikasi milik PLN Pusat untuk mendukung komunikasi internal dan eksternal pada perusahaan.",
      icon: "",
    },
  ];
  return (
    <div className="mx-14 my-6 py-5 px-5 bg-white rounded-2xl">
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-sm font-normal">PLN Integration Services</p>
        <h1 className="font-bold text-xl">Lihat Layanan Lainnya</h1>
      </div>
      <div className="grid grid-rows-2 grid-cols-4 gap-x-4 gap-y-8">
        {dataItegration.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
