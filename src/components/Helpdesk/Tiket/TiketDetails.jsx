import { ProxyUrl } from "@/api/BaseUrl";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import Dropdown from "@/components/Dropdown";
import PriorityDropdown from "@/components/PriorityDropdown";
import renderDescription from "@/utils/RenderDesc";
import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaCircleStop } from "react-icons/fa6";
import { HiPlay } from "react-icons/hi";
import { LuArrowRight } from "react-icons/lu";
import { MdOutlinePauseCircleFilled } from "react-icons/md";

function mapUpdatedTiketToPayload(updatedTiket) {
  return {
    application_id: updatedTiket?.application?.id || "",
    assigned_to: updatedTiket?.assign_to?.id || "",
    attachment_ids: Array.isArray(updatedTiket?.attachments)
      ? updatedTiket.attachments.map((att) => att.id)
      : [],
    bpo_id: updatedTiket?.bpo_id || "",
    contract_number: updatedTiket?.contract_number || "",
    contract_value: updatedTiket?.contract_value || 0,
    description: updatedTiket?.description || "",
    division_id: updatedTiket?.division?.id || "",
    email: updatedTiket?.email || updatedTiket?.requester?.email || "",
    fullname: updatedTiket?.fullname || updatedTiket?.requester?.name || "",
    priority_id: updatedTiket?.priority?.id || "",
    sla_policy_id: updatedTiket?.sla_policy?.id || "",
    status: updatedTiket?.status || "",
    subject: updatedTiket?.subject || "",
    team_group_id: updatedTiket?.team_group?.id || "",
    ticket_type_id: updatedTiket?.ticket_type?.id || "",
    // user_id: updatedTiket?.user?.id || "",
    whatsapp: updatedTiket?.whatsapp || "",
  };
}

