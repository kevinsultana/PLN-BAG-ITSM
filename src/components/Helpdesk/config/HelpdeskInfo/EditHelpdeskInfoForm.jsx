"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { ProxyUrl } from "@/api/BaseUrl";

export default function EditHelpdeskInfoForm({ data }) {
  const [form, setForm] = useState({
    email: "",
    whatsapp: "",
    instagram: "",
    phone: "",
    facebook: "",
    portal_url: "",
    linkedin: "",
    hours_mon_thu: "",
    hours_fri: "",
  });
  useEffect(() => {
    if (data) {
      setForm({
        email: data.email || "",
        whatsapp: data.whatsapp || data.whatsapp_number || "",
        instagram: data.instagram || "",
        phone: data.phone || data.telephone || "",
        facebook: data.facebook || "",
        portal_url: data.portal_url || "",
        linkedin: data.linkedin || "",
        hours_mon_thu: data.hours_mon_thu || "",
        hours_fri: data.hours_fri || "",
      });
    }
  }, [data]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email || !form.email.trim()) newErrors.email = true;
    if (!form.whatsapp || !form.whatsapp.trim()) newErrors.whatsapp = true;
    if (!form.phone || !form.phone.trim()) newErrors.phone = true;
    if (!form.portal_url || !form.portal_url.trim())
      newErrors.portal_url = true;
    if (!form.hours_mon_thu || !form.hours_mon_thu.trim())
      newErrors.hours_mon_thu = true;
    if (!form.hours_fri || !form.hours_fri.trim()) newErrors.hours_fri = true;

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

    const payload = { ...form };

    toast
      .promise(ProxyUrl.put("/helpdesk-info", payload), {
        loading: "Menyimpan helpdesk info...",
        success: "Helpdesk Info berhasil disimpan",
        error: ({ error }) => (
          <div>
            <b>Gagal menyimpan</b>
            <div className="text-sm text-red-600">
              {error?.message || "Terjadi kesalahan"}
            </div>
          </div>
        ),
      })
      .then(() => {
        // optional: additional actions after success
      })
      .catch((err) => {
        console.error("Save error:", err);
      });
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat Helpdesk Info</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`input ${errors.email ? "border-red-500" : ""}`}
            placeholder="User@gmail.com"
          />
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Instagram<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            className={`input ${errors.instagram ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* No. Whatsapp */}
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

        {/* X */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            X<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="x"
            value={form.x || ""}
            onChange={handleChange}
            className={`input ${errors.x ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* No. Telephone */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            No. Telephone<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`input ${errors.phone ? "border-red-500" : ""}`}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Facebook */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Facebook<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            className={`input ${errors.facebook ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* URL Portal */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            URL Portal<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="portal_url"
            value={form.portal_url}
            onChange={handleChange}
            className={`input ${errors.portal_url ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* Jam Operasional Senin - Kamis (free text) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Jam Operasional | Senin - Kamis
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hours_mon_thu"
            value={form.hours_mon_thu}
            onChange={handleChange}
            className={`input ${errors.hours_mon_thu ? "border-red-500" : ""}`}
            placeholder="08:00 - 16:00"
          />
        </div>

        {/* Linkedin */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Linkedin<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            className={`input ${errors.linkedin ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* Jam Operasional Jumat (free text) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Jam Operasional | Jumat<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hours_fri"
            value={form.hours_fri}
            onChange={handleChange}
            className={`input ${errors.hours_fri ? "border-red-500" : ""}`}
            placeholder="08:00 - 12:00"
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
