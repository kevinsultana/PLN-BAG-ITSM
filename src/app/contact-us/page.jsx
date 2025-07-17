import ContactUs from "@/components/ContactUs/ContactUs";
import MainLayout from "@/components/Layout/MainLayout";
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
