"use client";
import React, { useState, useEffect } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProxyUrl } from "@/api/BaseUrl";
import {
  FormControl,
  MenuItem,
  Select,
  Chip,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

export default function CreateTeamMemberForm({
  onSubmit,
  data = {},
  onCancel,
}) {
  const [form, setForm] = useState({
    id: null,
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

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setForm((prev) => {
        const newForm = {
          id: data.id || null,
          namaTeam: data.name || "",
          anggotaTeam: data.teams || [],
          visibility: data.visibility_id || "",
          deskripsi: data.description || "",
          slaPolicy: data.slaPolicy || "",
          email: Boolean(data.is_email),
          autoAssign: Boolean(data.is_autoassign),
        };
        // Only update if different
        if (JSON.stringify(prev) !== JSON.stringify(newForm)) {
          return newForm;
        }
        return prev;
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMembersChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm((prev) => ({
      ...prev,
      anggotaTeam: typeof value === "string" ? value.split(",") : value,
    }));
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
      id: form.id,
      name: form.namaTeam,
      description: form.deskripsi,
      is_autoassign: form.autoAssign,
      is_email: form.email,
      teams: form.anggotaTeam, // array of ids
      visibility_id: form.visibility,
    };

    onSubmit(payload);
  };

  return (
    <div className="bg-white rounded-xl mt-4 p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-6">
          {form.id ? "Edit Team Member" : "Buat Team Member"}
        </h1>
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

        {/* Anggota Team (MUI Multi-select) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Anggota Team<span className="text-red-500">*</span>
          </label>
          <FormControl
            fullWidth
            size="small"
            error={Boolean(errors.anggotaTeam)}
          >
            <Select
              multiple
              name="anggotaTeam"
              value={form.anggotaTeam}
              onChange={handleMembersChange}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if ((selected || []).length === 0) {
                  return <span className="text-gray-400">Pilih anggota</span>;
                }
                return (
                  <div className="flex flex-wrap gap-2">
                    {selected.map((value) => {
                      const member = dataAnggotaTeamMember.find(
                        (m) => m.id === value
                      );
                      return (
                        <Chip
                          key={value}
                          size="small"
                          label={member?.fullname || value}
                          onMouseDown={(e) => e.stopPropagation()}
                          onDelete={() =>
                            setForm((prev) => ({
                              ...prev,
                              anggotaTeam: prev.anggotaTeam.filter(
                                (v) => v !== value
                              ),
                            }))
                          }
                        />
                      );
                    })}
                  </div>
                );
              }}
            >
              <MenuItem disabled value="">
                <em>Pilih anggota</em>
              </MenuItem>
              {dataAnggotaTeamMember.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  <Checkbox
                    checked={form.anggotaTeam.indexOf(member.id) > -1}
                  />
                  <ListItemText primary={member.fullname} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Visibility */}
        {/* <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Visibility<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small">
            <Select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Pilih Visibility</em>
              </MenuItem>
              {dataVisibility.map((item, index) => (
                <MenuItem key={index} value={item.ID}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}

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
            onClick={onCancel}
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
