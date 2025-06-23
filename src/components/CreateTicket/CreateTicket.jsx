import React from "react";
import FormTiket from "./FormTiket";

export default function CreateTicket() {
  return (
    <div className="bg-slate-100 py-6 px-14">
      <div className=" bg-white rounded-xl pb-4">
        <div className="flex justify-between items-center p-5 ">
          <h1 className="text-2xl font-bold">Buat Tiket</h1>
          <p className="text-sm text-slate-500">
            Beranda / Helpdesk / Buat Tiket
          </p>
        </div>
        <FormTiket title={"Nama Lengkap"} placeholder={"Nama Lengkap"} />
        <FormTiket title={"Nama Departemen"} placeholder={"Nama Departemen"} />
        <FormTiket title={"Email"} placeholder={"Email"} />
        <FormTiket title={"No. Whatsapp"} placeholder={"08xxxxxxx"} />
        <FormTiket title={"Nama Aplikasi"} placeholder={"Nama Aplikasi"} />
        <FormTiket title={"Subjek Tiket"} placeholder={"Subjek Tiket"} />
        <FormTiket title={"Deskripsi Tiket"} placeholder={"Deskripsi Tiket"} />
        <FormTiket title={"Lampirkan foto"} placeholder={"Lampirkan foto"} />
        <div className="flex gap-4 ">
          <div className="w-1/5" />
          <button className="bg-blue-600 hover:bg-blue-800 text-white text-lg font-bold py-2 px-6 rounded-lg transition-all duration-200">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
