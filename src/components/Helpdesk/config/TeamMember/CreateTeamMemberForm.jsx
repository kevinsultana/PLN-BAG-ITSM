"use client";
import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";

export default function CreateTeamMemberForm() {
  const [form, setForm] = useState({
    namaTeam: "",
    anggotaTeam: [],
    visibility: "",
    deskripsi: "",
    slaPolicy: "",
    email: false,
    autoAssign: false,
  });

  const [newMember, setNewMember] = useState("");
  const [errors, setErrors] = useState({});

  const dataVisibility = [
    { name: "All Agent", value: "allAgent" },
    { name: "Only member team", value: "onlyMemberTeam" },
    { name: "Only Admin", value: "onlyAdmin" },
  ];

  const dataSLA = [
    { name: "SLA - Critical Incident", value: "criticalIncident" },
    { name: "SLA - Low Priority Request", value: "lowPriorityRequest" },
    { name: "SLA - Emergency Access Request", value: "emergencyAccessRequest" },
    { name: "SLA - IT Procurement Approval", value: "itProcurementApproval" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      setForm({
        ...form,
        anggotaTeam: [...form.anggotaTeam, newMember.trim()],
      });
      setNewMember("");
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    setForm({
      ...form,
      anggotaTeam: form.anggotaTeam.filter(
        (member) => member !== memberToRemove
      ),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.namaTeam.trim()) newErrors.namaTeam = true;
    if (form.anggotaTeam.length === 0) newErrors.anggotaTeam = true;
    if (!form.visibility) newErrors.visibility = true;
    if (!form.deskripsi.trim()) newErrors.deskripsi = true;
    if (!form.slaPolicy) newErrors.slaPolicy = true;
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
    console.log("Submitted Data:", form);
    toast.success("Team Member berhasil dibuat!", {
      description: `Tim ${form.namaTeam} telah berhasil ditambahkan.`,
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl mt-4 p-6 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat Team Member</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nama Team Member */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Team Member<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaTeam"
            value={form.namaTeam}
            onChange={handleChange}
            className={`input ${errors.namaTeam ? "border-red-500" : ""}`}
            placeholder="Nama Team Member"
          />
        </div>

        {/* Anggota Team */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Anggota Team<span className="text-red-500">*</span>
          </label>
          <div
            className={`flex flex-wrap items-center gap-2 border rounded-md p-2 ${
              errors.anggotaTeam ? "border-red-500" : "border-gray-300"
            }`}
          >
            {form.anggotaTeam.map((member, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 rounded-full pl-3 pr-2 py-1 text-sm"
              >
                {member}
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTrashAlt className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddMember())
              }
              className="flex-1 min-w-[100px] border-none focus:outline-none p-1"
              placeholder="Tambahkan anggota"
            />
            <button
              type="button"
              onClick={handleAddMember}
              className="p-1 text-[#65C7D5] hover:text-[#4FB3C1] transition-colors duration-200"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Visibility<span className="text-red-500">*</span>
          </label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className={`input ${errors.visibility ? "border-red-500" : ""}`}
          >
            <option value="">Pilih Visibility</option>
            {dataVisibility.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <CKEditorWrapper
            onChange={(data) => setForm({ ...form, deskripsi: data })}
            value={form.deskripsi}
            className={`border rounded-md ${
              errors.deskripsi ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Deskripsi..."
          />
        </div>

        {/* SLA Policy */}
        <div className="flex flex-col gap-2">
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

        {/* Email & Auto Assign */}
        <div className="flex items-start gap-6 pt-8">
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="email"
              checked={form.email}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-[#65C7D5] rounded-full"
            />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="autoAssign"
              checked={form.autoAssign}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-[#65C7D5] rounded-full"
            />
            Auto Assign
          </label>
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
