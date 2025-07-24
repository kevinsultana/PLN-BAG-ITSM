"use client";
import FormulirTable from "@/components/Formulir/FormulirTable";
import MainLayout from "@/components/Layout/MainLayout";
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
