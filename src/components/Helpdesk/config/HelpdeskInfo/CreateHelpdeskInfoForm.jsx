"use client";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateHelpdeskInfoForm() {
  const [form, setForm] = useState({
    email: "",
    noWhatsapp: "",
    noTelephone: "",
    urlPortal: "",
    linkedin: "",
    instagram: "",
    x: "",
    facebook: "",
    jamOperasionalSeninKamis: {
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: "",
    },
    jamOperasionalJumat: {
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
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
    if (!form.email.trim()) newErrors.email = true;
    if (!form.noWhatsapp.trim()) newErrors.noWhatsapp = true;
    if (!form.noTelephone.trim()) newErrors.noTelephone = true;
    if (!form.urlPortal.trim()) newErrors.urlPortal = true;
    if (!form.linkedin.trim()) newErrors.linkedin = true;
    if (!form.instagram.trim()) newErrors.instagram = true;
    if (!form.x.trim()) newErrors.x = true;
    if (!form.facebook.trim()) newErrors.facebook = true;
    if (
      !form.jamOperasionalSeninKamis.startHour ||
      !form.jamOperasionalSeninKamis.startMinute ||
      !form.jamOperasionalSeninKamis.endHour ||
      !form.jamOperasionalSeninKamis.endMinute
    )
      newErrors.jamOperasionalSeninKamis = true;
    if (
      !form.jamOperasionalJumat.startHour ||
      !form.jamOperasionalJumat.startMinute ||
      !form.jamOperasionalJumat.endHour ||
      !form.jamOperasionalJumat.endMinute
    )
      newErrors.jamOperasionalJumat = true;

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
    toast.success("Helpdesk Info berhasil disimpan!", {
      duration: 5000,
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
            name="noWhatsapp"
            value={form.noWhatsapp}
            onChange={handleChange}
            className={`input ${errors.noWhatsapp ? "border-red-500" : ""}`}
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
            value={form.x}
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
            name="noTelephone"
            value={form.noTelephone}
            onChange={handleChange}
            className={`input ${errors.noTelephone ? "border-red-500" : ""}`}
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
            name="urlPortal"
            value={form.urlPortal}
            onChange={handleChange}
            className={`input ${errors.urlPortal ? "border-red-500" : ""}`}
            placeholder="Tambahkan URL"
          />
        </div>

        {/* Jam Operasional Senin - Kamis */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Jam Operasional | Senin - Kamis
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="startHour"
              value={form.jamOperasionalSeninKamis.startHour}
              onChange={(e) => handleTimeChange(e, "jamOperasionalSeninKamis")}
              className={`input w-16 text-center ${
                errors.jamOperasionalSeninKamis ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="23"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="startMinute"
              value={form.jamOperasionalSeninKamis.startMinute}
              onChange={(e) => handleTimeChange(e, "jamOperasionalSeninKamis")}
              className={`input w-16 text-center ${
                errors.jamOperasionalSeninKamis ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-500">—</span>
            <input
              type="number"
              name="endHour"
              value={form.jamOperasionalSeninKamis.endHour}
              onChange={(e) => handleTimeChange(e, "jamOperasionalSeninKamis")}
              className={`input w-16 text-center ${
                errors.jamOperasionalSeninKamis ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="23"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="endMinute"
              value={form.jamOperasionalSeninKamis.endMinute}
              onChange={(e) => handleTimeChange(e, "jamOperasionalSeninKamis")}
              className={`input w-16 text-center ${
                errors.jamOperasionalSeninKamis ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-700">WIB</span>
          </div>
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

        {/* Jam Operasional Jumat */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Jam Operasional | Jumat<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="startHour"
              value={form.jamOperasionalJumat.startHour}
              onChange={(e) => handleTimeChange(e, "jamOperasionalJumat")}
              className={`input w-16 text-center ${
                errors.jamOperasionalJumat ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="23"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="startMinute"
              value={form.jamOperasionalJumat.startMinute}
              onChange={(e) => handleTimeChange(e, "jamOperasionalJumat")}
              className={`input w-16 text-center ${
                errors.jamOperasionalJumat ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-500">—</span>
            <input
              type="number"
              name="endHour"
              value={form.jamOperasionalJumat.endHour}
              onChange={(e) => handleTimeChange(e, "jamOperasionalJumat")}
              className={`input w-16 text-center ${
                errors.jamOperasionalJumat ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="23"
            />
            <span className="text-gray-500">:</span>
            <input
              type="number"
              name="endMinute"
              value={form.jamOperasionalJumat.endMinute}
              onChange={(e) => handleTimeChange(e, "jamOperasionalJumat")}
              className={`input w-16 text-center ${
                errors.jamOperasionalJumat ? "border-red-500" : ""
              }`}
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="text-gray-700">WIB</span>
          </div>
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
