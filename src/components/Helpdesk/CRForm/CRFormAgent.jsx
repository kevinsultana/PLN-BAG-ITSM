"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FaTimes } from "react-icons/fa";

// Data Opsi Dropdown (Contoh - Ganti dengan data dari API Anda)
const optionsJenisData = [
  { value: "data-baru", label: "Data Baru" },
  { value: "perubahan-data", label: "Perubahan Data" },
];
const optionsAplikasi = [
  { value: "e-procurement", label: "e-Procurement" },
  { value: "erp-crm", label: "ERP CRM" },
];
const optionsHardware = [
  { value: "server-a", label: "Server A" },
  { value: "server-b", label: "Server B" },
];
const optionsSoftware = [
  { value: "windows-server", label: "Windows Server 2022" },
  { value: "linux-ubuntu", label: "Linux Ubuntu 22.04" },
];
const optionsDB = [
  { value: "postgres-15", label: "PostgreSQL 15" },
  { value: "mysql-8", label: "MySQL 8.0" },
];

export default function CRFormAgent({ data = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    jenisAplikasi: "",
    namaDb: "",
    aplikasiDatabase: "",
    jenisData: "",
    namaHardware: "",
    namaSoftware: "",
    versiSoftware: "",
    ruangLingkup: "",
    dampakImplementasi: "",
    catatan: "",
    lampiran: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file tidak boleh melebihi 5MB.");
      return;
    }
    setForm((prev) => ({ ...prev, lampiran: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    } else {
      console.log("Form Submitted:", form);
      toast.success("Form Change Request berhasil dikirim.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <header className="flex justify-between items-start mb-4">
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold text-gray-800">
            CHANGE REQUEST DIGITALISASI PROCESS
          </h1>
          <h2 className="text-xl font-bold">CHANGE REQUEST FORM</h2>
        </div>
        <Image
          src="/logoNavbar.png"
          alt="Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </header>
      <p className="text-center text-sm text-gray-600 mb-6">
        Formulir ini diisi oleh PIC Agent Helpdesk dan perlu disetujui oleh IT &
        BPO Terkait
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FileInput
              label="Lampiran"
              name="lampiran"
              file={form.lampiran}
              onChange={handleFileChange}
              onClear={() => setForm((prev) => ({ ...prev, lampiran: null }))}
              inputRef={fileInputRef}
              hint="Maks 5MB"
            />
            <InputField
              label="Nama Divisi"
              value={data?.division?.name || "Accounting"}
              readOnly
            />
            <InputField
              label="Requester"
              value={data?.requester?.name || "Jhon Doe"}
              readOnly
            />
            <InputField
              label="Email"
              value={data?.requester?.email || "jhondoe@gmail.com"}
              readOnly
            />
            <InputField
              label="No. Whatsapp"
              value={data?.whatsapp || "081238765412"}
              readOnly
            />
            <TextareaField
              label="Deskripsi"
              value={
                data?.description ||
                "Mohon untuk segera merespon reset password"
              }
              readOnly
              rows={4}
            />
            <InputField
              label="Nama Aplikasi"
              value={data?.application?.name || "e-Procurement"}
              readOnly
            />
            <TextareaField
              label="Deskripsi Aplikasi"
              value="Solusi aplikasi untuk mengelola standarisasi pengadaan barang/ jasa, daftar penyedia terseleksi, dan mendukung proses Supply Chain Management (SCM)."
              readOnly
              rows={4}
            />
            <SelectField
              label="Jenis Aplikasi"
              name="jenisAplikasi"
              value={form.jenisAplikasi}
              onChange={handleChange}
              options={optionsAplikasi}
              required
            />
            <SelectField
              label="Nama DB"
              name="namaDb"
              value={form.namaDb}
              onChange={handleChange}
              options={optionsDB}
              required
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SelectField
              label="Aplikasi / Database"
              name="aplikasiDatabase"
              value={form.aplikasiDatabase}
              onChange={handleChange}
              options={optionsAplikasi}
              required
            />
            <SelectField
              label="Jenis Data"
              name="jenisData"
              value={form.jenisData}
              onChange={handleChange}
              options={optionsJenisData}
              required
            />
            <SelectField
              label="Nama Hardware"
              name="namaHardware"
              value={form.namaHardware}
              onChange={handleChange}
              options={optionsHardware}
              required
            />
            <SelectField
              label="Nama Software"
              name="namaSoftware"
              value={form.namaSoftware}
              onChange={handleChange}
              options={optionsSoftware}
              required
            />
            <InputField
              label="Versi Software"
              name="versiSoftware"
              value={form.versiSoftware}
              onChange={handleChange}
              placeholder="Pilih Software"
              required
            />
            <TextareaField
              label="Ruang Lingkup Implementasi CR"
              name="ruangLingkup"
              value={form.ruangLingkup}
              onChange={handleChange}
              placeholder="Tambahkan Lingkup Implementasi CR"
              required
              rows={4}
            />
            <TextareaField
              label="Dampak Implementasi"
              name="dampakImplementasi"
              value={form.dampakImplementasi}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              required
              rows={4}
            />
            <TextareaField
              label="Catatan / Keterangan"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Tambahkan Catatan / Keterangan"
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

// Sub-komponen untuk input
function InputField({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="input read-only:bg-gray-100 read-only:cursor-not-allowed"
      />
    </div>
  );
}

// Sub-komponen untuk Textarea
function TextareaField({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        className="input read-only:bg-gray-100 read-only:cursor-not-allowed"
      />
    </div>
  );
}

// Sub-komponen untuk Select/Dropdown
function SelectField({ label, required, options = [], ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select {...props} className="input appearance-none">
        <option value="">Pilih {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Sub-komponen untuk File Input
function FileInput({ label, hint, file, onClear, inputRef, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {hint && <span className="text-xs text-gray-500 ml-2">({hint})</span>}
      </label>
      {file ? (
        <div className="flex items-center justify-between input bg-gray-100">
          <span className="text-sm text-gray-700 truncate">{file.name}</span>
          <button type="button" onClick={onClear} className="ml-2 text-red-500">
            <FaTimes />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="input text-left text-gray-500"
        >
          Pilih file...
        </button>
      )}
      <input type="file" ref={inputRef} className="hidden" {...props} />
    </div>
  );
}
