"use client";
import React, { useState, useRef, useEffect } from "react";
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
    file_url: null, // always null initially, handle display separately
    is_publish: data?.is_publish || false,
  });

  // If there's an attachment from API, show it
  const initialApiAttachment = data?.attachments?.[0]?.url || null;
  const initialApiAttachmentName = initialApiAttachment
    ? initialApiAttachment.split("/").pop()
    : "";

  const [apiAttachment, setApiAttachment] = useState(
    initialApiAttachment
      ? { url: initialApiAttachment, name: initialApiAttachmentName }
      : null
  );
  const [fileObj, setFileObj] = useState(null); // for new file
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

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
      if (file.size > 25 * 1024 * 1024) {
        toast.error("Ukuran file melebihi batas", {
          description: "Ukuran file maksimal adalah 25MB.",
        });
        return;
      }
      setForm({ ...form, file_url: file });
      setFileObj(file);
      setApiAttachment(null); // remove API file if new file selected
    }
  };

  // Paste handler for clipboard files/images (only first file)
  useEffect(() => {
    const handlePaste = (e) => {
      if (
        e.clipboardData &&
        e.clipboardData.files &&
        e.clipboardData.files.length > 0
      ) {
        const file = e.clipboardData.files[0];
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Ukuran file melebihi batas", {
            description: "Ukuran file maksimal adalah 25MB.",
          });
          return;
        }
        setForm({ ...form, file_url: file });
        setFileObj(file);
        setApiAttachment(null); // remove API file if new file pasted
        toast.success("File dari clipboard berhasil ditambahkan!");
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [form]);

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
        {data ? `Edit Dokumen Aplikasi ${data.title}` : "Buat Dokumen Aplikasi"}
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
          <label className="font-semibold text-sm mb-1">
            Lampiran<span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2">(Maks 25MB)</span>
          </label>
          {/* If API attachment exists and no new file selected, show API file */}
          {apiAttachment && !fileObj ? (
            <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2 bg-gray-50">
              <span className="truncate">
                <a
                  href={apiAttachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {data.attachments[0].name}
                </a>
              </span>
              <button
                type="button"
                onClick={() => {
                  setApiAttachment(null);
                  setForm({ ...form, file_url: null });
                }}
                className="px-2 py-1 rounded text-xs bg-red-100 text-red-600 hover:bg-red-200 ml-3"
              >
                Hapus
              </button>
            </div>
          ) : (
            <>
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 px-4 cursor-pointer bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#65C7D5] ${
                  errors.file_url ? "border-red-500" : "border-gray-200"
                }`}
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  const dropped = Array.from(e.dataTransfer.files || []);
                  if (dropped.length)
                    handleFileChange({ target: { files: [dropped[0]] } });
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <span className="text-gray-500 text-center select-none">
                  Paste gambar di sini atau drag & drop file di sini
                </span>
                <input
                  type="file"
                  name="lampiran"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="*/*"
                />
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {fileObj ? (
                  <div className="flex items-center justify-between py-1">
                    <span>
                      {fileObj.name}{" "}
                      <span className="text-xs text-gray-400">
                        ({(fileObj.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFileObj(null);
                        setForm({ ...form, file_url: null });
                      }}
                      className="px-2 py-1 rounded text-xs bg-red-100 text-red-600 hover:bg-red-200 ml-3"
                    >
                      Hapus
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
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
