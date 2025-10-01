import React, { useState } from "react";

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

export default function CRFormBpo({ data = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    jenisData: "",
    namaHardware: "",
    namaSoftware: "",
    versiSoftware: "",
    ruangLingkup: "",
    dampakImplementasi: "",
    rekomendasiCab: "",
    tanggalCab: "",
    catatan: "",
    tanggalApproval: "",
    statusApproval: "Status",
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
        {/* Logo di kanan atas, tambahkan jika perlu */}
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Kiri */}
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
            <TextareaField
              label="Dampak Implementasi"
              name="dampakImplementasi"
              value={form.dampakImplementasi}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          {/* Kanan */}
          <div className="flex flex-col gap-6">
            <TextareaField
              label="Rekomendasi CAB"
              name="rekomendasiCab"
              value={form.rekomendasiCab}
              onChange={handleChange}
              required
              rows={3}
            />
            <InputField
              label="Tanggal CAB"
              name="tanggalCab"
              value={form.tanggalCab}
              onChange={handleChange}
              required
            />
            <TextareaField
              label="Catatan / Keterangan"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={3}
            />
            <InputField
              label="Jenis Data"
              name="jenisData"
              value={form.jenisData}
              onChange={handleChange}
              required
            />
            <InputField
              label="Nama Hardware"
              name="namaHardware"
              value={form.namaHardware}
              onChange={handleChange}
              required
            />
            <InputField
              label="Nama Software"
              name="namaSoftware"
              value={form.namaSoftware}
              onChange={handleChange}
              required
            />
            <InputField
              label="Versi Software"
              name="versiSoftware"
              value={form.versiSoftware}
              onChange={handleChange}
              required
            />
            <TextareaField
              label="Ruang Lingkup Implementasi CR"
              name="ruangLingkup"
              value={form.ruangLingkup}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
        </div>
        {/* Digital Approval Section */}
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