export default function TiketDetails({
  data,
  onClickStart,
  onClickPause,
  onClickEnd,
  feedback,
  onClickSubmitFeedback,
  selections,
  onClickUpdateTiket,
  onClickCRForm,
}) {
  const status = ["OPEN", "IN PROGRESS", "ON HOLD", "RESOLVED", "CLOSED"];

  const [feedbackTiket, setFeedbackTiket] = useState("");
  const [updatedTiket, setUpdatedTiket] = useState(data || {});

  useEffect(() => {
    setUpdatedTiket(data || {});
  }, [data]);

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

  const [assignedTo, setAssignedTo] = useState([]);

  const getDataAssignedTo = async (id) => {
    try {
      const response = await ProxyUrl.get("/tickets/assign-to", {
        params: { team_group_id: id },
      });
      const data = response.data.data.teams || [];
      setAssignedTo(data);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  };

  useEffect(() => {
    const teamId = updatedTiket?.team_group?.id || "";
    if (teamId) {
      getDataAssignedTo(teamId);
      setUpdatedTiket((prev) => ({ ...prev, assign_to: "" }));
    }
  }, [updatedTiket?.team_group?.id]);

  const isTicketTypeCR =
    data?.ticket_type?.id ===
    selections?.ticket_types?.find((type) => type.name === "Change Request")
      ?.id;

  return (
    <div key={data?.id} className="bg-white rounded-xl p-4">
      <h1 className="text-black text-base font-bold">Detail Tiket</h1>

      <div className="flex items-center justify-between">
        <div className="py-4 flex items-center gap-2">
          {isTicketTypeCR && (
            <button
              onClick={onClickCRForm}
              className="px-3 py-1 flex items-center gap-2 bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 transition-all duration-300"
            >
              <p className="text-sm text-white font-semibold">Apply To CRF</p>
              <LuArrowRight className="text-2xl text-white" />
            </button>
          )}
          {data?.status === "OPEN" && !isTicketTypeCR && (
            <button
              onClick={onClickStart}
              className="px-3 py-1 flex items-center gap-2 bg-green-400 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-300"
            >
              <HiPlay className="text-2xl text-white" />
              <p className="text-sm text-white font-semibold">Start</p>
            </button>
          )}
          {data?.status === "IN PROGRESS" && (
            <>
              <button
                onClick={onClickEnd}
                className="px-3 py-1 flex items-center gap-2 border border-red-500 rounded-lg cursor-pointer hover:bg-red-500/10 transition-all duration-300"
              >
                <FaCircleStop className="text-2xl text-red-500" />
                <p className="text-sm text-red-500 font-semibold">End</p>
              </button>
              <button
                onClick={onClickPause}
                className="px-3 py-1 flex items-center gap-2 border border-yellow-500 rounded-lg cursor-pointer hover:bg-yellow-500/10 transition-all duration-300"
              >
                <MdOutlinePauseCircleFilled className="text-2xl text-yellow-500" />
                <p className="text-sm text-yellow-500 font-semibold">Pause</p>
              </button>
            </>
          )}
          {data?.status === "ON HOLD" && (
            <button
              onClick={onClickStart}
              className="px-3 py-1 flex items-center gap-2 bg-green-400 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-300"
            >
              <HiPlay className="text-2xl text-white" />
              <p className="text-sm text-white font-semibold">Start</p>
            </button>
          )}
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
      <div className="border border-gray-200 rounded-xl p-4 space-y-2 my-4">
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
                  if (diffHour > 0)
                    return `Sisa ${diffHour} jam ${
                      minRemainder > 0 ? minRemainder + " menit" : ""
                    }`;
                  if (diffMin > 0) return `Sisa ${diffMin} menit`;
                  return "Segera berakhir";
                } else {
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

      {/* forms: left editable, right read-only */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2 my-6">
        <form className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Dropdown
              label="Team"
              value={updatedTiket?.team_group?.id || ""}
              dataMenus={selections?.team_groups || []}
              disabled={data?.status !== "OPEN"}
              handleChange={(e) =>
                setUpdatedTiket((prev) => ({
                  ...prev,
                  team_group: { id: e.target.value },
                }))
              }
              isRequired={true}
              initMenu="- Pilih Team -"
            />

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">
                Assigned to<span className="text-red-500">*</span>
              </label>
              <FormControl fullWidth size="small">
                <Select
                  name="assigned_to"
                  value={updatedTiket?.assign_to?.id || ""}
                  onChange={(e) =>
                    setUpdatedTiket((prev) => ({
                      ...prev,
                      assign_to: { id: e.target.value },
                    }))
                  }
                  displayEmpty
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Pilih User</em>
                  </MenuItem>
                  {assignedTo.map((user) => (
                    <MenuItem key={user.id} value={String(user.id ?? "")}>
                      {user.fullname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <PriorityDropdown
              label="Priority"
              value={updatedTiket?.priority?.id || ""}
              dataPriorities={selections?.priorities || []}
              disabled={data?.status !== "OPEN"}
              onChange={(e) =>
                setUpdatedTiket((prev) => ({
                  ...prev,
                  priority: { id: e.target.value },
                }))
              }
              required={true}
              initMenu="- Pilih Priority -"
            />

            <Dropdown
              label="Tipe"
              value={updatedTiket?.ticket_type?.id || ""}
              dataMenus={selections?.ticket_types || []}
              disabled={data?.status !== "OPEN"}
              handleChange={(e) =>
                setUpdatedTiket((prev) => ({
                  ...prev,
                  ticket_type: { id: e.target.value },
                }))
              }
              isRequired={true}
              initMenu="- Pilih Tipe -"
            />

            <Dropdown
              label="SLA Policy"
              value={updatedTiket?.sla_policy?.id || ""}
              dataMenus={selections?.sla_policies || []}
              disabled={data?.status !== "OPEN"}
              handleChange={(e) =>
                setUpdatedTiket((prev) => ({
                  ...prev,
                  sla_policy: { id: e.target.value },
                }))
              }
              isRequired={true}
              initMenu="- Pilih SLA -"
            />

            {selections?.ticket_types?.find(
              (type) => type.id === updatedTiket?.ticket_type?.id
            )?.name === "Change Request" && (
              <>
                <Dropdown
                  label="BPO"
                  value={updatedTiket?.bpo_id || updatedTiket?.bpo?.id || ""}
                  dataMenus={selections?.bpos || []}
                  disabled={data?.status !== "OPEN"}
                  handleChange={(e) =>
                    setUpdatedTiket((prev) => ({
                      ...prev,
                      bpo_id: e.target.value,
                    }))
                  }
                  isRequired={true}
                  initMenu="- Pilih BPO -"
                />

                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold">No. Kontrak</label>
                  <input
                    type="text"
                    value={updatedTiket?.contract_number || ""}
                    placeholder="Masukkan No. Kontrak"
                    className="input p-2"
                    onChange={(e) =>
                      setUpdatedTiket((prev) => ({
                        ...prev,
                        contract_number: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold">Nilai Kontrak</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={
                      updatedTiket?.contract_value === 0
                        ? ""
                        : updatedTiket?.contract_value
                    }
                    className="input p-2"
                    onChange={(e) =>
                      setUpdatedTiket((prev) => ({
                        ...prev,
                        contract_value: Number(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
              </>
            )}

            {data?.status === "OPEN" && (
              <div>
                <button
                  type="button"
                  className="bg-sky-500 cursor-pointer p-2 text-white w-full rounded-full mt-6"
                  onClick={() => {
                    const payload = mapUpdatedTiketToPayload(updatedTiket);
                    onClickUpdateTiket(payload);
                  }}
                >
                  Update Tiket
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Nama Aplikasi</label>
              <input
                type="text"
                value={data?.application?.name || data?.nama_aplikasi || ""}
                className="input p-2"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Requester</label>
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

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Nama Divisi</label>
              <input
                type="text"
                value={data?.division?.name || data?.nama_divisi || ""}
                className="input p-2"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Email</label>
              <input
                type="text"
                value={data?.requester?.email || data?.email || ""}
                className="input p-2"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">No. Whatsapp</label>
              <input
                type="text"
                value={data?.whatsapp || data?.no_wa || ""}
                className="input p-2"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Lampiran</label>
              <div className="input flex flex-col gap-2">
                {Array.isArray(data?.attachments) &&
                data.attachments.length > 0 ? (
                  data.attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2">
                      {att.mime_type?.startsWith("image/") ? (
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
                ) : Array.isArray(data?.lampiran) &&
                  data.lampiran.length > 0 ? (
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
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <label className="font-semibold text-sm">
              Deskripsi Tiket<span className="text-red-500">*</span>
            </label>
            <div
              className="input min-h-30"
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />
          </div>
        </form>
      </div>

      <div className="wfull h-[1px] bg-gray-200 " />

      <div className="flex flex-col gap-2 space-y-2 py-4">
        <label className="text-lg font-semibold">
          Feedback Tiket <span className="text-red-500">*</span>
        </label>
        <CKEditorWrapper value={feedbackTiket} onChange={setFeedbackTiket} />
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

      <div className="wfull h-[3px] bg-gray-200 mb-4" />

      <div className="pt-0 flex flex-col gap-4">
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
                        {timeAgo(item?.created_at)}
                      </span>
                    </h1>
                    <div>{renderDescription(item?.description)}</div>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-lg">
                      {item?.user?.name} ({item?.user?.role}) -{" "}
                      <span className="text-gray-500 font-medium text-base">
                        {timeAgo(item?.created_at)}
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
