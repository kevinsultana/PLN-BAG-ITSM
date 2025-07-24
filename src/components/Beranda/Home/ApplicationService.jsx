import React from "react";
import { RiShip2Fill, RiAlignItemVerticalCenterFill } from "react-icons/ri";
import { MdTableChart, MdMarkEmailUnread } from "react-icons/md";
import { BiSolidBarChartAlt2, BiWorld } from "react-icons/bi";
import { TbChartGridDotsFilled, TbChartPieFilled } from "react-icons/tb";
import { PiTreeStructure } from "react-icons/pi";
import { BsCloudFill } from "react-icons/bs";
import { HiPresentationChartBar } from "react-icons/hi";
import CardBag from "./CardBag";

export default function ApplicationService() {
  const dataApps = [
    {
      title: "ERP CRM",
      desc: "Solusi aplikasi untuk mengelola interaksi dengan pemberi kerja, mitra dan rincian shipment, volume angkutan, rute, tarif hingga laporan penjualan.",
      icon: <MdTableChart />,
    },
    {
      title: "ERP FM",
      desc: "Solusi aplikasi untuk mengelola dan meningkatkan akurasi data, menyediakan visibilitas yang baik terhadap fundamental keuangan dan laporan keuangan korporat.",
      icon: <BiSolidBarChartAlt2 />,
    },
    {
      title: "ERP MM",
      desc: "Solusi aplikasi untuk mengelola standarisasi, pengelompokan, pemantauan dan integrasi material pada seluruh manajemen rantai pasok.",
      icon: <TbChartGridDotsFilled />,
    },
    {
      title: "ERP HCM",
      desc: "Solusi aplikasi untuk mengelola struktur organisasi perusahaan, kepegawaian, payroll benefit lainnya, perjalanan dinas, kehadiran, employee self service",
      icon: <PiTreeStructure />,
    },
    {
      title: "Ship Tracking",
      desc: "Solusi aplikasi untuk mengelola Rencana Perjalanan Kapal (RPK) armada milik dengan dukungan peta digital dan satelit secara real time.",
      icon: <RiShip2Fill />,
    },
    {
      title: "PMS",
      desc: "Solusi aplikasi untuk meningkatkan dan mengelola kualitas perencanaan, pengendalian, pemeliharaan dan dokumentasi secara digital pada Kapal Milik.",
      icon: <TbChartPieFilled />,
    },
    {
      title: "Email",
      desc: "Solusi aplikasi untuk mendukung komunikasi internal dan eksternal pada perusahaan.",
      icon: <MdMarkEmailUnread />,
    },
    {
      title: "Website",
      desc: "Solusi aplikasi untuk meningkatkan kontribusi pada pertumbuhan perusahaan dengan melibatkan interaksi dengan pelanggan dan menyediakan informasi korporat.",
      icon: <BiWorld />,
    },
    {
      title: "BAg Cloud",
      desc: "Solusi layanan penyimpanan online dengan kapabilitas live editing, sharing file, integrasi data aplikasi, dan pengaturan role user.",
      icon: <BsCloudFill />,
    },
    {
      title: "Fuel Mentoring",
      desc: "Solusi aplikasi untuk memantau konsumsi bahan bakar dan mengelola operasional bahan bakar Kapal Milik secara real time.",
      icon: <HiPresentationChartBar />,
    },
    {
      title: "e-Procurement",
      desc: "Solusi aplikasi untuk mengelola standarisasi pengadaan barang/ jasa, daftar penyedia terseleksi, dan mendukung proses Supply Chain Management (SCM).",
      icon: <RiAlignItemVerticalCenterFill />,
    },
  ];
  return (
    <div className="p-5 bg-white flex flex-col gap-7 rounded-2xl">
      <p className="text-xl font-bold text-black">BAG Application Services</p>
      <div className="grid grid-rows-4 grid-cols-3 gap-x-4 gap-y-8">
        {dataApps.map((item, index) => (
          <CardBag key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
