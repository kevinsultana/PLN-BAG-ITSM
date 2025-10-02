"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import ContactUs from "@/components/Beranda/ContactUs/ContactUs";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getDataContactUs = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/helpdesk-info");
      setData(res.data.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataContactUs();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col ">
            <ContactUs data={data} />
          </div>
        )}
      </MainLayout>
    </div>
  );
}
