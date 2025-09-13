import CKEditorWrapper from "@/components/CKEditorWrapper";
import React from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { HiPlay } from "react-icons/hi";
import { LuArrowRight } from "react-icons/lu";

export default function TiketDetails({ data }) {
  const status = ["OPEN", "ON PROGRESS", "ON HOLD", "RESOLVED", "CLOSED"];
  function formatDateTimeDMY(dateInput) {
    const date = new Date(dateInput);
    const time = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(date);

    const dateStr = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);
    return `${time} ${dateStr}`;
  }
  // console.log(data);
  return (
    <div key={data?.id} className="bg-white rounded-xl p-4">
      {/* top section */}
      <h1 className="text-black text-base font-bold">Detail Tiket</h1>
      <div className="flex items-center justify-between">
        <div className="py-4 flex items-center gap-2">
          <button className="px-3 py-1 flex items-center gap-2 bg-gray-400 rounded-lg">
            <HiPlay className="text-2xl text-white" />
            <p className="text-sm text-white font-semibold">Start</p>
          </button>
          <button className="px-3 py-1 flex items-center gap-2 bg-gray-400 rounded-lg">
            <p className="text-sm text-white font-semibold">Send</p>
            <LuArrowRight className="text-2xl text-white" />
          </button>
        </div>
        <div>
          {status.map((item, index) => (
            <React.Fragment key={item}>
              <span
                className={`${
                  data?.status === item ? "bg-green-400" : "bg-gray-400"
                } px-3 py-1 rounded-lg text-sm text-white font-semibold`}
              >
                {item}
              </span>
              {index !== status.length - 1 && (
                <span className="px-2">{">"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* subject */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2">
        <h3>Subject</h3>
        <h2 className="font-semibold text-lg">{data?.subject}</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="">Response</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              {data?.sla_policy?.response_time || 0} Menit Untuk Respon
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="">Resolve</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              {data?.sla_policy?.resolve_time || 0} Jam Untuk Selesai
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="">Reminder</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              {(() => {
                if (!data?.created_at || !data?.sla_policy?.resolve_time)
                  return "-";
                const created = new Date(data.created_at);
                if (isNaN(created.getTime())) return "-";
                // resolve_time in hours
                const resolveMs =
                  Number(data.sla_policy.resolve_time) * 60 * 60 * 1000;
                const deadline = new Date(created.getTime() + resolveMs);
                const now = new Date();
                const diffMs = deadline - now;
                const absMs = Math.abs(diffMs);
                const diffMin = Math.floor(absMs / 1000 / 60);
                const diffHour = Math.floor(diffMin / 60);
                const minRemainder = diffMin % 60;
                if (diffMs > 0) {
                  // Time remaining
                  if (diffHour > 0)
                    return `Sisa ${diffHour} jam ${
                      minRemainder > 0 ? minRemainder + " menit" : ""
                    }`;
                  if (diffMin > 0) return `Sisa ${diffMin} menit`;
                  return "Segera berakhir";
                } else {
                  // Overdue
                  if (diffHour > 0)
                    return `Terlambat ${diffHour} jam ${
                      minRemainder > 0 ? minRemainder + " menit" : ""
                    }`;
                  if (diffMin > 0) return `Terlambat ${diffMin} menit`;
                  return "Sudah lewat";
                }
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* forms */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2 my-6">
        <form className="grid grid-cols-2 gap-4">
          {/* Team */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Team <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-500 rounded-lg p-2 w-full"
              value={data?.team?.name || data?.assign_to?.name || ""}
              onChange={() => {}}
            >
              <option value="">
                {data?.team?.name || data?.assign_to?.name || "- Pilih Team -"}
              </option>
            </select>
          </div>
          {/* Nama Aplikasi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Nama Aplikasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data?.application?.name || data?.nama_aplikasi || ""}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Assigned To */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Assigned To <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={
                data?.assigned_to?.name ||
                data?.assign_to?.name ||
                data?.nama_assigned_to ||
                ""
              }
              className="input p-2"
              readOnly
            />
          </div>
          {/* Requester */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Requester <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={
                data?.requester?.name ||
                data?.fullname ||
                data?.nama_requester ||
                ""
              }
              className="input p-2"
              readOnly
            />
          </div>
          {/* Priority */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-500 rounded-lg p-2 w-full"
              value={data?.priority?.level || data?.priority || ""}
              onChange={() => {}}
            >
              <option value="">
                {data?.priority?.level ||
                  data?.priority ||
                  "- Pilih Priority -"}
              </option>
            </select>
          </div>
          {/* Nama Divisi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Nama Divisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data?.division?.name || data?.nama_divisi || ""}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Tipe */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Tipe <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-500 rounded-lg p-2 w-full"
              value={data?.ticket_type?.name || data?.tipe || ""}
              onChange={() => {}}
            >
              <option value="">
                {data?.ticket_type?.name || data?.tipe || "- Pilih Tipe -"}
              </option>
            </select>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data?.requester?.email || data?.email || ""}
              className="input p-2"
              readOnly
            />
          </div>
          {/* SLA Policy */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              SLA Policy <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-500 rounded-lg p-2 w-full"
              value={data?.sla_policy?.name || data?.sla_policy || ""}
              onChange={() => {}}
            >
              <option value="">
                {data?.sla_policy?.name || data?.sla_policy || "- Pilih SLA -"}
              </option>
            </select>
          </div>
          {/* No. Whatsapp */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              No. Whatsapp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data?.whatsapp || data?.no_wa || ""}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Lampiran */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Lampiran <span className="text-red-500">*</span>
            </label>
            <div className="input flex flex-col gap-2">
              {/* Array of attachments */}
              {Array.isArray(data?.attachments) &&
              data.attachments.length > 0 ? (
                data.attachments.map((att) => (
                  <div key={att.id} className="flex items-center gap-2">
                    {att.mime_type.startsWith("image/") ? (
                      <img
                        src={att.url}
                        alt={att.name}
                        style={{ maxWidth: 100, maxHeight: 100 }}
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
          {/* Deskripsi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <CKEditorWrapper value={data?.description || ""} />
          </div>
        </form>
      </div>

      {/* feedback */}
      {data?.status === "Resolved" && (
        <>
          <div className="wfull h-[1px] bg-gray-200 " />
          <div className="flex flex-col gap-2 space-y-2 py-4">
            <label className="text-lg font-semibold">
              Feedback Tiket <span className="text-red-500">*</span>
            </label>
            <CKEditorWrapper />
            <button className="bg-sky-500 cursor-pointer p-2 text-white w-1/10 rounded-full">
              Submit
            </button>
          </div>
          <div className="wfull h-[3px] bg-gray-200 mb-4" />
          {data?.feedback?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 space-y-2 py-4">
              <h1 className="font-bold text-lg">
                {item.oleh}{" "}
                <span className="text-gray-500 font-medium text-base">
                  {formatDateTimeDMY(item.waktu)}
                </span>
              </h1>
              <p>{item.isi}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
