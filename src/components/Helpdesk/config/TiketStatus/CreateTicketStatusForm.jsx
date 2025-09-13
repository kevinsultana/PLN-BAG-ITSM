"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { Switch } from "@mui/material";

export default function CreateTicketStatusForm({
  data = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState({
    name: data.name || data.Name || "",
    code: data.code || data.Code || "",
    description: data.description || data.Description || "",
    status:
      typeof data.Status !== "undefined"
        ? data.Status
        : typeof data.status !== "undefined"
        ? data.status
        : true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChangeStatus = (e) => {
    setForm({ ...form, status: e.target.checked });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.code.trim()) newErrors.code = true;
    if (!form.description.trim()) newErrors.description = true;
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
        {submitLabel === "Save" ? "Buat Status Tiket" : "Edit Status Tiket"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Tiket */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Tiket<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Nama Status Tiket"
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

        {/* Code */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Code<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className={`input ${errors.code ? "border-red-500" : ""}`}
            placeholder="Code"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">
            Status<span className="text-red-500">*</span>
          </label>
          <Switch
            checked={form.status}
            onChange={handleChangeStatus}
            name="status"
            color="primary"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#65C7D5",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#65C7D5 !important",
              },
            }}
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
