"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaDownload, FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlineAttachment } from "react-icons/md";

const statusColors = {
  DRAFT: { bg: "bg-gray-100", text: "text-gray-700", color: "default" },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", color: "warning" },
  APPROVED: { bg: "bg-green-100", text: "text-green-700", color: "success" },
  REJECTED: { bg: "bg-red-100", text: "text-red-700", color: "error" },
};

const StatusPill = ({ status }) => {
  const statusConfig = statusColors[status] || statusColors.DRAFT;

  return (
    <Chip
      label={status || "DRAFT"}
      size="small"
      color={statusConfig.color}
      className={`${statusConfig.bg} ${statusConfig.text} font-medium`}
    />
  );
};

const ApprovalStatus = ({ isBpo1Approve, isBpo2Approve }) => {
  const getBpoStatusConfig = (status) => {
    switch (status) {
      case "APPROVED":
        return {
          icon: <FaCheck size={14} />,
          className: "bg-green-100 border-green-500 text-green-700",
        };
      case "REJECTED":
        return {
          icon: <FaTimes size={14} />,
          className: "bg-red-100 border-red-500 text-red-700",
        };
      default:
        return {
          icon: "○",
          className: "bg-gray-100 border-gray-300 text-gray-500",
        };
    }
  };

  const bpo1Config = getBpoStatusConfig(isBpo1Approve);
  const bpo2Config = getBpoStatusConfig(isBpo2Approve);

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${bpo1Config.className}`}
        >
          {bpo1Config.icon}
        </span>
        <span className="text-sm font-medium">BPO 1</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${bpo2Config.className}`}
        >
          {bpo2Config.icon}
        </span>
        <span className="text-sm font-medium">BPO 2</span>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "-";
  }
};

export default function CrFormDetails({ data = {} }) {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4 font-bold">
            Status Approval
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Typography variant="body2" className="text-gray-600 mb-1">
                Status CR
              </Typography>
              <StatusPill status={data.status_cr} />
            </div>
            <div>
              <Typography variant="body2" className="text-gray-600 mb-1">
                BPO Approval Status
              </Typography>
              <ApprovalStatus
                isBpo1Approve={data.is_bpo1_approve}
                isBpo2Approve={data.is_bpo2_approve}
              />
            </div>
            <div>
              <Typography variant="body2" className="text-gray-600 mb-1">
                Tanggal Dibuat
              </Typography>
              <Typography variant="body1">
                {formatDate(data.created_at)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form Card */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-white rounded-lg">
            <header className="flex justify-between items-start mb-4">
              <div className="text-center flex-1">
                <h1 className="text-lg font-bold text-gray-800">
                  CHANGE REQUEST DIGITALISASI PROCESS
                </h1>
                <h2 className="text-xl font-bold">CHANGE REQUEST FORM</h2>
              </div>
              <Image
                src="/logoNavbar.png"
                alt="Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </header>

            <p className="text-center text-sm text-gray-600 mb-6">
              Formulir ini diisi oleh PIC Agent Helpdesk dan perlu disetujui
              oleh IT & BPO Terkait
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Lampiran */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Lampiran</label>
                    <div className="p-3 border rounded-lg bg-gray-50 min-h-20">
                      {Array.isArray(data.attachments) &&
                      data.attachments.length > 0 ? (
                        data.attachments.map((att, index) => (
                          <div
                            key={att.id || index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <MdOutlineAttachment className="text-gray-500" />
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline flex items-center gap-2"
                            >
                              <span>{att.name}</span>
                              <FaDownload size={12} />
                            </a>
                            <span className="text-xs text-gray-500">
                              {Math.round(att.size / 1024)} KB
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400">
                          Belum ada lampiran
                        </span>
                      )}
                    </div>
                  </div>

                  <ReadOnlyField
                    label="Nama Divisi"
                    value={data.division_name || "-"}
                  />

                  <ReadOnlyField
                    label="Jenis Aplikasi"
                    value={data.application_type || "-"}
                  />

                  <ReadOnlyField
                    label="Aplikasi / Database"
                    value={data.application_database || "-"}
                  />

                  <ReadOnlyField
                    label="Jenis Data"
                    value={data.data_type || "-"}
                  />

                  <ReadOnlyField
                    label="Nama Database"
                    value={data.database_name || "-"}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <ReadOnlyField
                    label="Nama Hardware"
                    value={data.hardware_name || "-"}
                  />

                  <ReadOnlyField
                    label="Nama Software"
                    value={data.software_name || "-"}
                  />

                  <ReadOnlyField
                    label="Versi Software"
                    value={data.software_version || "-"}
                  />

                  <ReadOnlyTextArea
                    label="Ruang Lingkup Implementasi CR"
                    value={data.implementation_scope || "-"}
                  />

                  <ReadOnlyTextArea
                    label="Dampak Implementasi"
                    value={data.change_description || "-"}
                  />

                  <ReadOnlyTextArea
                    label="Catatan / Keterangan"
                    value={data.additional_notes || "-"}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sub-komponen untuk field read-only
function ReadOnlyField({ label, value, required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="p-3 border rounded-lg bg-gray-50 text-gray-700">
        {value || "-"}
      </div>
    </div>
  );
}

// Sub-komponen untuk textarea read-only
function ReadOnlyTextArea({ label, value, required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="p-3 border rounded-lg bg-gray-50 text-gray-700 min-h-20 whitespace-pre-wrap">
        {value || "-"}
      </div>
    </div>
  );
}
