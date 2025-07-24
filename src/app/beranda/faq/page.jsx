import FAQAccordion from "@/components/Beranda/FAQ/FAQAccordion";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function faq() {
  return (
    <div className="flex flex-col h-screen">
      <MainLayout>
        <FAQAccordion />
      </MainLayout>
    </div>
  );
}
