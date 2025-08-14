"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";

export default function CreateTicketForm() {
  const [form, setForm] = useState({
    team: "",
    namaAplikasi: "",
    assignedTo: "",
    requester: "",
    priority: "",
    namaDivisi: "",
    tipe: "",
    email: "",
    slaPolicy: "",
    noWhatsapp: "",
    lampiran: "",
    deskripsi: "",
  });

  const [errors, setErrors] = useState({});

  const dataTeams = ["Functional", "Technical"];
  const dataPriorities = ["Kritis", "Tinggi", "Sedang", "Rendah"];
  const dataTipe = ["INFR", "SCRQ", "INSP", "CRQS"];
  const dataSLAs = [
    "SLA - Critical Incident",
    "SLA - Low Priority",
    "SLA - Emergency Access",
  ];

  const priorityColors = {
    Kritis: "text-red-500",
    Tinggi: "text-orange-500",
    Sedang: "text-yellow-500",
    Rendah: "text-green-500",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(form)) {
      if (
        (typeof value === "string" && !value.trim()) ||
        (key === "deskripsi" && !value.trim()) ||
        !value
      ) {
        newErrors[key] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Lengkapi data di bawah ini", {
        description: "Silahkan lengkapi semua field yang ditandai (*).",
      });
      return;
    }
    console.log("Submitted Data:", form);
    toast.success("Formulir berhasil disubmit!", {
      description: "Data tiket telah berhasil disimpan.",
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat Tiket</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Team */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Team<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="team"
              value={form.team}
              onChange={handleChange}
              className={`input ${errors.team ? "border-red-500" : ""}`}
            >
              <option value="">Pilih Team</option>
              {dataTeams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nama Aplikasi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Aplikasi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaAplikasi"
            value={form.namaAplikasi}
            onChange={handleChange}
            className={`input ${errors.namaAplikasi ? "border-red-500" : ""}`}
            placeholder="Nama Aplikasi"
          />
        </div>

        {/* Assigned To */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Assigned to<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className={`input ${errors.assignedTo ? "border-red-500" : ""}`}
            placeholder="Jordi Amat"
          />
        </div>

        {/* Requester */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Requester<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="requester"
            value={form.requester}
            onChange={handleChange}
            className={`input ${errors.requester ? "border-red-500" : ""}`}
            placeholder="Jhon Doe"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Priority<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={`input appearance-none cursor-pointer ${
                errors.priority ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Priority</option>
              {dataPriorities.map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              {form.priority && (
                <span
                  className={`h-3 w-3 rounded-full mr-2 ${priorityColors[
                    form.priority
                  ]?.replace("text", "bg")}`}
                />
              )}
              <RiArrowDownSLine />
            </div>
          </div>
        </div>

        {/* Nama Divisi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Divisi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaDivisi"
            value={form.namaDivisi}
            onChange={handleChange}
            className={`input ${errors.namaDivisi ? "border-red-500" : ""}`}
            placeholder="Accounting"
          />
        </div>

        {/* Tipe */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Tipe<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="tipe"
              value={form.tipe}
              onChange={handleChange}
              className={`input ${errors.tipe ? "border-red-500" : ""}`}
            >
              <option value="">Pilih Tipe</option>
              {dataTipe.map((tipe, index) => (
                <option key={index} value={tipe}>
                  {tipe}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`input ${errors.email ? "border-red-500" : ""}`}
            placeholder="jhondoe@gmail.com"
          />
        </div>

        {/* SLA Policy */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            SLA Policy<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="slaPolicy"
              value={form.slaPolicy}
              onChange={handleChange}
              className={`input ${errors.slaPolicy ? "border-red-500" : ""}`}
            >
              <option value="">Pilih SLA Policy</option>
              {dataSLAs.map((sla, index) => (
                <option key={index} value={sla}>
                  {sla}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* No. Whatsapp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            No. Whatsapp<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="noWhatsapp"
            value={form.noWhatsapp}
            onChange={handleChange}
            className={`input ${errors.noWhatsapp ? "border-red-500" : ""}`}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Lampiran */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Lampiran<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Maks 5MB)</span>
          </label>
          <div
            className={`flex items-center input px-3 py-2 ${
              errors.lampiran ? "border-red-500" : ""
            }`}
          >
            <span className="flex-grow text-gray-500">
              {form.lampiran || "Lampirkan Dokumen / Foto"}
            </span>
            <FaExternalLinkAlt className="text-gray-500" />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 row-span-2">
          <label className="font-semibold text-sm">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <CKEditorWrapper
            value={form.deskripsi}
            onChange={(data) => setForm({ ...form, deskripsi: data })}
            className={`ckeditor-container ${
              errors.deskripsi ? "border-red-500" : ""
            }`}
            placeholder="Deskripsi"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex  gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
