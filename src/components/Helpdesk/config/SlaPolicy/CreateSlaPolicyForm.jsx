"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { FaTimesCircle } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function CreateSlaPolicyForm() {
  const [form, setForm] = useState({
    namaSlaPolicy: "",
    resolvedTime: { hours: "", minutes: "" },
    priority: "",
    statusReach: "In Progress",
    workingHours: { hours: "", minutes: "" },
    statusFinal: "Hold",
    responseTime: { hours: "", minutes: "" },
    deskripsi: "",
  });

  const [errors, setErrors] = useState({});

  const dataPriority = [
    { name: "Kritis", value: "kritis", color: "text-red-500" },
    { name: "Tinggi", value: "tinggi", color: "text-orange-500" },
    { name: "Sedang", value: "sedang", color: "text-yellow-500" },
    { name: "Rendah", value: "rendah", color: "text-green-500" },
  ];

  const dataStatus = [
    { name: "Open", value: "open" },
    { name: "In Progress", value: "inProgress" },
    { name: "On Hold", value: "onHold" },
    { name: "Resolved", value: "resolved" },
    { name: "Closed", value: "closed" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTimeChange = (e, field) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [field]: { ...prevForm[field], [name]: value },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.namaSlaPolicy.trim()) newErrors.namaSlaPolicy = true;
    if (!form.resolvedTime.hours || !form.resolvedTime.minutes)
      newErrors.resolvedTime = true;
    if (!form.priority) newErrors.priority = true;
    if (!form.statusReach) newErrors.statusReach = true;
    if (!form.workingHours.hours || !form.workingHours.minutes)
      newErrors.workingHours = true;
    if (!form.statusFinal) newErrors.statusFinal = true;
    if (!form.responseTime.hours || !form.responseTime.minutes)
      newErrors.responseTime = true;
    if (!form.deskripsi.trim()) newErrors.deskripsi = true;
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
    // Logic to submit form
    console.log("Submitted Data:", form);
    toast.success("SLA Policy berhasil dibuat!", {
      description: `SLA Policy "${form.namaSlaPolicy}" telah berhasil ditambahkan.`,
      duration: 5000,
    });
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
            name="namaSlaPolicy"
            value={form.namaSlaPolicy}
            onChange={handleChange}
            className={`input ${errors.namaSlaPolicy ? "border-red-500" : ""}`}
            placeholder="Nama SLA Policy"
          />
        </div>

        {/* Resolved Time */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Resolved Time<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="hours"
              value={form.resolvedTime.hours}
              onChange={(e) => handleTimeChange(e, "resolvedTime")}
              className={`input w-20 text-center ${
                errors.resolvedTime ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="minutes"
              value={form.resolvedTime.minutes}
              onChange={(e) => handleTimeChange(e, "resolvedTime")}
              className={`input w-20 text-center ${
                errors.resolvedTime ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-700">WIB</span>
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Priority<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={`input appearance-none cursor-pointer ${
                errors.priority ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Priority</option>
              {dataPriority.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              {form.priority && (
                <span
                  className={`h-3 w-3 rounded-full mr-2 ${dataPriority
                    .find((p) => p.value === form.priority)
                    ?.color.replace("text", "bg")}`}
                />
              )}
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Reach */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Status Reach<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="statusReach"
              value={form.statusReach}
              onChange={handleChange}
              className={`input appearance-none cursor-pointer ${
                errors.statusReach ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Status Reach</option>
              {dataStatus.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <HiOutlineDocumentSearch className="mr-2 text-lg" />
              <FaTimesCircle className="text-red-500 text-sm" />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Working Hours<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="hours"
              value={form.workingHours.hours}
              onChange={(e) => handleTimeChange(e, "workingHours")}
              className={`input w-20 text-center ${
                errors.workingHours ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="minutes"
              value={form.workingHours.minutes}
              onChange={(e) => handleTimeChange(e, "workingHours")}
              className={`input w-20 text-center ${
                errors.workingHours ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-700">WIB</span>
          </div>
        </div>

        {/* Status Final */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Status Final<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="statusFinal"
              value={form.statusFinal}
              onChange={handleChange}
              className={`input appearance-none cursor-pointer ${
                errors.statusFinal ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Status Final</option>
              {dataStatus.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <HiOutlineDocumentSearch className="mr-2 text-lg" />
              <FaTimesCircle className="text-red-500 text-sm" />
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Response Time<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="hours"
              value={form.responseTime.hours}
              onChange={(e) => handleTimeChange(e, "responseTime")}
              className={`input w-20 text-center ${
                errors.responseTime ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="minutes"
              value={form.responseTime.minutes}
              onChange={(e) => handleTimeChange(e, "responseTime")}
              className={`input w-20 text-center ${
                errors.responseTime ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-700">WIB</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <CKEditorWrapper
            value={form.deskripsi}
            onChange={(data) => setForm({ ...form, deskripsi: data })}
            className={`ckeditor-container ${
              errors.deskripsi ? "border-red-500" : ""
            }`}
            placeholder="Deskripsi"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => console.log("Cancel")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
