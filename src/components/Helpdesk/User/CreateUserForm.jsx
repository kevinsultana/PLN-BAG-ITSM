"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@mui/material";

export default function CreateUserForm() {
  const [form, setForm] = useState({
    namaLengkap: "",
    email: "",
    noWhatsapp: "",
    namaDivisi: "",
    status: true, // Default to active
  });

  const [errors, setErrors] = useState({});

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
    if (!form.namaLengkap.trim()) newErrors.namaLengkap = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.noWhatsapp.trim()) newErrors.noWhatsapp = true;
    if (!form.namaDivisi) newErrors.namaDivisi = true;
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
    toast.success("User baru berhasil dibuat!", {
      description: `User "${form.namaLengkap}" telah berhasil ditambahkan.`,
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat User Baru</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Lengkap */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Lengkap User<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaLengkap"
            value={form.namaLengkap}
            onChange={handleChange}
            className={`input ${errors.namaLengkap ? "border-red-500" : ""}`}
            placeholder="Nama Lengkap User"
          />
        </div>

        {/* Email */}
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
            placeholder="User@gmail.com"
          />
        </div>

        {/* No. Whatsapp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            No. Whatsapp<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="noWhatsapp"
            value={form.noWhatsapp}
            onChange={handleChange}
            className={`input ${errors.noWhatsapp ? "border-red-500" : ""}`}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Nama Divisi */}
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
            {dataNamaDivisi.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
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
