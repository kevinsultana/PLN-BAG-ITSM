import FAQAccordion from "@/components/FAQ/FAQAccordion";
import MainLayout from "@/components/Layout/MainLayout";
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
