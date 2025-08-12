import CKEditorWrapper from "@/components/CKEditorWrapper";
import React from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { HiPlay } from "react-icons/hi";
import { LuArrowRight } from "react-icons/lu";

export default function TiketDetails({ data }) {
  const status = ["Open", "In Progress", "On Hold", "Resolved", "Closed"];
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
  return (
    <div className="bg-white rounded-xl p-4">
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
            <>
              <span
                key={index}
                className={`${
                  data.status === item ? "bg-green-400" : "bg-gray-400"
                } px-3 py-1 rounded-lg text-sm text-white font-semibold`}
              >
                {item}
              </span>
              {index !== status.length - 1 && (
                <span className="px-2">{">"}</span>
              )}
            </>
          ))}
        </div>
      </div>

      {/* subject */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2">
        <h3>Subject</h3>
        <h2 className="font-semibold text-lg">Reset Password</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="">Response</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              15 Minutes to Start
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="">Response</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              2 Hours to Finish
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="">Response</h3>
            <p className="font-semibold text-base bg-gray-200 px-2 py-1 rounded-full">
              In 1 Hour
            </p>
          </div>
        </div>
      </div>

      {/* forms */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2 my-6">
        <form className="grid grid-cols-2 gap-4">
          {/* team */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Team <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-500 rounded-lg p-2 w-full">
              <option value="team1">Functional</option>
              <option value="team2">Technical</option>
            </select>
          </div>
          {/* nama aplikasi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Nama Aplikasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.nama_aplikasi}
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
              value={data.nama_assigned_to}
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
              value={data.nama_requester}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Priority */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Priority <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-500 rounded-lg p-2 w-full">
              <option value="tinggi">Tinggi</option>
              <option value="sedang">Sedang</option>
              <option value="rendah">Rendah</option>
            </select>
          </div>
          {/* Nama Divisi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Nama Divisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.nama_divisi}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Tipe */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Tipe <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-500 rounded-lg p-2 w-full">
              <option value="tipe1">tipe 1</option>
              <option value="tipe2">tipe 2</option>
              <option value="tipe3">tipe 3</option>
            </select>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.email}
              className="input p-2"
              readOnly
            />
          </div>
          {/* SLA Policy */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              SLA Policy <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-500 rounded-lg p-2 w-full">
              <option value="tipe1">tipe 1</option>
              <option value="tipe2">tipe 2</option>
              <option value="tipe3">tipe 3</option>
            </select>
          </div>
          {/* No. Whatsapp */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              No. Whatsapp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.no_wa}
              className="input p-2"
              readOnly
            />
          </div>
          {/* Lampiran */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Lampiran <span className="text-red-500">*</span>
            </label>
            <div className="input flex justify-between items-center">
              <p>{data.lampiran[0]}</p>
              <CgArrowsExpandRight className="cursor-pointer" />
            </div>
          </div>
          {/* Deskripsi */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <CKEditorWrapper />
          </div>
        </form>
      </div>

      {/* feedback */}
      {data.status === "Resolved" && (
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
          {data.feedback.map((item, index) => (
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
