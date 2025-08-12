"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { Switch } from "@mui/material";

export default function DetailBPOForm() {
  const [form, setForm] = useState({
    namaLengkap: "Jhon Doe",
    email: "jhondoe@gmail.com",
    namaBPO: "BPO IT",
    vicePresident: ["Jhon Doe"],
    namaDivisi: "IT",
    noWhatsapp: "08123456789",
    status: true, // Assuming default status is active
  });

  const [newVicePresident, setNewVicePresident] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddVicePresident = () => {
    if (newVicePresident.trim() !== "") {
      setForm({
        ...form,
        vicePresident: [...form.vicePresident, newVicePresident.trim()],
      });
      setNewVicePresident("");
    }
  };

  const handleRemoveVicePresident = (memberToRemove) => {
    setForm({
      ...form,
      vicePresident: form.vicePresident.filter(
        (member) => member !== memberToRemove
      ),
    });
  };

  const handleChangeStatus = (e) => {
    setForm({ ...form, status: e.target.checked });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.namaLengkap.trim()) newErrors.namaLengkap = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.namaBPO.trim()) newErrors.namaBPO = true;
    if (form.vicePresident.length === 0) newErrors.vicePresident = true;
    if (!form.namaDivisi.trim()) newErrors.namaDivisi = true;
    if (!form.noWhatsapp.trim()) newErrors.noWhatsapp = true;
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
    toast.success("Detail BPO berhasil diperbarui!", {
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Detail BPO</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Lengkap */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Lengkap<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaLengkap"
            value={form.namaLengkap}
            onChange={handleChange}
            className={`input ${errors.namaLengkap ? "border-red-500" : ""}`}
            placeholder="Nama Lengkap"
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

        {/* Nama BPO */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama BPO<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaBPO"
            value={form.namaBPO}
            onChange={handleChange}
            className={`input ${errors.namaBPO ? "border-red-500" : ""}`}
            placeholder="Nama BPO"
          />
        </div>

        {/* Vice President Terkait */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Vice President Terkait<span className="text-red-500">*</span>
          </label>
          <div
            className={`flex flex-wrap items-center gap-2 border rounded-md p-2 ${
              errors.vicePresident ? "border-red-500" : "border-gray-300"
            }`}
          >
            {form.vicePresident.map((vp, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 rounded-full pl-3 pr-2 py-1 text-sm"
              >
                {vp}
                <button
                  type="button"
                  onClick={() => handleRemoveVicePresident(vp)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimesCircle className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newVicePresident}
              onChange={(e) => setNewVicePresident(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(), handleAddVicePresident())
              }
              className="flex-1 min-w-[100px] border-none focus:outline-none p-1"
              placeholder="Tambahkan VP"
            />
            <button
              type="button"
              onClick={handleAddVicePresident}
              className="p-1 text-[#65C7D5] hover:text-[#4FB3C1] transition-colors duration-200"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Nama Divisi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Divisi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaDivisi"
            value={form.namaDivisi}
            onChange={handleChange}
            className={`input ${errors.namaDivisi ? "border-red-500" : ""}`}
            placeholder="Nama Divisi"
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

        {/* Placeholder for alignment */}
        <div className="hidden md:block"></div>

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
