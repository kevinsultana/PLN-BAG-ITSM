"use client";
import Dashboard from "@/components/Helpdesk/Home/Dashboard";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import React, { useState } from "react";

export default function page() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Helpdesk</h1>
        <Dashboard />
      </HelpdeskLayout>
    </div>
  );
}
