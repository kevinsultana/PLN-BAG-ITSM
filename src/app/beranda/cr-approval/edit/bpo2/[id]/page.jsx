"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CRFormBpoBeranda from "@/components/Beranda/CRApproval/CRFormBpoBeranda";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";
import { toast } from "sonner";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "", // 'reject' atau 'approve'
    loading: false,
  });
  const [feedbackDescription, setFeedbackDescription] = useState("");

  const fetchCRDetail = async () => {
    try {
      setLoading(true);
      const response = await ProxyUrl.get(`/change-requests/${params.id}`);

      if (response.data.data) {
        setData(response.data.data);
        const tiketId = response.data.data.ticket_id;
        if (tiketId) {
          const ticketResponse = await ProxyUrl.get(`/tickets/${tiketId}`);
          if (ticketResponse.data.data) {
            setDataTicket(ticketResponse.data.data);
          } else {
            setDataTicket(ticketResponse.data);
          }
        }
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching CR detail:", err);
      setError("Gagal memuat data CR. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCRDetail();
    }
  }, [params.id]);

  const handleRejectFormCR = () => {
    setConfirmDialog({
      open: true,
      type: "reject",
      loading: false,
    });
  };

  const handleApproveFormCR = () => {
    // List of required fields
    const requiredFields = ["cab_date", "cab_recomendation"];

    const emptyFields = requiredFields.filter(
      (key) => !form[key] || form[key].toString().trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setConfirmDialog({
      open: true,
      type: "approve",
      loading: false,
    });
  };

  const executeRejectCR = async () => {
    // Validasi alasan menolak
    if (!feedbackDescription.trim()) {
      toast.error("Alasan menolak harus diisi.");
      return;
    }

    setConfirmDialog((prev) => ({ ...prev, loading: true }));
    const toastId = toast.loading("Memproses penolakan CR...");
    try {
      const res = await ProxyUrl.put(
        `/change-requests/${params.id}/approve/bpo`,
        {
          decision: "REJECTED",
          feedback_description: feedbackDescription.trim(),
        }
      );
      toast.success("CR berhasil ditolak");
      router.replace("/beranda/cr-approval");
    } catch (error) {
      console.log(error);
      toast.error("CR gagal ditolak, cek koneksi anda");
    } finally {
      toast.dismiss(toastId);
      setConfirmDialog({ open: false, type: "", loading: false });
      setFeedbackDescription(""); // Reset feedback description
    }
  };

  const executeApproveCR = async () => {
    setConfirmDialog((prev) => ({ ...prev, loading: true }));
    const toastId = toast.loading("Memproses penyetujuan CR...");

    try {
      const res = await ProxyUrl.put(`/change-requests/${params.id}`, {
        ...form,
      });
      if (res.data.success === true) {
        const resp = await ProxyUrl.put(
          `/change-requests/${params.id}/approve/bpo`,
          {
            decision: "APPROVED",
          }
        );
      }
      toast.success("CR berhasil disetujui");
      router.replace("/beranda/cr-approval");
    } catch (error) {
      console.log(error);
      toast.error("CR gagal disetujui, cek koneksi anda");
    } finally {
      toast.dismiss(toastId);
      setConfirmDialog({ open: false, type: "", loading: false });
    }
  };

  const handleCloseConfirmDialog = () => {
    if (!confirmDialog.loading) {
      setConfirmDialog({ open: false, type: "", loading: false });
      setFeedbackDescription(""); // Reset feedback description
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <CircularProgress size={60} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            {error || "Data tidak ditemukan"}
          </h2>
          <Button
            variant="contained"
            onClick={() => router.back()}
            startIcon={<FaArrowLeft />}
            className="bg-[#65C7D5] hover:bg-[#5ab8c7]"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-4">CR Approval EDIT BPO2</h1>
            {data &&
              data.is_bpo2_approve !== "APPROVED" &&
              data.is_bpo2_approve !== "REJECTED" && (
                <div className="flex gap-4">
                  <div className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl flex items-center">
                    <button variant="contained" onClick={handleRejectFormCR}>
                      Reject
                    </button>
                    <IoCloseCircleOutline className="inline ml-2 text-lg" />
                  </div>
                  <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl flex items-center">
                    <button variant="contained" onClick={handleApproveFormCR}>
                      Approve
                    </button>
                    <LuArrowRight className="inline ml-2 text-lg" />
                  </div>
                </div>
              )}
          </div>
          <CRFormBpoBeranda
            data={data}
            onCancel={() => {}}
            dataTicket={dataTicket}
            onFormChange={(form) => setForm(form)}
          />
        </div>
      </MainLayout>

      {/* Modal Konfirmasi */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="confirm-dialog-title"
          sx={{
            backgroundColor:
              confirmDialog.type === "reject" ? "#fee2e2" : "#dbeafe",
            color: confirmDialog.type === "reject" ? "#991b1b" : "#1e40af",
            fontWeight: "bold",
          }}
        >
          {confirmDialog.type === "reject"
            ? "⚠️ Konfirmasi Penolakan CR"
            : "✅ Konfirmasi Persetujuan CR"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText id="confirm-dialog-description">
            {confirmDialog.type === "reject"
              ? "Apakah Anda yakin ingin menolak Change Request ini? Tindakan ini tidak dapat dibatalkan."
              : "Apakah Anda yakin ingin menyetujui Change Request ini? Pastikan semua data sudah benar dan lengkap."}
          </DialogContentText>

          {/* Field Alasan Menolak */}
          {confirmDialog.type === "reject" && (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Alasan Menolak"
              placeholder="Jelaskan alasan mengapa CR ini ditolak..."
              value={feedbackDescription}
              onChange={(e) => setFeedbackDescription(e.target.value)}
              disabled={confirmDialog.loading}
              required
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#dc2626",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#dc2626",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#dc2626",
                },
              }}
              helperText="Alasan ini akan dikirim sebagai feedback kepada pemohon CR"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseConfirmDialog}
            variant="outlined"
            disabled={confirmDialog.loading}
            sx={{
              borderColor: "#6b7280",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#4b5563",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Batal
          </Button>
          <Button
            onClick={
              confirmDialog.type === "reject"
                ? executeRejectCR
                : executeApproveCR
            }
            variant="contained"
            disabled={confirmDialog.loading}
            startIcon={
              confirmDialog.loading ? <CircularProgress size={16} /> : null
            }
            sx={{
              backgroundColor:
                confirmDialog.type === "reject" ? "#dc2626" : "#2563eb",
              "&:hover": {
                backgroundColor:
                  confirmDialog.type === "reject" ? "#b91c1c" : "#1d4ed8",
              },
            }}
          >
            {confirmDialog.loading
              ? confirmDialog.type === "reject"
                ? "Menolak..."
                : "Menyetujui..."
              : confirmDialog.type === "reject"
              ? "Ya, Tolak"
              : "Ya, Setujui"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
