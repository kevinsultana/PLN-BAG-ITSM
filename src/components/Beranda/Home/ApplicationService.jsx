import React from "react";
import { RiShip2Fill, RiAlignItemVerticalCenterFill } from "react-icons/ri";
import { MdTableChart, MdMarkEmailUnread } from "react-icons/md";
import { BiSolidBarChartAlt2, BiWorld } from "react-icons/bi";
import { TbChartGridDotsFilled, TbChartPieFilled } from "react-icons/tb";
import { PiTreeStructure } from "react-icons/pi";
import { BsCloudFill } from "react-icons/bs";
import { HiPresentationChartBar } from "react-icons/hi";
import CardBag from "./CardBag";

export default function ApplicationService({ handleNavigate, data }) {
  const resolveAppMeta = (name) => {
    switch (name) {
      case "ERP CRM":
        return { icon: <MdTableChart />, path: "erp-crm" };
      case "ERP FM":
        return { icon: <BiSolidBarChartAlt2 />, path: "erp-fm" };
      case "ERP MM":
        return { icon: <TbChartGridDotsFilled />, path: "erp-mm" };
      case "ERP HCM":
      case "ERP HRIS": // just in case it's passed directly
        return { icon: <PiTreeStructure />, path: "erp-hcm" };
      case "Ship Tracking":
        return { icon: <RiShip2Fill />, path: "ship-tracking" };
      case "PMS":
        return { icon: <TbChartPieFilled />, path: "pms" };
      case "Email":
        return { icon: <MdMarkEmailUnread />, path: "email" };
      case "Website":
        return { icon: <BiWorld />, path: "website" };
      case "BAg Cloud":
        return { icon: <BsCloudFill />, path: "bag-cloud" };
      case "Fuel Mentoring":
        return { icon: <HiPresentationChartBar />, path: "fuel-mentoring" };
      case "e-Procurement":
        return {
          icon: <RiAlignItemVerticalCenterFill />,
          path: "e-procurement",
        };
      default:
        return null; // unknown app, skip rendering until backend provides icon/route mapping
    }
  };

  // Normalize possible variant names from API to match our base map
  const normalizeAppName = (name) => {
    if (!name) return name;
    const trimmed = String(name).trim();
    if (trimmed.toLowerCase() === "erp hris") return "ERP HCM"; // normalize HRIS -> HCM
    return trimmed;
  };

  // Build cards strictly from provided API data (unique per application)
  const providedApps = Array.isArray(data) ? data : [];
  const published = providedApps.filter((d) => d && d.is_publish);
  const seen = new Set();
  const dataApps = [];
  for (const entry of published) {
    const name = normalizeAppName(entry.application_name);
    if (!name || seen.has(name)) continue;
    const meta = resolveAppMeta(name);
    if (!meta) continue;
    seen.add(name);
    dataApps.push({ id: entry.id, title: name, ...meta });
  }

  return (
    <div className="p-5 bg-white flex flex-col gap-7 rounded-2xl">
      <p className="text-xl font-bold text-black">BAG Application Services</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {dataApps.map((item, index) => (
          <CardBag
            key={index}
            item={item}
            handleOnClick={() => {
              handleNavigate(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
