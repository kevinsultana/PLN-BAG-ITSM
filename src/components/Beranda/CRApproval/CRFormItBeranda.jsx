"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import renderDescription from "@/utils/RenderDesc";
import Dropdown from "@/components/Dropdown";

const optionsJenisRisiko = [
  { value: "rendah", name: "Rendah" },
  { value: "sedang", name: "Sedang" },
  { value: "tinggi", name: "Tinggi" },
];

const optionsAplikasi = [];

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

export default function CRFormItBeranda({
  data = {},
  dataTicket,
  onFormChange,
}) {
  const [form, setForm] = useState({
    // API properties - directly match API field names
    additional_notes: data?.additional_notes || "",
    application_database: data?.application_database || "",
    application_description: data?.application_description || "",
    application_type: data?.application_type || "",
    division_name: data?.division_name || "",
    database_name: data?.database_name || "",
    data_type: data?.data_type || "",
    hardware_name: data?.hardware_name || "",
    software_name: data?.software_name || "",
    software_version: data?.software_version || "",
    implementation_scope: data?.implementation_scope || "",
    change_description: data?.change_description || "",
    // Additional fields not in API yet
    risk_level: data?.risk_level || "",
    new_technology: data?.new_technology || "",
    data_technology: data?.data_technology || "",
    risk_mitigation: data?.risk_mitigation || "",
    implementation_plan: data?.implementation_plan || "",
    rollback_plan: data?.rollback_plan || "",
    testing_plan_date: data?.testing_plan_date || "",
    estimated_duration: data?.estimated_duration || "",
    estimated_cost: data?.estimated_cost || "",
    // Digital Approval
    date_approval_bpo1: data?.date_approval_bpo1 || "",
    is_bpo1_approve: data?.is_bpo1_approve,
    nama_approval1: data?.nama_approval1 || "-",
    date_approval_bpo2: data?.date_approval_bpo2 || "",
    is_bpo2_approve: data?.is_bpo2_approve,
    nama_approval2: data?.nama_approval2 || "-",
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

  // Only call onFormChange when form changes, not during render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (onFormChange) {
      onFormChange(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  function formatTanggalIndonesia(datetime) {
    if (!datetime) return "-";
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date(datetime);
    if (isNaN(date)) return "-";
    const tgl = date.getDate();
    const bln = bulan[date.getMonth()];
    const thn = date.getFullYear();
    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    return `${tgl} ${bln} ${thn} jam ${jam}:${menit}`;
  }

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
          style={{ height: "auto", width: "auto" }}
        />
      </header>
      <p className="text-center text-sm text-gray-600 mb-6">
        (Formulir ini diisi oleh PIC IT dan BPO IT serta disetujui oleh Business
        Process Owner sebelum diberikan kepada Service Desk / Help Desk)
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* --- KOLOM KIRI (READONLY) --- */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Lampiran</label>
              <div className="input flex flex-col gap-2">
                {Array.isArray(dataTicket?.attachments) &&
                dataTicket.attachments.length > 0 ? (
                  dataTicket.attachments.map((att, idx) => (
                    <div
                      key={att.id || idx}
                      className="flex items-center gap-2"
                    >
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
                        {att.size ? Math.round(att.size / 1024) : 0} KB
                      </span>
                    </div>
                  ))
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
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
              label="Tingkat Risiko"
              name="risk_level"
              value={form.risk_level}
              handleChange={handleChange}
              dataMenus={optionsJenisRisiko}
              isRequired={true}
              initMenu="Pilih Jenis Risiko"
            />
            <InputField
              label="Mitigasi Risiko"
              name="risk_mitigation"
              value={form.risk_mitigation}
              onChange={handleChange}
              placeholder="Mitigasi Risiko"
              required
            />
            <InputField
              label="Estimasi Waktu Pengerjaan"
              name="estimated_duration"
              value={form.estimated_duration}
              onChange={handleChange}
              placeholder="Estimasi Waktu Pengerjaan"
            />
            <InputField
              label="Estimasi Biaya"
              name="estimated_cost"
              value={form.estimated_cost}
              onChange={handleChange}
              placeholder="Rp. 0,-"
            />

            <TextareaField
              label="Rencana Testing"
              name="testing_plan_date"
              value={form.testing_plan_date}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Testing"
              required
              rows={3}
            />
          </div>

          {/* --- KOLOM KANAN (EDITABLE) --- */}
          <div className="flex flex-col gap-6">
            <InputField
              label="Jenis Aplikasi"
              value={form.application_type}
              readOnly
              required
            />

            <InputField
              label="Nama DB"
              value={form.database_name}
              readOnly
              required
            />

            <InputField
              label="Aplikasi / Database"
              value={form.application_database}
              readOnly
              required
            />

            <InputField
              label="Jenis Data"
              value={form.data_type}
              readOnly
              required
            />

            <InputField
              label="Nama Hardware"
              value={form.hardware_name}
              readOnly
              required
            />

            <InputField
              label="Nama Software"
              value={form.software_name}
              readOnly
              required
            />

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
              name="new_technology"
              value={form.new_technology}
              onChange={handleChange}
              placeholder="Tambahkan Teknologi Baru"
              required
            />
            <TextareaField
              label="Teknologi Data"
              name="data_technology"
              value={form.data_technology}
              onChange={handleChange}
              placeholder="Tambahkan Dampak Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Plan Implementasi"
              name="implementation_plan"
              value={form.implementation_plan}
              onChange={handleChange}
              placeholder="Tambahkan Rencana Implementasi"
              required
              rows={3}
            />
            <TextareaField
              label="Rencana Rollback"
              name="rollback_plan"
              value={form.rollback_plan}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6">
            {/* Tanggal */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Tanggal</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  {formatTanggalIndonesia(form.date_approval_bpo1) ||
                    "DD/MM/YYYY"}
                </span>
              </div>
            </div>

            {/* Status Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Status Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  Status BPO1: {form.is_bpo1_approve}
                </span>
              </div>
            </div>

            {/* Nama Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Nama Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  {form.nama_approval1 || "-"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tanggal */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Tanggal</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  {formatTanggalIndonesia(form.date_approval_bpo2) ||
                    "DD/MM/YYYY"}
                </span>
              </div>
            </div>

            {/* Status Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Status Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  Status BPO2: {form.is_bpo2_approve}
                </span>
              </div>
            </div>

            {/* Nama Approval */}
            <div className="text-center">
              <h4 className="font-semibold text-base mb-4">Nama Approval</h4>
              <div className="bg-gray-50 border rounded-lg p-6 min-h-[100px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  {form.nama_approval2 || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
