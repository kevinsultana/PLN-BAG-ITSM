"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import ContactUs from "@/components/Beranda/ContactUs/ContactUs";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

  const getDataContactUs = async () => {
    try {
      const res = await ProxyUrl.get("/helpdesk-info");
      setData(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataContactUs();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col ">
          <ContactUs data={data} />
        </div>
      </MainLayout>
    </div>
  );
}
