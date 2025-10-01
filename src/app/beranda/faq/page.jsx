import FAQAccordion from "@/components/Beranda/FAQ/FAQAccordion";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function Page() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <FAQAccordion />
        </div>
      </MainLayout>
    </div>
  );
}
