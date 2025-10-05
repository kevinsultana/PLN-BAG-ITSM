"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";

export default function CreateApplicationForm({
  data = null,
  onSubmit,
  onCancel,
  submitLabel = "Simpan",
}) {
  const [form, setForm] = useState({
    name: data?.name || "",
    // slaPolicy: data?.slaPolicy || "",
    description: data?.description || "",
  });

  const [errors, setErrors] = useState({});

  // const dataSLA = [
  //   { name: "SLA - Critical Incident", value: "criticalIncident" },
  //   { name: "SLA - Low Priority Request", value: "lowPriorityRequest" },
  //   { name: "SLA - Emergency Access Request", value: "emergencyAccessRequest" },
  //   { name: "SLA - IT Procurement Approval", value: "itProcurementApproval" },
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    // if (!form.slaPolicy) newErrors.slaPolicy = true;
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
      // slaPolicy: form.slaPolicy,
      description: form.description,
      ...(data?.ID ? { ID: data.ID } : {}),
    };
    if (onSubmit) {
      onSubmit(submitData);
    } else {
      // fallback: demo toast
      toast.success("Aplikasi berhasil disimpan!", {
        description: `Aplikasi "${form.namaAplikasi}" telah berhasil disimpan.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">
        {data ? "Edit Aplikasi" : "Buat Aplikasi"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Aplikasi */}
        <div className="flex flex-col gap-2 col-span-2">
          <label className="font-semibold text-sm">
            Nama Aplikasi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Nama Aplikasi"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 col-span-2">
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

        {/* SLA Policy */}
        {/* <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            SLA Policy<span className="text-red-500">*</span>
          </label>
          <select
            name="slaPolicy"
            value={form.slaPolicy}
            onChange={handleChange}
            className={`input ${errors.slaPolicy ? "border-red-500" : ""}`}
          >
            <option value="">Pilih SLA</option>
            {dataSLA.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        */}

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Batal
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
