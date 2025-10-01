"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import CRFormItBeranda from "@/components/Beranda/CRApproval/CRFormItBeranda";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({});

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

  const handleRejectFormCR = async () => {
    const toastId = toast.loading("Memproses penolakan CR...");
    try {
      const res = await ProxyUrl.put(
        `/change-requests/${params.id}/approve/bpo`,
        {
          decision: "REJECTED",
        }
      );
      toast.success("CR berhasil ditolak");
      router.replace("/beranda/cr-approval");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleApproveFormCR = async () => {
    // List of required fields
    const requiredFields = [
      "risk_level",
      "new_technology",
      "data_technology",
      "risk_mitigation",
      "implementation_plan",
      "rollback_plan",
      "testing_plan_date",
    ];

    const emptyFields = requiredFields.filter(
      (key) => !form[key] || form[key].toString().trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }
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
        <div className="flex flex-col py-6 px-14">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-4">CR Approval EDIT BPO1</h1>
            {data && data.is_bpo1_approve !== "APPROVED" && (
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
          <CRFormItBeranda
            data={data}
            onCancel={() => {}}
            dataTicket={dataTicket}
            onFormChange={(form) => setForm(form)}
          />
        </div>
      </MainLayout>
    </div>
  );
}
