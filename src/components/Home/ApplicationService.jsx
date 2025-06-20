import React from "react";
import { RiShip2Fill } from "react-icons/ri";
import Card from "./Card";

export default function ApplicationService() {
  const dataApps = [
    {
      title: "ERP CRM",
      desc: "Solusi aplikasi untuk mengelola interaksi dengan pemberi kerja, mitra dan rincian shipment, volume angkutan, rute, tarif hingga laporan penjualan.",
      icon: "",
    },
    {
      title: "ERP FM",
      desc: "Solusi aplikasi untuk mengelola dan meningkatkan akurasi data, menyediakan visibilitas yang baik terhadap fundamental keuangan dan laporan keuangan korporat.",
      icon: "",
    },
    {
      title: "ERP MM",
      desc: "Solusi aplikasi untuk mengelola standarisasi, pengelompokan, pemantauan dan integrasi material pada seluruh manajemen rantai pasok.",
      icon: "",
    },
    {
      title: "Ship Tracking",
      desc: "Solusi aplikasi untuk mengelola Rencana Perjalanan Kapal (RPK) armada milik dengan dukungan peta digital dan satelit secara real time.",
      icon: <RiShip2Fill />,
    },
    {
      title: "PMS",
      desc: "Solusi aplikasi untuk meningkatkan dan mengelola kualitas perencanaan, pengendalian, pemeliharaan dan dokumentasi secara digital pada Kapal Milik.",
      icon: "",
    },
    {
      title: "Fuel Mentoring",
      desc: "Solusi aplikasi untuk memantau konsumsi bahan bakar dan mengelola operasional bahan bakar Kapal Milik secara real time.",
      icon: "",
    },
    {
      title: "Website",
      desc: "Solusi aplikasi untuk meningkatkan kontribusi pada pertumbuhan perusahaan dengan melibatkan interaksi dengan pelanggan dan menyediakan informasi korporat.",
      icon: "",
    },
    {
      title: "Email",
      desc: "Solusi aplikasi untuk mendukung komunikasi internal dan eksternal pada perusahaan.",
      icon: "",
    },
    {
      title: "ERP HCM",
      desc: "Solusi aplikasi untuk mengelola struktur organisasi perusahaan, kepegawaian, payroll benefit lainnya, perjalanan dinas, kehadiran, employee self service, dan memastikan peraturan ketenagakerjaan diakomodir pada sistem yang terpercaya.",
      icon: "",
    },
    {
      title: "e-Procurement",
      desc: "Solusi aplikasi untuk mengelola standarisasi pengadaan barang/ jasa, daftar penyedia terseleksi, dan mendukung proses Supply Chain Management (SCM).",
      icon: "",
    },
    {
      title: "BAg Cloud",
      desc: "Solusi layanan penyimpanan online dengan kapabilitas live editing, sharing file, integrasi data aplikasi, dan pengaturan role user.",
      icon: "",
    },
  ];
  return (
    <div className="mx-14 py-5 px-5 bg-white rounded-2xl">
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-sm font-normal">BAG Application Services</p>
        <h1 className="font-bold text-xl">Lihat Layanan Kami</h1>
      </div>
      <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8">
        {dataApps.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
