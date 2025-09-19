"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { useAuth } from "@/context/AuthContext";
import Dropdown from "@/components/Dropdown";
import { PostProxyUrl } from "@/api/BaseUrl";

export default function TicketForm({ dataSelection, onSubmit }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    division_id: "",
    email: "",
    whatsapp: "",
    application_id: "",
    subject: "",
    description: "",
    lampiran: null,
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeDeskripsiTiket = (input) => {
    setForm({ ...form, description: input });
  };

  const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB
  const totalFilesSize = (arr) => arr.reduce((s, f) => s + (f?.size || 0), 0);

  const handleFileInput = (e) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].filter(
      (f, i, arr) =>
        arr.findIndex((x) => x.name === f.name && x.size === f.size) === i
    );
    const total = totalFilesSize(combined);
    if (total > MAX_TOTAL_BYTES) {
      toast.error(
        "Total lampiran melebihi 25 MB. Silakan pilih file lebih kecil."
      );
      return;
    }
    setFiles(combined);
    setForm((prev) => ({ ...prev, lampiran: combined }));
    setErrors((prev) => ({ ...prev, lampiran: false }));
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (
        e.clipboardData &&
        e.clipboardData.files &&
        e.clipboardData.files.length > 0
      ) {
        const pastedFiles = Array.from(e.clipboardData.files);
        const combined = [...files, ...pastedFiles].filter(
          (f, i, arr) =>
            arr.findIndex((x) => x.name === f.name && x.size === f.size) === i
        );
        const total = totalFilesSize(combined);
        if (total > MAX_TOTAL_BYTES) {
          toast.error(
            "Total lampiran melebihi 25 MB. Silakan pilih file lebih kecil."
          );
          return;
        }
        setFiles(combined);
        setForm((prev) => ({ ...prev, lampiran: combined }));
        setErrors((prev) => ({ ...prev, lampiran: false }));
        toast.success("File dari clipboard berhasil ditambahkan!");
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length) handleFileInput({ target: { files: dropped } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    const newErrors = {};

    for (const [key, val] of Object.entries(form)) {
      if (key === "description") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = val;
        const plainText = tempDiv.innerText.trim();

        if (!plainText) {
          newErrors[key] = true;
        }
      } else if (
        (typeof val === "string" && !val.trim()) ||
        (key === "lampiran" && !val)
      ) {
        newErrors[key] = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) {
    //   toast.error("lengkapi data di bawah ini", {
    //     description: "Silahkan lengkapi data di bawah ini",
    //   });
    //   return;
    // }
    try {
      const payload = { ...form };
      let mappedData = payload.attachment_ids || [];
      // Upload lampiran jika ada file
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
        mappedData =
          (res?.data?.data && res.data.data.map((i) => i.id)) ||
          (Array.isArray(res?.data) && res.data.map((i) => i.id)) ||
          [];
        payload.attachment_ids = mappedData;
      }
      // Panggil onSubmit dengan payload dan attachment_ids
      if (onSubmit) await onSubmit(payload, mappedData || []);
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim data. Coba lagi.");
    }
  };

  const handleClearFile = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    setForm((prev) => ({ ...prev, lampiran: next }));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
    >
      <h2 className="md:col-span-2 text-lg font-semibold">Buat Tiket</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Nama Lengkap<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="created_name"
          value={user?.data.name}
          onChange={handleChange}
          readOnly
          className={`input ${errors.created_name ? "border-red-500" : ""}`}
          placeholder="Nama Lengkap"
        />
      </div>

      <Dropdown
        dataMenus={dataSelection.applications || []}
        initMenu={"Pilih Aplikasi"}
        label={"Nama Aplikasi"}
        name={"application_id"}
        value={form.application_id}
        handleChange={handleChange}
        errors={errors.application_id}
        isRequired={true}
      />

      <Dropdown
        dataMenus={dataSelection.divisions || []}
        initMenu={"Pilih Divisi"}
        label={"Nama Divisi"}
        name={"division_id"}
        value={form.division_id}
        handleChange={handleChange}
        errors={errors.division_id}
        isRequired={true}
      />

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">
          Subjek Tiket<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={`input ${errors.subject ? "border-red-500" : ""}`}
          placeholder="Contoh: Reset Password Email"
        />
      </div>

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
          placeholder="user@gmail.com"
        />
      </div>

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

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-semibold text-sm">
          Deskripsi Tiket<span className="text-red-500">*</span>
        </label>
        <CKEditorWrapper
          onChange={(e) => {
            handleChangeDeskripsiTiket(e);
          }}
          value={form.description}
          className={`border ${
            errors.description ? "border-red-500" : "border-slate-400"
          }`}
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-semibold text-sm mb-1">
          Lampiran<span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 ml-2">(Maks 25MB)</span>
        </label>
        <div
          ref={dropAreaRef}
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-4 px-2 cursor-pointer bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#65C7D5] ${
            errors.lampiran ? "border-red-500" : "border-gray-200"
          }`}
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <span className="text-gray-500 text-center select-none">
            Paste gambar di sini atau drag & drop file di sini
          </span>
          <input
            type="file"
            name="lampiran"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInput}
            accept="*/*"
          />
        </div>
        {errors.lampiran && (
          <span className="text-xs text-red-500 mt-1">
            Lampiran wajib diisi dan maksimal 25MB
          </span>
        )}
        <div className="text-sm text-gray-600 mt-2">
          {files.length > 0 ? (
            <ul className="list-disc ml-5">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between py-1">
                  <span>
                    {f.name}
                    <span className="text-xs text-gray-400">
                      ({(f.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleClearFile(i)}
                    className="px-2 py-1 rounded text-xs bg-red-100 text-red-600 hover:bg-red-200 ml-3"
                  >
                    Hapus
                  </button>
                </li>
              ))}
              <li className="mt-2 text-xs text-gray-500 font-semibold">
                Total: {(totalFilesSize(files) / 1024 / 1024).toFixed(2)} MB
              </li>
            </ul>
          ) : null}
        </div>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="bg-[#65C7D5] hover:bg-[#4FB3C1] text-white font-semibold px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
