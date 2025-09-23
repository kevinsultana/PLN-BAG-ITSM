"use client";
import { useState, useEffect } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import renderDescription from "@/utils/RenderDesc";

export default function DetailTicketForm({
  data,
  feedback,
  onClickSubmitFeedback,
}) {
  // Data mapping dari API
  const [form, setForm] = useState({
    namaLengkap: data?.requester?.name || "",
    namaDivisi: data?.division?.name || "",
    email: data?.email || "",
    whatsapp: data?.whatsapp || "",
    namaAplikasi: data?.application?.name || "",
    subjekTiket: data?.subject || "",
    deskripsiTiket: data?.description || "",
    lampiran: data?.attachments || [],
  });

  // Sync form state with API data when data changes
  useEffect(() => {
    setForm({
      namaLengkap: data?.requester?.name || "",
      namaDivisi: data?.division?.name || "",
      email: data?.email || "",
      whatsapp: data?.whatsapp || "",
      namaAplikasi: data?.application?.name || "",
      subjekTiket: data?.subject || "",
      deskripsiTiket: data?.description || "",
      lampiran: data?.attachments || [],
    });
  }, [data]);

  const [feedbackTiket, setFeedbackTiket] = useState("");
  function timeAgo(dateInput) {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now - date;
    if (isNaN(diffMs)) return "-";
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay > 0) return `${diffDay} hari yang lalu`;
    if (diffHour > 0) return `${diffHour} jam yang lalu`;
    if (diffMin > 0) return `${diffMin} menit yang lalu`;
    return "Baru saja";
  }

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    for (const [key, val] of Object.entries(form)) {
      if (
        (typeof val === "string" && !val.trim()) ||
        (key === "lampiran" && !val)
      ) {
        newErrors[key] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    alert("Tiket berhasil dikirim!");
  };

  // Event delegation untuk klik gambar di feedback
  useEffect(() => {
    const feedbackContainer = document.getElementById(
      "feedback-list-container"
    );
    if (feedbackContainer) {
      const handleImgClick = (e) => {
        if (e.target.tagName === "IMG") {
          e.preventDefault();
          window.open(e.target.src, "_blank");
        }
      };
      feedbackContainer.addEventListener("click", handleImgClick);
      return () => {
        feedbackContainer.removeEventListener("click", handleImgClick);
      };
    }
  }, [feedback]);

  return (
    <div className="flex flex-col gap-6 bg-white">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
      >
        <h2 className="md:col-span-2 text-lg font-semibold">Detail Tiket</h2>

        {/* nama lengkap */}
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
            readOnly
          />
        </div>

        {/* nama aplikasi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Aplikasi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaAplikasi"
            value={form.namaAplikasi}
            className={`input ${errors.namaAplikasi ? "border-red-500" : ""}`}
            readOnly
          />
        </div>

        {/* nama divisi */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Nama Divisi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaDivisi"
            value={form.namaDivisi}
            className={`input ${errors.namaDivisi ? "border-red-500" : ""}`}
            readOnly
          />
        </div>

        {/* subjek tiket */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Subjek Tiket<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subjekTiket"
            value={form.subjekTiket}
            onChange={handleChange}
            className={`input ${errors.subjekTiket ? "border-red-500" : ""}`}
            placeholder="Contoh: Reset Password Email"
            readOnly
          />
        </div>

        {/* email */}
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
            readOnly
          />
        </div>

        {/* deskripsi */}
        <div className="flex flex-col gap-2 row-span-2">
          <label className="font-semibold text-sm">
            Deskripsi Tiket<span className="text-red-500">*</span>
          </label>
          <div
            className="input h-full"
            dangerouslySetInnerHTML={{ __html: form.deskripsiTiket }}
          ></div>
        </div>

        {/* no whatsapp */}
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
            readOnly
          />
        </div>

        {/* lampiran */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">
            Lampiran <span className="text-red-500">*</span>
          </label>
          <div className="input flex flex-col gap-2">
            {/* Array of attachments */}
            {Array.isArray(data?.attachments) && data.attachments.length > 0 ? (
              data.attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-2">
                  {att.mime_type.startsWith("image/") ? (
                    <img
                      src={att.url}
                      alt={att.name}
                      style={{ maxWidth: 50, maxHeight: 50 }}
                    />
                  ) : null}
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {att.name}
                  </a>
                  <span className="text-xs text-gray-500">
                    {Math.round(att.size / 1024)} KB
                  </span>
                </div>
              ))
            ) : Array.isArray(data?.lampiran) && data.lampiran.length > 0 ? (
              data.lampiran.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span>{name}</span>
                </div>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </form>

      {/* garis*/}
      <div className="wfull h-[1px] bg-gray-200 " />

      {/* feedback */}
      {data?.status !== "CLOSED" && (
        <>
          <div className="flex flex-col gap-2 space-y-2 py-4 px-4">
            <label className="text-lg font-semibold">
              Feedback Tiket <span className="text-red-500">*</span>
            </label>
            <CKEditorWrapper
              value={feedbackTiket}
              onChange={setFeedbackTiket}
            />
            <button
              onClick={() => {
                onClickSubmitFeedback(feedbackTiket);
                setFeedbackTiket("");
              }}
              className="bg-sky-500 cursor-pointer p-2 text-white w-1/10 rounded-full"
            >
              Submit
            </button>
          </div>
          <div className="wfull h-[3px] bg-gray-200" />
        </>
      )}
      <div
        id="feedback-list-container"
        className="p-5 pt-0 flex flex-col gap-4"
      >
        <style>{`
          #feedback-list-container img {
            width: 150px !important;
            height: 100px !important;
            object-fit: contain !important;
            cursor: pointer !important;
            display: inline-block !important;
            background-color: #f0f0f0 !important;
          }
        `}</style>
        {Array.isArray(feedback) &&
          feedback
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 space-y-2 py-4 border-b-gray-400 border-b"
              >
                {item?.user?.role !== "User" ? (
                  <>
                    <h1 className="font-bold text-lg text-yellow-500">
                      {item?.user?.name} ({item?.user?.role}){" "}
                      <span className="text-gray-500 font-medium text-base">
                        {timeAgo(item.created_at)}
                      </span>
                    </h1>
                    <div>{renderDescription(item?.description)}</div>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-lg">
                      {item?.user?.name} ({item?.user?.role}) -{" "}
                      <span className="text-gray-500 font-medium text-base">
                        {timeAgo(item.created_at)}
                      </span>
                    </h1>
                    <div>{renderDescription(item?.description)}</div>
                  </>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
