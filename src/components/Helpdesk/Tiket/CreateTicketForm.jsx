"use client";
import React, { useEffect, useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { toast } from "sonner";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FormControl, Select, MenuItem } from "@mui/material";
import { PostProxyUrl, ProxyUrl } from "@/api/BaseUrl";

export default function CreateTicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    team_id: "",
    application_id: "",
    assigned_to: "",
    requester: "",
    priority_id: "",
    division_id: "",
    ticket_type_id: "",
    email: "",
    sla_policy_id: "",
    whatsapp: "",
    description: "",
    bpo_id: "",
    contract_number: "",
    contract_value: null,
    subject: "",
  });

  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [dataPriorities, setDataPriorities] = useState([]);
  const [dataTipe, setDataTipe] = useState([]);
  const [dataSla, setDataSla] = useState([]);
  const [dataApplications, setDataApplications] = useState([]);
  const [dataDivisions, setDataDivisions] = useState([]);
  const [dataBpo, setDataBpo] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  const getDataAllSelections = async () => {
    try {
      const res = await ProxyUrl.get("/tickets/selections");
      setDataTeams(res.data.data.teams || []);
      setDataPriorities(res.data.data.priorities || []);
      setDataTipe(res.data.data.ticket_types || []);
      setDataSla(res.data.data.sla_policies || []);
      setDataApplications(res.data.data.applications || []);
      setDataDivisions(res.data.data.divisions || []);
      setDataBpo(res.data.data.bpos || []);
      setDataUsers(res.data.data.users || []);
    } catch (error) {
      console.error("Error fetching all selections:", error);
    }
  };

  useEffect(() => {
    getDataAllSelections();
  }, []);

  const MAX_TOTAL_BYTES = 50 * 1024 * 1024; // 50 MB

  const totalFilesSize = (arr) => arr.reduce((s, f) => s + (f?.size || 0), 0);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const total = totalFilesSize(selected);
    if (total > MAX_TOTAL_BYTES) {
      toast.error(
        "Total lampiran melebihi 50 MB. Silakan pilih file lebih kecil."
      );
      return;
    }
    setFiles(selected);
    setForm((prev) => ({
      ...prev,
      lampiran: selected.map((f) => f.name).join(", "),
    }));
    setErrors((prev) => ({ ...prev, lampiran: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contract_value") {
      const numericValue = value === "" ? "" : Number(value);
      if (numericValue === "" || !isNaN(numericValue)) {
        setForm({
          ...form,
          [name]: numericValue,
        });
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.team_id) newErrors.team_id = true;
    if (!form.application_id) newErrors.application_id = true;
    if (!String(form.assigned_to || "").trim()) newErrors.assigned_to = true;
    if (!String(form.requester || "").trim()) newErrors.requester = true;
    if (!form.priority_id) newErrors.priority_id = true;
    if (!form.division_id) newErrors.division_id = true;
    if (!form.ticket_type_id) newErrors.ticket_type_id = true;
    if (!String(form.email || "").trim()) newErrors.email = true;
    if (!form.sla_policy_id) newErrors.sla_policy_id = true;
    if (!String(form.whatsapp || "").trim()) newErrors.whatsapp = true;
    // if (!String(form.lampiran || "").trim()) newErrors.lampiran = true;
    if (!String(form.description || "").trim()) newErrors.description = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // console.log(form);
  const handleSubmit = (e) => {
    e.preventDefault();

    const submit = async () => {
      try {
        // Make a shallow copy of form so we don't rely on asynchronous state updates
        const payload = { ...form };

        // If there are files, upload them first and collect returned attachment IDs
        let mappedData = payload.attachment_ids || [];
        if (files && files.length > 0) {
          const attForm = new FormData();
          files.forEach((f) => attForm.append("files", f, f.name));

          const uploadPromise = PostProxyUrl.post("/attachments", attForm);

          toast.promise(uploadPromise, {
            loading: "Mengunggah lampiran...",
            success: "Lampiran berhasil diunggah",
            error: "Gagal mengunggah lampiran",
          });

          const res = await uploadPromise;

          // Normalize response to extract IDs
          mappedData =
            (res?.data?.data && res.data.data.map((i) => i.id)) ||
            (Array.isArray(res?.data) && res.data.map((i) => i.id)) ||
            [];

          // Update local component state for UI only
          payload.attachment_ids = mappedData;
        }

        // Call parent onSubmit with the up-to-date payload and attachment IDs
        if (onSubmit) await onSubmit(payload, mappedData || []);
      } catch (error) {
        console.error("Error uploading attachments or submitting form:", error);
        toast.error("Terjadi kesalahan saat mengirim data. Coba lagi.");
      }
    };

    submit();
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
          <FormControl fullWidth size="small" error={!!errors.team_id}>
            <Select
              name="team_id"
              value={form.team_id}
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
          <FormControl fullWidth size="small" error={!!errors.application_id}>
            <Select
              name="application_id"
              value={form.application_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Aplikasi</em>
              </MenuItem>
              {dataApplications.map((app) => (
                <MenuItem key={app.id} value={String(app.id ?? "")}>
                  {app.name}
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
          <FormControl fullWidth size="small" error={!!errors.assigned_to}>
            <Select
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih User</em>
              </MenuItem>
              {dataUsers.map((user) => (
                <MenuItem key={user.id} value={String(user.id ?? "")}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth size="small" error={!!errors.priority_id}>
            <Select
              name="priority_id"
              value={form.priority_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
              renderValue={(selected) => {
                if (!selected) return <em>Pilih Priority</em>;
                const p = dataPriorities.find(
                  (p) => String(p.id) === String(selected)
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
                          p?.level === "Kritis"
                            ? "#ef4444"
                            : p?.level === "Tinggi"
                            ? "#f97316"
                            : p?.level === "Sedang"
                            ? "#eab308"
                            : p?.level === "Rendah"
                            ? "#22c55e"
                            : "#d1d5db",
                      }}
                    ></span>
                    {p?.level}
                  </span>
                );
              }}
            >
              <MenuItem value="">
                <em>Pilih Priority</em>
              </MenuItem>
              {dataPriorities.map((p, index) => (
                <MenuItem key={index} value={String(p.id ?? "")}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        marginRight: 8,
                        backgroundColor:
                          p.level === "Kritis"
                            ? "#ef4444"
                            : p.level === "Tinggi"
                            ? "#f97316"
                            : p.level === "Sedang"
                            ? "#eab308"
                            : p.level === "Rendah"
                            ? "#22c55e"
                            : "#d1d5db",
                      }}
                    ></span>
                    {p.level}
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
          <FormControl fullWidth size="small" error={!!errors.division_id}>
            <Select
              name="division_id"
              value={form.division_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Divisi</em>
              </MenuItem>
              {dataDivisions.map((divisi, index) => (
                <MenuItem key={index} value={String(divisi.id ?? "")}>
                  {divisi.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* subject */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`input ${errors.subject ? "border-red-500" : ""}`}
            placeholder="Jhon Doe"
          />
        </div>

        {/* Tipe - MUI Select */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Tipe<span className="text-red-500">*</span>
          </label>
          <FormControl fullWidth size="small" error={!!errors.ticket_type_id}>
            <Select
              name="ticket_type_id"
              value={form.ticket_type_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih Tipe</em>
              </MenuItem>
              {dataTipe.map((tipe, index) => (
                <MenuItem key={index} value={String(tipe.id ?? "")}>
                  {tipe.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {form.ticket_type_id === "a38273cd-c962-464a-b61f-ca9b133dcff5" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">
                BPO<span className="text-red-500">*</span>
              </label>
              <FormControl fullWidth size="small" error={!!errors.bpo_id}>
                <Select
                  name="bpo_id"
                  value={form.bpo_id || ""}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Pilih BPO</em>
                  </MenuItem>
                  {dataBpo.map((bpo, index) => (
                    <MenuItem key={index} value={String(bpo.id ?? "")}>
                      Divisi {bpo.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">
                Nomer Kontrak<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contract_number"
                value={form.contract_number}
                onChange={handleChange}
                className={`input ${
                  errors.contract_number ? "border-red-500" : ""
                }`}
                placeholder="Nomer Kontrak"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">
                Nilai Kontrak<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="contract_value"
                value={form.contract_value}
                onChange={handleChange}
                className={`input ${
                  errors.contract_value ? "border-red-500" : ""
                }`}
                placeholder="Nilai Kontrak"
              />
            </div>
          </>
        )}

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
          <FormControl fullWidth size="small" error={!!errors.sla_policy_id}>
            <Select
              name="sla_policy_id"
              value={form.sla_policy_id || ""}
              onChange={handleChange}
              displayEmpty
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Pilih SLA Policy</em>
              </MenuItem>
              {dataSla.map((sla, index) => (
                <MenuItem key={index} value={String(sla.id ?? "")}>
                  {sla.name}
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
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            className={`input ${errors.whatsapp ? "border-red-500" : ""}`}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Lampiran */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Lampiran<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Maks 50MB)</span>
          </label>
          <input
            type="file"
            name="lampiran"
            multiple
            onChange={handleFileChange}
            className={`file-input ${errors.lampiran ? "border-red-500" : ""}`}
            accept="*/*"
          />
          <div className="text-sm text-gray-600">
            {files.length > 0 ? (
              <ul className="list-disc ml-5">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>
                      {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = files.filter((_, idx) => idx !== i);
                        setFiles(next);
                        setForm((prev) => ({
                          ...prev,
                          lampiran: next.map((x) => x.name).join(", "),
                        }));
                      }}
                      className="text-red-500 ml-3"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
                <li>
                  Total: {(totalFilesSize(files) / 1024 / 1024).toFixed(2)} MB
                </li>
              </ul>
            ) : (
              <div className="input flex items-center px-3 py-2">
                <span className="flex-grow text-gray-500">
                  {form.lampiran || "Lampirkan Dokumen / Foto"}
                </span>
                <FaExternalLinkAlt className="text-gray-500" />
              </div>
            )}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 row-span-2">
          <label className="font-semibold text-sm">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <CKEditorWrapper
            value={form.description}
            onChange={(data) => setForm({ ...form, description: data })}
            className={`ckeditor-container ${
              errors.description ? "border-red-500" : ""
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
