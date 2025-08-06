"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import CKEditorWrapper from "@/components/CKEditorWrapper";

export default function TicketForm() {
  const [form, setForm] = useState({
    created_name: "",
    division_name: "",
    email: "",
    whatsapp_number: "",
    application_name: "",
    ticket_subject: "",
    ticket_description: "",
    lampiran: null,
  });

  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const dataNamaAplikasi = [
    { name: "ERP MM", value: "ERP MM" },
    { name: "ERP FM", value: "ERP FM" },
    { name: "HRIS", value: "HRIS" },
    { name: "e-Procurement", value: "e-Procurement" },
    { name: "ShipTracking", value: "ShipTracking" },
    { name: "Bag Daily", value: "Bag Daily" },
    { name: "Fuel Monitoring", value: "Fuel Monitoring" },
  ];

  const dataNamaDivisi = [
    { name: "Accounting", value: "Accounting" },
    { name: "HCM Umum", value: "HCM Umum" },
    { name: "Niaga", value: "Niaga" },
    { name: "Treasury", value: "Treasury" },
    { name: "IT", value: "IT" },
    { name: "Pengadaan", value: "Pengadaan" },
    { name: "Satuan Audit Internal", value: "Satuan Audit Internal" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeDeskripsiTiket = (input) => {
    setForm({ ...form, ticket_description: input });
  };

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
      if (key === "ticket_description") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = val;
        const plainText = tempDiv.innerText.trim();

        if (!plainText) {
          newErrors[key] = true;
        }
      } else if (
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
      toast.error("lengkapi data di bawah ini", {
        description: "Silahkan lengkapi data di bawah ini",
      });
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    // console.log("Submitted Data:", Object.fromEntries(formData.entries()));
    toast.success("Tiket berhasil dibuat!", {
      description: "Tiket id : SCRQ – ERP HRIS – 09/01/202025 – 001",
      duration: 5000,
    });
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
          name="created_name"
          value={form.created_name}
          onChange={handleChange}
          className={`input ${errors.created_name ? "border-red-500" : ""}`}
          placeholder="Nama Lengkap"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Aplikasi<span className="text-red-500">*</span>
        </label>
        <select
          name="application_name"
          value={form.application_name}
          onChange={handleChange}
          className={`input ${errors.application_name ? "border-red-500" : ""}`}
        >
          <option value="">Pilih Aplikasi</option>
          {dataNamaAplikasi.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Divisi<span className="text-red-500">*</span>
        </label>
        <select
          name="division_name"
          value={form.division_name}
          onChange={handleChange}
          className={`input ${errors.division_name ? "border-red-500" : ""}`}
        >
          <option value="">Pilih Divisi</option>
          {dataNamaDivisi.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Subjek Tiket<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="ticket_subject"
          value={form.ticket_subject}
          onChange={handleChange}
          className={`input ${errors.ticket_subject ? "border-red-500" : ""}`}
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
          name="whatsapp_number"
          value={form.whatsapp_number}
          onChange={handleChange}
          className={`input ${errors.whatsapp_number ? "border-red-500" : ""}`}
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
          value={form.ticket_description}
          className={`border ${
            errors.ticket_description ? "border-red-500" : "border-slate-400"
          }`}
        />
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
