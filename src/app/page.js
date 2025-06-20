import Footer from "@/components/Footer";
import ApplicationService from "@/components/Home/ApplicationService";
import HeroImg from "@/components/Home/HeroImg";
import IntegrationService from "@/components/Home/IntegrationService";
import NavBar from "@/components/NavBar";
import React from "react";

export default function page() {
  return (
    <div className="bg-slate-100 h-full">
      <NavBar />
      <HeroImg />
      <ApplicationService />
      <IntegrationService />
      <Footer />
    </div>
  );
}
