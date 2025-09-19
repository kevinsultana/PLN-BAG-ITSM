"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormControl, MenuItem, Select, Switch } from "@mui/material";
import { ProxyUrl } from "@/api/BaseUrl";

export default function CreateAgentForm({
  data = null,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState({
    company_name: data?.company_name || "",
    email: data?.email || "",
    fullname: data?.fullname || "",
    is_active: data?.is_active ?? true,
    password: "",
    re_password: "",
    role_id: data?.role_id || "",
  });

  const [errors, setErrors] = useState({});

  const [roles, setRoles] = useState(() => {
    if (data?.role_id && data?.role_name) {
      return [{ label: data.role_name, value: data.role_id }];
    }
    return [];
  });

  const getRolesData = async () => {
    try {
      const res = await ProxyUrl.get("/roles");
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      // Only allow 'Lead Agent' and 'Agent Level 2'
      const allowedRoles = ["Lead Agent", "Agent Level 2"];
      const mappedRoles = list
        .filter((role) => allowedRoles.includes(role.name))
        .map((role) => ({
          label: role.name,
          value: role.id,
        }));

      if (
        data?.role_id &&
        data?.role_name &&
        !mappedRoles.find((r) => r.value === data.role_id)
      ) {
        setRoles([
          { label: data.role_name, value: data.role_id },
          ...mappedRoles,
        ]);
      } else {
        setRoles(mappedRoles);
      }
    } catch (error) {
      console.error("Error fetching roles data:", error);
    }
  };

  useEffect(() => {
    getRolesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.role_id, data?.role_name]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      company_name: data?.company_name || "",
      email: data?.email || "",
      fullname: data?.fullname || "",
      is_active: data?.is_active ?? true,
      role_id: data?.role_id || "",
      password: "",
      re_password: "",
    }));
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullname || !form.fullname.trim()) newErrors.fullname = true;
    if (!data) {
      if (!form.password) newErrors.password = true;
      if (form.password !== form.re_password) newErrors.re_password = true;
    } else {
      if (form.password || form.re_password) {
        if (!form.password) newErrors.password = true;
        if (form.password !== form.re_password) newErrors.re_password = true;
      }
    }
    if (!form.role_id) newErrors.role_id = true;
    if (!form.email || !form.email.trim()) newErrors.email = true;
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
    const submitData = {
      company_name: form.company_name,
      email: form.email,
      fullname: form.fullname,
      is_active: !!form.is_active,
      role_id: form.role_id,
      ...(data?.id ? { id: data.id } : {}),
    };
    if (form.password) {
      submitData.password = form.password;
      submitData.re_password = form.re_password;
    }
    if (onSubmit) {
      onSubmit(submitData);
    } else {
      toast.success(
        data ? "Agent berhasil diperbarui!" : "Agent berhasil disimpan!",
        {
          description: `Agent "${form.fullname}" ${
            data ? "telah diperbarui" : "telah berhasil disimpan"
          }.`,
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-4 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">
        {data ? "Edit Agent" : "Buat Agent"}
      </h1>
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
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className={`input ${errors.fullname ? "border-red-500" : ""}`}
            placeholder="Nama lengkap"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`input ${errors.password ? "border-red-500" : ""}`}
            placeholder="Password"
          />
        </div>

        {/* Role (dropdown) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Role<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small">
            <Select
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Role</em>
              </MenuItem>
              {roles.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="re_password"
            value={form.re_password}
            onChange={handleChange}
            className={`input ${errors.re_password ? "border-red-500" : ""}`}
            placeholder="Confirm password"
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
            placeholder="email@contoh.com"
          />
        </div>

        {/* Nama Perusahaan */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Nama Perusahaan</label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className={`input`}
            placeholder="Nama perusahaan"
          />
        </div>

        {/* Status (switch) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Status</label>
          <div className="flex items-center gap-2">
            <Switch
              checked={!!form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
              name="is_active"
            />
            <span className="text-sm text-gray-600">Aktif</span>
          </div>
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
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
