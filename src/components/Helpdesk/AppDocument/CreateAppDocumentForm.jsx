"use client";
import React, { useState, useRef } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CreateAppDocumentForm({
  appList = [],
  data = null,
  onCancel,
  onSubmit,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState({
    id: data?.id || "",
    title: data?.title || "",
    application_id: data?.application_id || "",
    description: data?.description || "",
    file_url: data?.file_url || null,
    is_publish: data?.is_publish || false,
  });

  const [fileName, setFileName] = useState(
    data?.file_url
      ? typeof data.file_url === "string"
        ? data.file_url.split("/").pop()
        : ""
      : ""
  );
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // const dataAplikasi = [
  //   { name: "ERP CRM", value: "erp-crm" },
  //   { name: "ERP FM", value: "erp-fm" },
  //   { name: "ERP MM", value: "erp-mm" },
  //   { name: "ERP HCM", value: "erp-hcm" },
  //   { name: "e-Procurement", value: "e-procurement" },
  //   { name: "Ship Tracking", value: "ship-tracking" },
  //   { name: "PMS", value: "pms" },
  //   { name: "Email", value: "email" },
  //   { name: "Website", value: "website" },
  //   { name: "BAg Cloud", value: "bag-cloud" },
  //   { name: "Fuel Mentoring", value: "fuel-mentoring" },
  // ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file melebihi batas", {
          description: "Ukuran file maksimal adalah 5MB.",
        });
        return;
      }
      setForm({ ...form, file_url: file });
      setFileName(file.name);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = true;
    if (!form.application_id) newErrors.application_id = true;
    if (!form.description.trim()) newErrors.description = true;
    // if (!form.file_url) newErrors.file_url = true;
    // if (!form.is_publish) newErrors.is_publish = true;
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
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">
        {data ? "Edit Dokumen Aplikasi" : "Buat Dokumen Aplikasi"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Dokumen */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Dokumen<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder="Nama Document"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 row-span-2">
          <label className="font-semibold text-sm">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <CKEditorWrapper
            value={form.description}
            onChange={(data) => setForm({ ...form, description: data })}
            className={`ckeditor-container ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Deskripsi"
          />
        </div>

        {/* Aplikasi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Aplikasi<span className="text-red-500">*</span>
          </label>
          <select
            name="application_id"
            value={form.application_id}
            onChange={handleChange}
            className={`input ${errors.application_id ? "border-red-500" : ""}`}
          >
            <option value="">Pilih Aplikasi</option>
            {appList.map((item, index) => (
              <option key={index} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Lampiran */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Lampiran<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Maks 5MB)</span>
          </label>
          <div
            className={`flex items-center input px-3 py-2 cursor-pointer ${
              errors.file_url ? "border-red-500" : ""
            }`}
            onClick={() => fileInputRef.current.click()}
          >
            <span className="flex-grow text-gray-500">
              {fileName || "Lampirkan Dokumen / Foto"}
            </span>
            <input
              type="file"
              name="lampiran"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="text-[#65C7D5] ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a1 1 0 11-2 0V7a3 3 0 00-3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Publish to Portal ITSM */}
        <div className="flex items-start">
          <FormControlLabel
            control={
              <Checkbox
                checked={form.is_publish}
                onChange={handleChange}
                name="is_publish"
                sx={{
                  color: errors.is_publish ? "#ef4444" : "#65C7D5",
                  "&.Mui-checked": {
                    color: "#65C7D5",
                  },
                }}
              />
            }
            label={
              <span
                className={`font-semibold text-sm ${
                  errors.is_publish ? "text-red-500" : ""
                }`}
              >
                Publish to Portal ITSM<span className="text-red-500">*</span>
              </span>
            }
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex  gap-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
