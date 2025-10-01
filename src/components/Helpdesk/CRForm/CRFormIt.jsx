"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

// --- Data Opsi Dropdown (Contoh - Ganti dengan data dari API Anda) ---
const optionsAplikasi = [
  { value: "e-procurement", label: "e-Procurement" },
  { value: "erp-crm", label: "ERP CRM" },
];
const optionsDB = [
  { value: "postgres-15", label: "PostgreSQL 15" },
  { value: "mysql-8", label: "MySQL 8.0" },
];
const optionsJenisData = [
  { value: "data-baru", label: "Data Baru" },
  { value: "perubahan-data", label: "Perubahan Data" },
];
const optionsHardware = [
  { value: "server-a", label: "Server A" },
  { value: "server-b", label: "Server B" },
];
const optionsSoftware = [
  { value: "windows-server", label: "Windows Server 2022" },
  { value: "linux-ubuntu", label: "Linux Ubuntu 22.04" },
];
const optionsJenisRisiko = [
  { value: "rendah", label: "Rendah" },
  { value: "sedang", label: "Sedang" },
  { value: "tinggi", label: "Tinggi" },
];

// --- Komponen Pembantu ---

function InputField({ label, required, readOnly = false, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        readOnly={readOnly}
        className="input read-only:bg-gray-100 read-only:cursor-not-allowed"
      />
    </div>
  );
}

function TextareaField({ label, required, readOnly = false, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        readOnly={readOnly}
        className="input read-only:bg-gray-100 read-only:cursor-not-allowed"
      />
    </div>
  );
}

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

// --- Komponen Utama ---

export default function CRFormIt({ data = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    // Kolom Tengah
    jenisAplikasi: "",
    namaDb: "",
    aplikasiDatabase: "",
    jenisData: "",
    namaHardware: "",
    namaSoftware: "",
    versiSoftware: "",
    teknologiBaru: "",
    ruangLingkup: "",
    // Kolom Kanan
    dampakImplementasi: "",
    teknologiData: "",
    planImplementasi: "",
    rencanaRollback: "",
    rencanaTesting: "",
    jenisRisiko: "",
    mitigasiRisiko: "",
    estimasiWaktu: "",
    personelBiaya: "",
    catatan: "",
    // Digital Approval
    tanggalApproval: "",
    statusApproval: "Diterima",
    namaApproval: "Nama Approval + NIK",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    } else {
      // console.log("Form Submitted:", form);
      toast.success("Form Change Request (IT) berhasil dikirim.");
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
        (Formulir ini diisi oleh PIC IT dan BPO IT serta disetujui oleh Business
        Process Owner sebelum diberikan kepada Service Desk / Help Desk)
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* --- KOLOM KIRI (READONLY) --- */}
          <div className="flex flex-col gap-6">
            <InputField label="Lampiran" value="Photo.JPG" readOnly />
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
              label="Jenis Risiko"
              name="jenisRisiko"
              value={form.jenisRisiko}
              onChange={handleChange}
              options={optionsJenisRisiko}
              required
            />
            <InputField
              label="Mitigasi Risiko"
              name="mitigasiRisiko"
              value={form.mitigasiRisiko}
              onChange={handleChange}
              placeholder="Mitigasi Risiko"
              required
            />
            <InputField
              label="Estimasi Waktu Pengerjaan"
              name="estimasiWaktu"
              value={form.estimasiWaktu}
              onChange={handleChange}
              placeholder="Estimasi Waktu Pengerjaan"
              required
            />
            <InputField
              label="Personel Biaya"
              name="personelBiaya"
              value={form.personelBiaya}
              onChange={handleChange}
              placeholder="Rp. 0,-"
              required
            />
            <TextareaField
              label="Catatan / Keterangan"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Tambahkan Catatan / Keterangan"
              rows={3}
            />
            <TextareaField
              label="Rencana Testing"
              name="rencanaTesting"
              value={form.rencanaTesting}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Testing"
              required
              rows={3}
            />
          </div>

          {/* --- KOLOM KANAN (EDITABLE) --- */}
          <div className="flex flex-col gap-6">
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
            <InputField
              label="Teknologi Baru"
              name="teknologiBaru"
              value={form.teknologiBaru}
              onChange={handleChange}
              placeholder="Tambahkan Teknologi Baru"
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
              rows={3}
            />
            <TextareaField
              label="Teknologi Data"
              name="teknologiData"
              value={form.teknologiData}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Plan Implementasi"
              name="planImplementasi"
              value={form.planImplementasi}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Rencana Rollback"
              name="rencanaRollback"
              value={form.rencanaRollback}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Rollback"
              required
              rows={3}
            />
          </div>
        </div>

        {/* --- DIGITAL APPROVAL SECTION --- */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Digital Approval</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Tanggal"
              name="tanggalApproval"
              value={form.tanggalApproval}
              onChange={handleChange}
              type="date"
              placeholder="DD/MM/YYYY"
            />
            <InputField
              label="Status Approval"
              name="statusApproval"
              value={form.statusApproval}
              readOnly
            />
            <InputField
              label="Nama Approval"
              name="namaApproval"
              value={form.namaApproval}
              readOnly
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
