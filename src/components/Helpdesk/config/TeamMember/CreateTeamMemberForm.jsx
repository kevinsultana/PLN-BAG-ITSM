"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaTimesCircle, FaCheck } from "react-icons/fa";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import TambahAnggotaModal from "./TambahAnggotaModal";

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

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anggotaModal, setAnggotaModal] = useState(false);
  const dropdownRef = useRef(null);

  const [dataAnggotaTeamMember, setDataAnggotaTeamMember] = useState([
    { name: "Pedro", email: "pedro@mail.com", value: "pedro" },
    { name: "John", email: "john@mail.com", value: "john" },
    { name: "Maria", email: "maria@mail.com", value: "maria" },
  ]);

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

  const handleAddMember = (memberData) => {
    // Memperbarui state dataAnggotaTeamMember dengan anggota baru
    setDataAnggotaTeamMember((prevData) => [...prevData, memberData]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMemberSelect = (memberValue) => {
    setForm((prevForm) => {
      if (prevForm.anggotaTeam.includes(memberValue)) {
        return {
          ...prevForm,
          anggotaTeam: prevForm.anggotaTeam.filter(
            (member) => member !== memberValue
          ),
        };
      }
      return {
        ...prevForm,
        anggotaTeam: [...prevForm.anggotaTeam, memberValue],
      };
    });
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl mt-4 p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-6">Buat Team Member</h1>
        <button
          onClick={() => setAnggotaModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
        >
          Tambah Anggota
        </button>
      </div>
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

        {/* Anggota Team (Multi-select dropdown) */}
        <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
          <label className="font-semibold text-sm">
            Anggota Team<span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex flex-wrap items-center gap-2 border rounded-md p-2 min-h-[42px] ${
              errors.anggotaTeam ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex flex-wrap gap-2 w-[94%]">
              {form.anggotaTeam.length > 0 ? (
                form.anggotaTeam.map((member, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-200 rounded-full pl-3 pr-2 py-1 text-sm"
                  >
                    {dataAnggotaTeamMember.find((m) => m.value === member)
                      ?.name || member}
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimesCircle className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400">Pilih anggota</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-2xl self-end text-gray-500"
            >
              {isDropdownOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full top-18 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1 max-h-48 overflow-y-auto">
                {dataAnggotaTeamMember.map((member, index) => (
                  <li
                    key={index}
                    onClick={() => handleMemberSelect(member.value)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                  >
                    {member.name}
                    {form.anggotaTeam.includes(member.value) && (
                      <FaCheck className="text-[#65C7D5]" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
      <TambahAnggotaModal
        isOpen={anggotaModal}
        onClose={() => setAnggotaModal(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
}
