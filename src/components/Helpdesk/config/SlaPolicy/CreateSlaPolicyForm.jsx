"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function CreateSlaPolicyForm({
  data = null,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState({
    name: data?.name || "",
    resolve_time: data?.resolve_time || "",
    priority: data?.priority || "",
    response_time: data?.response_time || "",
    description: data?.description || "",
  });

  const [errors, setErrors] = useState({});

  const dataPriority = [
    { name: "Kritis", value: "kritis", color: "text-red-500" },
    { name: "Tinggi", value: "tinggi", color: "text-orange-500" },
    { name: "Sedang", value: "sedang", color: "text-yellow-500" },
    { name: "Rendah", value: "rendah", color: "text-green-500" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.resolve_time) newErrors.resolve_time = true;
    if (!form.priority) newErrors.priority = true;
    if (!form.response_time) newErrors.response_time = true;
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
    const submitData = {
      name: form.name,
      resolve_time: Number(form.resolve_time),
      priority: form.priority,
      response_time: Number(form.response_time),
      description: form.description,
      ...(data?.ID ? { ID: data.ID } : {}),
    };
    if (onSubmit) {
      onSubmit(submitData);
    } else {
      toast.success("SLA Policy berhasil disimpan!", {
        description: `SLA Policy "${form.name}" telah berhasil disimpan.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat SLA Policy</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama SLA Policy */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama SLA Policy<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Nama SLA Policy"
          />
        </div>

        {/* Response Time */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Response Time<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="response_time"
              value={form.response_time}
              onChange={(e) => handleChange(e)}
              className={`input w-20 text-center ${
                errors.response_time ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
            />

            <span className="text-gray-700">Menit</span>
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Priority<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small">
            <Select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Priority</em>
              </MenuItem>
              {dataPriority.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      marginRight: 8,
                      backgroundColor:
                        item.name === "Kritis"
                          ? "#ef4444"
                          : item.name === "Tinggi"
                          ? "#f97316"
                          : item.name === "Sedang"
                          ? "#eab308"
                          : item.name === "Rendah"
                          ? "#22c55e"
                          : "#d1d5db",
                    }}
                  ></span>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Resolved Time */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Resolved Time<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="resolve_time"
              value={form.resolve_time}
              onChange={(e) => handleChange(e)}
              className={`input w-20 text-center ${
                errors.resolve_time ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
            />
            <span className="text-gray-700">Jam</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 row-span-2 md:col-span-2">
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

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
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
