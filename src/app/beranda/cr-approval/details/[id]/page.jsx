"use client";
import CrFormDetails from "@/components/Beranda/CRApproval/CrFormDetails";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { ProxyUrl } from "@/api/BaseUrl";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CircularProgress, Button } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCRDetail = async () => {
    try {
      setLoading(true);
      const response = await ProxyUrl.get(`/change-requests/${params.id}`);

      if (response.data.data) {
        setData(response.data.data);
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
          <h1 className="text-2xl font-bold mb-4">Detail CR Approval</h1>
          <CrFormDetails data={data} />
        </div>
      </MainLayout>
    </div>
  );
}
