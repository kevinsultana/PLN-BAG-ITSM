"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaTimesCircle, FaCheck } from "react-icons/fa";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import TambahAnggotaModal from "./TambahAnggotaModal";
import { useRouter } from "next/navigation";
import { ProxyUrl } from "@/api/BaseUrl";

export default function CreateTeamMemberForm({ onSubmit }) {
  const [form, setForm] = useState({
    namaTeam: "",
    anggotaTeam: [],
    visibility: "",
    deskripsi: "",
    slaPolicy: "",
    email: false,
    autoAssign: false,
  });

  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anggotaModal, setAnggotaModal] = useState(false);
  const dropdownRef = useRef(null);

  const [dataAnggotaTeamMember, setDataAnggotaTeamMember] = useState([]);

  const [dataVisibility, setDataVisibility] = useState([]);

  const getDataAnggota = async () => {
    try {
      const res = await ProxyUrl.get("/teams");
      const data = res.data.data;
      setDataAnggotaTeamMember(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const getDataVisibility = async () => {
    try {
      const res = await ProxyUrl.get("/visibilities");
      const data = res.data.data;
      setDataVisibility(data);
    } catch (error) {
      console.error("Error fetching visibility options:", error);
    }
  };

  useEffect(() => {
    getDataAnggota();
    getDataVisibility();
  }, []);

  const handleAddMember = async (memberData) => {
    try {
      await ProxyUrl.post("/teams", memberData);
      getDataAnggota();
      toast.success("Anggota berhasil ditambahkan!", {
        description: `Anggota ${memberData.nama} telah berhasil ditambahkan.`,
      });
    } catch (error) {
      console.log(error);
    }
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
    // Build payload conforming to API contract
    const payload = {
      name: form.namaTeam,
      description: form.deskripsi,
      is_autoassign: form.autoAssign,
      is_email: form.email,
      teams: form.anggotaTeam, // assuming array of identifiers or names
      visibility_id: form.visibility,
    };

    onSubmit(payload);
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
            className={`relative border rounded-md p-2 pr-10 min-h-[42px] ${
              errors.anggotaTeam ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex flex-wrap gap-2 w-full pr-10 items-start">
              {form.anggotaTeam.length > 0 ? (
                form.anggotaTeam.map((member, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-200 rounded-full pl-3 pr-2 py-1 text-sm max-w-full"
                  >
                    {dataAnggotaTeamMember.find((m) => m.ID === member)?.Name ||
                      member}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMember(member);
                      }}
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

            {/* arrow button fixed to top-right of the box */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="absolute right-2 top-2 text-gray-500 p-1"
              aria-label="toggle anggota dropdown"
            >
              {isDropdownOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1 max-h-48 overflow-y-auto">
                {dataAnggotaTeamMember.map((member, index) => (
                  <li
                    key={index}
                    onClick={() => handleMemberSelect(member.ID)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                  >
                    {member.Name}
                    {form.anggotaTeam.includes(member.ID) && (
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
              <option key={index} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 col-span-2">
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
            onClick={() => router.back()}
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
