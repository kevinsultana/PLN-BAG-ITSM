"use client";
import React, { useRef } from "react";
import ApplicationService from "@/components/Home/ApplicationService";
import HeroImg from "@/components/Home/HeroImg";
import HomeContactUs from "@/components/Home/HomeContactUs";
import IntegrationService from "@/components/Home/IntegrationService";
import NavigateServices from "@/components/Home/NavigateServices";
import MainLayout from "@/components/Layout/MainLayout";

export default function Page() {
  const applicationRef = useRef(null);
  const integrationRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-100 h-full">
      <MainLayout>
        <div className="flex flex-col py-6 px-14">
          <h1 className="text-2xl font-bold mb-6">Beranda</h1>
          <HeroImg />
          <HomeContactUs />
          <NavigateServices
            onApplicationClick={() => scrollToSection(applicationRef)}
            onIntegrationClick={() => scrollToSection(integrationRef)}
          />
          <div ref={applicationRef}>
            <ApplicationService />
          </div>
          <div ref={integrationRef}>
            <IntegrationService />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
