"use client";
import React, { useState, useRef, useEffect } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function CreateAppDocumentForm({
  appList = [],
  data = null,
  onCancel,
  onSubmit,
  submitLabel = "Save",
}) {
  // Handle multiple attachments from API
  const initialApiAttachments = data?.attachments || [];

  const [apiAttachments, setApiAttachments] = useState(initialApiAttachments);

  const [form, setForm] = useState({
    id: data?.id || "",
    title: data?.title || "",
    application_id: data?.application_id || "",
    description: data?.description || "",
    file_urls: [], // Change to array for multiple files
    is_publish: data?.is_publish || false,
  });

  const [fileObjs, setFileObjs] = useState([]); // for new files (array)
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
    // Cek jika sudah ada lampiran
    if (apiAttachments.length > 0 || fileObjs.length > 0) {
      toast.error("Hanya dapat mengupload 1 lampiran", {
        description: "Hapus lampiran yang sudah ada terlebih dahulu.",
      });
      return;
    }

    const file = e.target.files[0]; // Hanya ambil file pertama
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        toast.error(`File ${file.name} melebihi batas`, {
          description: "Ukuran file maksimal adalah 25MB.",
        });
        return;
      }

      setFileObjs([file]); // Set sebagai array dengan 1 file
      setForm({ ...form, file_urls: [file] });
      toast.success("File berhasil ditambahkan!");
    }
  };

  // Paste handler for clipboard files/images
  useEffect(() => {
    const handlePaste = (e) => {
      if (
        e.clipboardData &&
        e.clipboardData.files &&
        e.clipboardData.files.length > 0
      ) {
        // Cek jika sudah ada lampiran
        if (apiAttachments.length > 0 || fileObjs.length > 0) {
          toast.error("Hanya dapat mengupload 1 lampiran", {
            description: "Hapus lampiran yang sudah ada terlebih dahulu.",
          });
          return;
        }

        const file = e.clipboardData.files[0]; // Hanya ambil file pertama
        if (file.size > 25 * 1024 * 1024) {
          toast.error(`File ${file.name} melebihi batas`, {
            description: "Ukuran file maksimal adalah 25MB.",
          });
          return;
        }

        setFileObjs([file]);
        setForm({ ...form, file_urls: [file] });
        toast.success("File dari clipboard berhasil ditambahkan!");
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [form, fileObjs, apiAttachments]);

  const removeApiAttachment = (attachmentId) => {
    setApiAttachments((prev) => prev.filter((att) => att.id !== attachmentId));
  };

  const removeNewFile = () => {
    setFileObjs([]);
    setForm((prev) => ({
      ...prev,
      file_urls: [],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = true;
    if (!form.application_id) newErrors.application_id = true;
    if (!form.description.trim()) newErrors.description = true;
    // Check if there is exactly one attachment (either API or new file)
    const totalAttachments = apiAttachments.length + fileObjs.length;
    if (totalAttachments === 0) newErrors.file_urls = true;
    // if (!form.is_publish) newErrors.is_publish = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const hasAttachmentError = errors.file_urls;
      toast.error("Lengkapi data di bawah ini", {
        description: hasAttachmentError
          ? "Silahkan lengkapi semua field yang ditandai (*) dan tambahkan minimal satu lampiran."
          : "Silahkan lengkapi semua field yang ditandai (*).",
      });
      return;
    }
    if (onSubmit) {
      // Prepare the form data with attachment IDs that should remain
      const formData = {
        ...form,
        attachment_ids: apiAttachments.map((att) => att.id), // Only send IDs of remaining attachments
        newFiles: fileObjs, // New files to upload
        // Keep original data for reference
        existingAttachments: apiAttachments,
      };
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">
        {data ? `Edit Dokumen Aplikasi ` : "Buat Dokumen Aplikasi"}
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
          <FormControl
            fullWidth
            error={errors.application_id}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#65C7D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#65C7D5",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#65C7D5",
              },
            }}
          >
            <InputLabel id="application-select-label">
              Aplikasi<span style={{ color: "#ef4444" }}>*</span>
            </InputLabel>
            <Select
              labelId="application-select-label"
              name="application_id"
              value={form.application_id}
              label="Aplikasi*"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Pilih Aplikasi</em>
              </MenuItem>
              {appList.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Lampiran */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <label className="font-semibold text-sm">
              Lampiran<span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">
                (Maks 25MB, hanya 1 file)
              </span>
            </label>
            {(apiAttachments.length > 0 || fileObjs.length > 0) && (
              <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">
                1 file terlampir
              </span>
            )}
          </div>

          {/* Existing API Attachments */}
          {apiAttachments.length > 0 && (
            <div className="space-y-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                File yang sudah ada:
              </span>
              {apiAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2 bg-blue-50"
                >
                  <span className="truncate">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {attachment.name}
                    </a>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeApiAttachment(attachment.id)}
                    className="px-2 py-1 rounded text-xs bg-red-100 text-red-600 hover:bg-red-200 ml-3 flex-shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New File Display */}
          {fileObjs.length > 0 && (
            <div className="space-y-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                File baru:
              </span>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2 bg-green-50">
                <span className="truncate">
                  {fileObjs[0].name}
                  <span className="text-xs text-gray-500 ml-2">
                    ({(fileObjs[0].size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={removeNewFile}
                  className="px-2 py-1 rounded text-xs bg-red-100 text-red-600 hover:bg-red-200 ml-3 flex-shrink-0"
                >
                  Hapus
                </button>
              </div>
            </div>
          )}

          {/* File Upload Area */}
          {apiAttachments.length === 0 && fileObjs.length === 0 && (
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 px-4 cursor-pointer bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#65C7D5] ${
                errors.file_urls ? "border-red-500" : "border-gray-200"
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
                Paste file di sini atau drag & drop file di sini
                <br />
                <span className="text-xs">Hanya dapat mengupload 1 file</span>
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
          )}

          {/* Message when attachment exists */}
          {(apiAttachments.length > 0 || fileObjs.length > 0) && (
            <div className="text-center py-4 text-gray-500 text-sm bg-gray-100 rounded-lg">
              ✓ Lampiran sudah ada. Hapus lampiran yang ada untuk mengupload
              file baru.
            </div>
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
