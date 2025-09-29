"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import renderDescription from "@/utils/RenderDesc";
import Dropdown from "@/components/Dropdown";

const optionsJenisRisiko = [
  { value: "rendah", name: "Rendah" },
  { value: "sedang", name: "Sedang" },
  { value: "tinggi", name: "Tinggi" },
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

export default function CRFormItBeranda({
  data = {},
  onSubmit,
  onCancel,
  dataTicket,
}) {
  const [form, setForm] = useState({
    // API properties - directly match API field names
    application_type: data?.application_type || "",
    database_name: data?.database_name || "",
    application_database: data?.application_database || "",
    data_type: data?.data_type || "",
    hardware_name: data?.hardware_name || "",
    software_name: data?.software_name || "",
    software_version: data?.software_version || "",
    implementation_scope: data?.implementation_scope || "",
    change_description: data?.change_description || "",
    additional_notes: data?.additional_notes || "",
    // Additional fields not in API yet
    jenis_risiko: "",
    teknologi_baru: "",
    teknologi_data: "",
    plan_implementasi: "",
    rencana_rollback: "",
    rencana_testing: "",
    mitigasi_risiko: "",
    estimasi_waktu: "",
    estimasi_biaya: "",
    // Digital Approval
    tanggal_approval: "",
    status_approval: "Diterima",
    nama_approval: "Nama Approval + NIK",
  });

  // Helper function to check if field should be readonly
  const isReadOnly = (fieldName) => {
    const apiDataMapping = {
      application_type: data?.application_type,
      database_name: data?.database_name,
      application_database: data?.application_database,
      data_type: data?.data_type,
      hardware_name: data?.hardware_name,
      software_name: data?.software_name,
      software_version: data?.software_version,
      implementation_scope: data?.implementation_scope,
      change_description: data?.change_description,
      additional_notes: data?.additional_notes,
    };
    return apiDataMapping[fieldName] && apiDataMapping[fieldName].trim() !== "";
  };

  // Update form state when data from API changes
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setForm((prev) => ({
        ...prev,
        application_type: data?.application_type || prev.application_type,
        database_name: data?.database_name || prev.database_name,
        application_database:
          data?.application_database || prev.application_database,
        data_type: data?.data_type || prev.data_type,
        hardware_name: data?.hardware_name || prev.hardware_name,
        software_name: data?.software_name || prev.software_name,
        software_version: data?.software_version || prev.software_version,
        implementation_scope:
          data?.implementation_scope || prev.implementation_scope,
        change_description: data?.change_description || prev.change_description,
        additional_notes: data?.additional_notes || prev.additional_notes,
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    } else {
      console.log("Form Submitted:", form);
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
            <InputField
              label="Lampiran"
              value={
                dataTicket?.attachments ? dataTicket?.attachments?.name : "-"
              }
              readOnly
            />
            <InputField
              label="Nama Divisi"
              value={data?.division_name || "Accounting"}
              readOnly
            />
            <InputField
              label="Requester"
              value={dataTicket?.fullname || "-"}
              readOnly
            />
            <InputField
              label="Email"
              value={dataTicket?.email || "-"}
              readOnly
            />
            <InputField
              label="No. Whatsapp"
              value={dataTicket?.whatsapp || "-"}
              readOnly
            />
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Deskripsi</label>
              <div
                className="input read-only:bg-gray-100 read-only:cursor-not-allowed min-h-[80px] p-2"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {renderDescription(dataTicket?.description) || "-"}
              </div>
            </div>
            <InputField
              label="Nama Aplikasi"
              value={dataTicket?.application?.name || "-"}
              readOnly
            />
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">
                Deskripsi Aplikasi
              </label>
              <div
                className="input read-only:bg-gray-100 read-only:cursor-not-allowed min-h-[80px] p-2"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {renderDescription(data?.ticket?.application?.description) ||
                  "-"}
              </div>
            </div>
            <TextareaField
              label="Catatan / Keterangan"
              name="additional_notes"
              value={form.additional_notes}
              onChange={handleChange}
              placeholder="Tambahkan Catatan / Keterangan"
              readOnly={isReadOnly("additional_notes")}
              rows={3}
            />
            <Dropdown
              label="Jenis Risiko"
              name="jenis_risiko"
              value={form.jenis_risiko}
              handleChange={handleChange}
              dataMenus={optionsJenisRisiko}
              isRequired={true}
              initMenu="Pilih Jenis Risiko"
            />
            <InputField
              label="Mitigasi Risiko"
              name="mitigasi_risiko"
              value={form.mitigasi_risiko}
              onChange={handleChange}
              placeholder="Mitigasi Risiko"
              required
            />
            <InputField
              label="Estimasi Waktu Pengerjaan"
              name="estimasi_waktu"
              value={form.estimasi_waktu}
              onChange={handleChange}
              placeholder="Estimasi Waktu Pengerjaan"
            />
            <InputField
              label="Estimasi Biaya"
              name="estimasi_biaya"
              value={form.estimasi_biaya}
              onChange={handleChange}
              placeholder="Rp. 0,-"
            />

            <TextareaField
              label="Rencana Testing"
              name="rencana_testing"
              value={form.rencana_testing}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Testing"
              required
              rows={3}
            />
          </div>

          {/* --- KOLOM KANAN (EDITABLE) --- */}
          <div className="flex flex-col gap-6">
            {isReadOnly("application_type") ? (
              <InputField
                label="Jenis Aplikasi"
                value={form.application_type}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Jenis Aplikasi"
                name="application_type"
                value={form.application_type}
                onChange={handleChange}
                options={optionsAplikasi}
                required
              />
            )}
            {isReadOnly("database_name") ? (
              <InputField
                label="Nama DB"
                value={form.database_name}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Nama DB"
                name="database_name"
                value={form.database_name}
                onChange={handleChange}
                options={optionsDB}
                required
              />
            )}
            {isReadOnly("application_database") ? (
              <InputField
                label="Aplikasi / Database"
                value={form.application_database}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Aplikasi / Database"
                name="application_database"
                value={form.application_database}
                onChange={handleChange}
                options={optionsAplikasi}
                required
              />
            )}
            {isReadOnly("data_type") ? (
              <InputField
                label="Jenis Data"
                value={form.data_type}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Jenis Data"
                name="data_type"
                value={form.data_type}
                onChange={handleChange}
                options={optionsJenisData}
                required
              />
            )}
            {isReadOnly("hardware_name") ? (
              <InputField
                label="Nama Hardware"
                value={form.hardware_name}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Nama Hardware"
                name="hardware_name"
                value={form.hardware_name}
                onChange={handleChange}
                options={optionsHardware}
                required
              />
            )}
            {isReadOnly("software_name") ? (
              <InputField
                label="Nama Software"
                value={form.software_name}
                readOnly
                required
              />
            ) : (
              <SelectField
                label="Nama Software"
                name="software_name"
                value={form.software_name}
                onChange={handleChange}
                options={optionsSoftware}
                required
              />
            )}
            <InputField
              label="Versi Software"
              name="software_version"
              value={form.software_version}
              onChange={handleChange}
              placeholder="Pilih Software"
              readOnly={isReadOnly("software_version")}
              required
            />

            <TextareaField
              label="Ruang Lingkup Implementasi CR"
              name="implementation_scope"
              value={form.implementation_scope}
              onChange={handleChange}
              placeholder="Tambahkan Lingkup Implementasi CR"
              readOnly={isReadOnly("implementation_scope")}
              required
              rows={4}
            />
            <TextareaField
              label="Dampak Implementasi"
              name="change_description"
              value={form.change_description}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              readOnly={isReadOnly("change_description")}
              required
              rows={3}
            />
            <InputField
              label="Teknologi Baru"
              name="teknologi_baru"
              value={form.teknologi_baru}
              onChange={handleChange}
              placeholder="Tambahkan Teknologi Baru"
              required
            />
            <TextareaField
              label="Teknologi Data"
              name="teknologi_data"
              value={form.teknologi_data}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Plan Implementasi"
              name="plan_implementasi"
              value={form.plan_implementasi}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Rencana Rollback"
              name="rencana_rollback"
              value={form.rencana_rollback}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Rollback"
              required
              rows={3}
            />
          </div>
        </div>

        {/* --- DIGITAL APPROVAL SECTION --- */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-6">Digital Approval</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tanggal */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Tanggal</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">DD/MM/YYYY</span>
              </div>
            </div>

            {/* Status Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Status Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">Status</span>
              </div>
            </div>

            {/* Nama Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Nama Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  Nama Approval + NIK
                </span>
              </div>
            </div>
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
