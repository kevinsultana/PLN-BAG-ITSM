import ContactUs from "@/components/Beranda/ContactUs/ContactUs";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <MainLayout>
        <ContactUs />
      </MainLayout>
    </div>
  );
}
