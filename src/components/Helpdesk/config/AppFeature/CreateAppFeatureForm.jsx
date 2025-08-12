"use client";
import React, { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CreateAppFeatureForm() {
  const [form, setForm] = useState({
    namaFeature: "",
    url: "",
    deskripsi: "",
    publish: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.namaFeature.trim()) newErrors.namaFeature = true;
    if (!form.url.trim()) newErrors.url = true;
    if (!form.deskripsi.trim()) newErrors.deskripsi = true;
    if (!form.publish) newErrors.publish = true; // Publish is required and must be checked
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
    toast.success("Feature Aplikasi berhasil dibuat!", {
      description: `Feature "${form.namaFeature}" telah berhasil ditambahkan.`,
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat Feature Aplikasi</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Feature */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Feature<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaFeature"
            value={form.namaFeature}
            onChange={handleChange}
            className={`input ${errors.namaFeature ? "border-red-500" : ""}`}
            placeholder="Nama Feature Aplikasi"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 row-span-2">
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

        {/* URL */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            URL<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={handleChange}
            className={`input ${errors.url ? "border-red-500" : ""}`}
            placeholder="URL"
          />
        </div>

        {/* Publish to Portal ITSM */}
        <div className="flex items-start">
          <FormControlLabel
            control={
              <Checkbox
                checked={form.publish}
                onChange={handleChange}
                name="publish"
                sx={{
                  color: errors.publish ? "#ef4444" : "#65C7D5",
                  "&.Mui-checked": {
                    color: "#65C7D5",
                  },
                }}
              />
            }
            label={
              <span
                className={`font-semibold text-sm ${
                  errors.publish ? "text-red-500" : ""
                }`}
              >
                Publish to Portal ITSM<span className="text-red-500">*</span>
              </span>
            }
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
