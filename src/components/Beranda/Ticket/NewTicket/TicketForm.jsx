"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import CKEditorWrapper from "@/components/CKEditorWrapper";

export default function TicketForm() {
  const [form, setForm] = useState({
    namaLengkap: "",
    namaDivisi: "",
    email: "",
    whatsapp: "",
    namaAplikasi: "",
    subjekTiket: "",
    deskripsiTiket: "",
    lampiran: null,
  });

  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeDeskripsiTiket = (input) => {
    setForm({ ...form, deskripsiTiket: input });
  };

  console.log(form);

  const validateImage = (file) => {
    if (!file.type.startsWith("image/"))
      return "Hanya file gambar yang diperbolehkan";
    if (file.size > 5 * 1024 * 1024) return "Ukuran file maksimal 5MB";
    return null;
  };

  const setImageFile = (file) => {
    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }
    setForm({ ...form, lampiran: file });
    setFileName(file.name || "Pasted image");
    setPreview(URL.createObjectURL(file));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handlePaste = (e) => {
    const item = [...e.clipboardData.items].find((i) =>
      i.type.includes("image")
    );
    if (item) {
      const blob = item.getAsFile();
      setImageFile(blob);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const area = dropAreaRef.current;
    if (!area) return;
    area.addEventListener("paste", handlePaste);
    return () => area.removeEventListener("paste", handlePaste);
  }, []);

  const validate = () => {
    const newErrors = {};
    for (const [key, val] of Object.entries(form)) {
      if (
        (typeof val === "string" && !val.trim()) ||
        (key === "lampiran" && !val)
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
      toast.error("lengkapi data di bawah ini");
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    console.log("Submitted Data:", Object.fromEntries(formData.entries()));
    toast.success("Tiket berhasil dikirim!");
  };

  const handleClearFile = () => {
    setForm({ ...form, lampiran: null });
    setFileName("");
    setPreview(null);
    fileInputRef.current.value = null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
    >
      <h2 className="md:col-span-2 text-lg font-semibold">Buat Tiket</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Lengkap<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="namaLengkap"
          value={form.namaLengkap}
          onChange={handleChange}
          className={`input ${errors.namaLengkap ? "border-red-500" : ""}`}
          placeholder="Nama Lengkap"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Aplikasi<span className="text-red-500">*</span>
        </label>
        <select
          name="namaAplikasi"
          value={form.namaAplikasi}
          onChange={handleChange}
          className={`input ${errors.namaAplikasi ? "border-red-500" : ""}`}
        >
          <option value="">Pilih Aplikasi</option>
          <option value="Sistem Absensi">Sistem Absensi</option>
          <option value="Dashboard SDM">Dashboard SDM</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Divisi<span className="text-red-500">*</span>
        </label>
        <select
          name="namaDivisi"
          value={form.namaDivisi}
          onChange={handleChange}
          className={`input ${errors.namaDivisi ? "border-red-500" : ""}`}
        >
          <option value="">Pilih Divisi</option>
          <option value="IT">IT</option>
          <option value="Keuangan">Keuangan</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Subjek Tiket<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subjekTiket"
          value={form.subjekTiket}
          onChange={handleChange}
          className={`input ${errors.subjekTiket ? "border-red-500" : ""}`}
          placeholder="Contoh: Reset Password Email"
        />
      </div>

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
          placeholder="user@gmail.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          No. Whatsapp<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          className={`input ${errors.whatsapp ? "border-red-500" : ""}`}
          placeholder="08xxxxxxxxxx"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-semibold text-sm">
          Deskripsi Tiket<span className="text-red-500">*</span>
        </label>
        <CKEditorWrapper
          onChange={(e) => {
            handleChangeDeskripsiTiket(e);
          }}
          value={form.deskripsiTiket}
        />
        {/* <textarea
          name="deskripsiTiket"
          value={form.deskripsiTiket}
          onChange={handleChange}
          className={`input h-32 ${
            errors.deskripsiTiket ? "border-red-500" : ""
          }`}
          placeholder="Deskripsi masalah..."
        /> */}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-semibold text-sm">
          Lampiran{" "}
          <span className="text-sm text-gray-500">
            (Klik, drag & drop, atau paste gambar – maks 5MB)
          </span>
          <span className="text-red-500">*</span>
        </label>

        <div
          ref={dropAreaRef}
          className={`border-dashed border-2 rounded-md p-4 text-center text-gray-500 hover:bg-gray-50 cursor-pointer ${
            errors.lampiran ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {fileName
            ? `✅ ${fileName}`
            : "Klik, tarik atau paste gambar di sini"}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {preview && (
          <div className="mt-3 relative w-fit">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded border"
            />
            <button
              type="button"
              onClick={handleClearFile}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="bg-[#65C7D5] hover:bg-[#4FB3C1] text-white font-semibold px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
