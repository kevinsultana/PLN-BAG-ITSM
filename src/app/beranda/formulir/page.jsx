"use client";

import FormulirTable from "@/components/Beranda/Formulir/FormulirTable";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <MainLayout>
        <FormulirTable handleOpenForm={(item) => console.log(item)} />
      </MainLayout>
    </div>
  );
}
