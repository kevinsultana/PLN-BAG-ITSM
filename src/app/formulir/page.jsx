import Footer from "@/components/Footer";
import FormulirTable from "@/components/Formulir/FormulirTable";
import NavBar from "@/components/NavBar";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <FormulirTable />
      <Footer />
    </div>
  );
}
