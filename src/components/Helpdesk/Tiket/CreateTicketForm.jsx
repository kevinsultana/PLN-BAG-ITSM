"use client";
import React, { useEffect, useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProxyUrl } from "@/api/BaseUrl";

export default function CreateTicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    team: "",
    namaAplikasi: "",
    assignedTo: "",
    requester: "",
    priority: "",
    namaDivisi: "",
    tipe: "",
    email: "",
    slaPolicy: "",
    noWhatsapp: "",
    lampiran: "",
    deskripsi: "",
  });

  const [errors, setErrors] = useState({});
  const [dataTeams, setDataTeams] = useState([]);
  const [dataPriorities, setDataPriorities] = useState([]);
  const [dataTipe, setDataTipe] = useState([]);
  const [dataSla, setDataSla] = useState([]);
  const [dataApplications, setDataApplications] = useState([]);
  const [dataDivisions, setDataDivisions] = useState([]);

  const getDataTeams = async () => {
    try {
      const res = await ProxyUrl.get("/team-groups");
      const data = res.data?.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));
      setDataTeams(data);
    } catch (error) {
      console.error("Error fetching team groups:", error);
    }
  };

  const getDataPriorities = async () => {
    try {
      const res = await ProxyUrl.get("/priorities");
      setDataPriorities(res?.data?.data);
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  };

  const getTicketTypes = async () => {
    try {
      const res = await ProxyUrl.get("/ticket-types");
      setDataTipe(res?.data?.data);
    } catch (error) {
      console.error("Error fetching ticket types:", error);
    }
  };

  const getDataSla = async () => {
    try {
      const res = await ProxyUrl.get("/sla-policies");
      setDataSla(res?.data?.data);
    } catch (error) {
      console.error("Error fetching SLA policies:", error);
    }
  };

  const getDataApplications = async () => {
    try {
      const res = await ProxyUrl.get("/applications");
      setDataApplications(res?.data?.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const getDataDivisions = async () => {
    try {
      const res = await ProxyUrl.get("/divisions");
      setDataDivisions(res?.data?.data);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  useEffect(() => {
    getDataTeams();
    getDataPriorities();
    getTicketTypes();
    getDataSla();
    getDataApplications();
    getDataDivisions();
  }, []);

  // const dataTeams = ["Functional", "Technical"];
  // const dataPriorities = ["Kritis", "Tinggi", "Sedang", "Rendah"];
  // const dataTipe = ["INFR", "SCRQ", "INSP", "CRQS"];
  // const dataSLAs = [
  //   "SLA - Critical Incident",
  //   "SLA - Low Priority",
  //   "SLA - Emergency Access",
  // ];

  const priorityColors = {
    Kritis: "text-red-500",
    Tinggi: "text-orange-500",
    Sedang: "text-yellow-500",
    Rendah: "text-green-500",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(form)) {
      if (
        (typeof value === "string" && !value.trim()) ||
        (key === "deskripsi" && !value.trim()) ||
        !value
      ) {
        newErrors[key] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validate()) {
    //   toast.error("Lengkapi data di bawah ini", {
    //     description: "Silahkan lengkapi semua field yang ditandai (*).",
    //   });
    //   return;
    // }
    // console.log("Submitted Data:", form);
    onSubmit(form);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-6">Buat Tiket</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Team - MUI Select dengan label custom */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Team<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.team}>
            <Select
              name="team"
              value={form.team}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Team</em>
              </MenuItem>
              {dataTeams.map((team) => (
                <MenuItem key={team.id} value={String(team.id ?? "")}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Nama Aplikasi - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Aplikasi<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.namaAplikasi}>
            <Select
              name="namaAplikasi"
              value={form.namaAplikasi}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Aplikasi</em>
              </MenuItem>
              {dataApplications.map((app) => (
                <MenuItem key={app.id} value={String(app.ID ?? "")}>
                  {app.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Assigned To */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Assigned to<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className={`input ${errors.assignedTo ? "border-red-500" : ""}`}
            placeholder="Jordi Amat"
          />
        </div>

        {/* Requester */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Requester<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="requester"
            value={form.requester}
            onChange={handleChange}
            className={`input ${errors.requester ? "border-red-500" : ""}`}
            placeholder="Jhon Doe"
          />
        </div>

        {/* Priority - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Priority<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.priority}>
            <Select
              name="priority"
              value={form.priority || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
              renderValue={(selected) => {
                if (!selected) return <em>Pilih Priority</em>;
                const p = dataPriorities.find(
                  (p) => String(p.ID) === String(selected)
                );
                return (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        marginRight: 8,
                        backgroundColor:
                          p?.Level === "Kritis"
                            ? "#ef4444"
                            : p?.Level === "Tinggi"
                            ? "#f97316"
                            : p?.Level === "Sedang"
                            ? "#eab308"
                            : p?.Level === "Rendah"
                            ? "#22c55e"
                            : "#d1d5db",
                      }}
                    ></span>
                    {p?.Level}
                  </span>
                );
              }}
            >
              <MenuItem value="">
                <em>Pilih Priority</em>
              </MenuItem>
              {dataPriorities.map((p, index) => (
                <MenuItem key={index} value={String(p.ID ?? "")}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        marginRight: 8,
                        backgroundColor:
                          p.Level === "Kritis"
                            ? "#ef4444"
                            : p.Level === "Tinggi"
                            ? "#f97316"
                            : p.Level === "Sedang"
                            ? "#eab308"
                            : p.Level === "Rendah"
                            ? "#22c55e"
                            : "#d1d5db",
                      }}
                    ></span>
                    {p.Level}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Nama Divisi - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Divisi<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.namaDivisi}>
            <Select
              name="namaDivisi"
              value={form.namaDivisi || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Divisi</em>
              </MenuItem>
              {dataDivisions.map((divisi, index) => (
                <MenuItem key={index} value={String(divisi.ID ?? "")}>
                  {divisi.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Tipe - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Tipe<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.tipe}>
            <Select
              name="tipe"
              value={form.tipe || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Tipe</em>
              </MenuItem>
              {dataTipe.map((tipe, index) => (
                <MenuItem key={index} value={String(tipe.ID ?? "")}>
                  {tipe.Code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            placeholder="Email"
          />
        </div>

        {/* SLA Policy - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            SLA Policy<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.slaPolicy}>
            <Select
              name="slaPolicy"
              value={form.slaPolicy || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih SLA Policy</em>
              </MenuItem>
              {dataSla.map((sla, index) => (
                <MenuItem key={index} value={String(sla.ID ?? "")}>
                  {sla.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

        {/* Lampiran */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Lampiran<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Maks 5MB)</span>
          </label>
          <div
            className={`flex items-center input px-3 py-2 ${
              errors.lampiran ? "border-red-500" : ""
            }`}
          >
            <span className="flex-grow text-gray-500">
              {form.lampiran || "Lampirkan Dokumen / Foto"}
            </span>
            <FaExternalLinkAlt className="text-gray-500" />
          </div>
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

        {/* Buttons */}
        <div className="md:col-span-2 flex  gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
