"use client";
import React from "react";
import Image from "next/image";
import renderDescription from "@/utils/RenderDesc";
import Dropdown from "@/components/Dropdown";

const optionsJenisData = [
  { value: "Database", label: "Database" },
  { value: "File", label: "File" },
  { value: "Image", label: "Image" },
];
const optionsAplikasi = [
  { value: "Website", label: "Website" },
  { value: "Desktop", label: "Desktop" },
  { value: "Mobile", label: "Mobile" },
];

const optionsAplikasiDatabase = [
  { value: "SQL Server", label: "SQL Server" },
  { value: "MySQL", label: "MySQL" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Oracle", label: "Oracle" },
];

// Controlled component: parent supplies `form` object & `onFormChange` callback.
// NOTE: Bagian Lampiran hanya ditampilkan dari `data.attachments` (view only) dan TIDAK termasuk dalam state form yang dikirim ke parent.
// Expected form shape (example): {
//   additional_notes: '', application_database: '', application_type: '',
//   change_description: '', data_type: '', database_name: '', division_name: '',
//   hardware_name: '', software_name: '', software_version: '', implementation_scope: ''
// }
export default function CRFormAgent({
  data = {},
  form = {},
  onFormChange = () => {},
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...form, [name]: value });
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

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Lampiran: hanya menampilkan lampiran existing dari tiket (view only) */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Lampiran</label>
              <div className="input flex flex-col gap-2 min-h-20">
                {Array.isArray(data?.attachments) &&
                data.attachments.length > 0 ? (
                  data.attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2">
                      {att.mime_type?.startsWith("image/") ? (
                        <img
                          src={att.url}
                          alt={att.name}
                          style={{ maxWidth: 50, maxHeight: 50 }}
                        />
                      ) : null}
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {att.name}
                      </a>
                      <span className="text-xs text-gray-500">
                        {Math.round(att.size / 1024)} KB
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400">Belum ada lampiran</span>
                )}
              </div>
            </div>

            <InputField
              label="Nama Divisi"
              value={data?.division?.name || ""}
              readOnly
            />
            <InputField
              label="Requester"
              value={data?.requester?.name || ""}
              readOnly
            />
            <InputField label="Email" value={data?.email || ""} readOnly />
            <InputField
              label="No. Whatsapp"
              value={data?.whatsapp || "081238765412"}
              readOnly
            />
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Deskripsi</label>
              <div className="input bg-gray-100 min-h-20">
                {data?.description ? renderDescription(data.description) : ""}
              </div>
            </div>
            <InputField
              label="Nama Aplikasi"
              value={data?.application?.name || ""}
              readOnly
            />
            <TextareaField
              label="Deskripsi Aplikasi"
              value="Solusi aplikasi untuk mengelola standarisasi pengadaan barang/ jasa, daftar penyedia terseleksi, dan mendukung proses Supply Chain Management (SCM)."
              readOnly
              rows={4}
            />
            <Dropdown
              label="Jenis Aplikasi"
              value={form.application_type || ""}
              dataMenus={optionsAplikasi}
              handleChange={(e) =>
                onFormChange({ ...form, application_type: e.target.value })
              }
              isRequired={true}
              initMenu="- Pilih Jenis Aplikasi -"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Dropdown
              label="Aplikasi / Database"
              value={form.application_database || ""}
              dataMenus={optionsAplikasiDatabase}
              handleChange={(e) =>
                onFormChange({
                  ...form,
                  application_database: e.target.value,
                })
              }
              isRequired={true}
              initMenu="- Pilih Aplikasi / Database -"
            />
            <Dropdown
              label="Jenis Data"
              value={form.data_type || ""}
              dataMenus={optionsJenisData}
              handleChange={(e) =>
                onFormChange({ ...form, data_type: e.target.value })
              }
              isRequired={true}
              initMenu="- Pilih Jenis Data -"
            />
            <InputField
              label="Nama Database"
              name="database_name"
              value={form.database_name || ""}
              onChange={handleChange}
              placeholder="Masukkan Nama Database"
              required
            />
            <InputField
              label="Nama Hardware"
              name="hardware_name"
              value={form.hardware_name || ""}
              onChange={handleChange}
              placeholder="Masukkan Nama Hardware"
              required
            />
            <InputField
              label="Nama Software"
              name="software_name"
              value={form.software_name || ""}
              onChange={handleChange}
              placeholder="Masukkan Nama Software"
              required
            />
            <InputField
              label="Versi Software"
              name="software_version"
              value={form.software_version || ""}
              onChange={handleChange}
              placeholder="Masukkan Versi Software"
              required
            />
            <TextareaField
              label="Ruang Lingkup Implementasi CR"
              name="implementation_scope"
              value={form.implementation_scope || ""}
              onChange={handleChange}
              placeholder="Tambahkan Lingkup Implementasi CR"
              required
              rows={4}
            />
            <TextareaField
              label="Dampak Implementasi"
              name="change_description"
              value={form.change_description || ""}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              required
              rows={4}
            />
            <TextareaField
              label="Catatan / Keterangan"
              name="additional_notes"
              value={form.additional_notes || ""}
              onChange={handleChange}
              placeholder="Tambahkan Catatan / Keterangan"
              rows={4}
            />
          </div>
        </div>
      </div>
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
