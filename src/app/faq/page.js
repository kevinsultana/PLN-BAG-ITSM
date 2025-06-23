import FAQAccordion from "@/components/FAQ/FAQAccordion";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

export default function faq() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <FAQAccordion />
      <Footer />
    </div>
  );
}
