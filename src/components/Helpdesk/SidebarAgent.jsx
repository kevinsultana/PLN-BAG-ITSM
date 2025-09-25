"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  RiHome4Line,
  RiFileEditLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFileList2Line,
  RiUser3Line,
  RiBuildingLine,
  RiSettings3Line,
} from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { BiPhoneCall } from "react-icons/bi";
import { useAuth } from "@/context/AuthContext";

export default function SidebarAgent({ show }) {
  const { privilege } = useAuth();

  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarOpenDropdown") || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarOpenDropdown", openDropdown || "");
    }
  }, [openDropdown]);

  const getLinkClassName = (paths) => {
    const isActive = Array.isArray(paths)
      ? paths.some((p) =>
          p.includes("[")
            ? pathname.startsWith(p.split("/[")[0])
            : pathname === p
        )
      : paths.includes("[")
      ? pathname.startsWith(paths.split("/[")[0])
      : pathname === paths;
    return isActive
      ? "text-[#65C7D5] font-bold flex items-center gap-2"
      : "text-gray-700 flex items-center gap-2";
  };

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <div
      className={`w-1/6 bg-white transition-all duration-300 ease-in-out relative  ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="ml-8 my-3">
        <ul className="flex flex-col gap-3">
          {privilege?.data?.includes("helpdesk.read") && (
            <li>
              <Link
                href="/helpdesk"
                className={getLinkClassName(["/helpdesk"])}
              >
                <RiHome4Line />
                Helpdesk
              </Link>
            </li>
          )}

          {/* Tiket Dropdown */}
          {privilege?.data?.some((p) => p.startsWith("ticket.")) && (
            <li>
              <div
                className={`flex items-center justify-between cursor-pointer ${
                  pathname.startsWith("/helpdesk/tiket")
                    ? "text-[#65C7D5] font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => toggleDropdown("tiket")}
              >
                <div className="flex items-center gap-2">
                  <RiFileEditLine />
                  Tiket
                </div>
                {openDropdown === "tiket" ? (
                  <RiArrowUpSLine className="mr-4" />
                ) : (
                  <RiArrowDownSLine className="mr-4" />
                )}
              </div>
              <ul
                className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === "tiket"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {privilege.data.includes("ticket.my.read") && (
                  <li>
                    <Link
                      href="/helpdesk/tiket/my-ticket"
                      className={getLinkClassName("/helpdesk/tiket/my-ticket")}
                    >
                      Tiket Saya
                    </Link>
                  </li>
                )}
                {privilege.data.includes("ticket.all.read") && (
                  <li>
                    <Link
                      href="/helpdesk/tiket/all-ticket"
                      className={getLinkClassName("/helpdesk/tiket/all-ticket")}
                    >
                      Semua Tiket
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          )}

          {/* Reporting Dropdown */}
          {privilege?.data?.some((p) => p.startsWith("reporting.")) && (
            <li>
              <div
                className={`flex items-center justify-between cursor-pointer ${
                  pathname.startsWith("/helpdesk/reporting")
                    ? "text-[#65C7D5] font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => toggleDropdown("reporting")}
              >
                <div className="flex items-center gap-2">
                  <RiFileList2Line />
                  Reporting
                </div>
                {openDropdown === "reporting" ? (
                  <RiArrowUpSLine className="mr-4" />
                ) : (
                  <RiArrowDownSLine className="mr-4" />
                )}
              </div>
              <ul
                className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === "reporting"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {privilege?.data?.includes("reporting.analysis.read") && (
                  <li>
                    <Link
                      href="/helpdesk/reporting/ticket-analysis"
                      className={getLinkClassName(
                        "/helpdesk/reporting/ticket-analysis"
                      )}
                    >
                      Tiket Analysis
                    </Link>
                  </li>
                )}
                {privilege?.data?.includes("reporting.sla.read") && (
                  <li>
                    <Link
                      href="/helpdesk/reporting/sla-status"
                      className={getLinkClassName(
                        "/helpdesk/reporting/sla-status"
                      )}
                    >
                      SLA Analysis
                    </Link>
                  </li>
                )}
                {privilege?.data?.includes("reporting.cr.read") && (
                  <li>
                    <Link
                      href="/helpdesk/reporting/cr-tracking"
                      className={getLinkClassName(
                        "/helpdesk/reporting/cr-tracking"
                      )}
                    >
                      CR Tracking
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          )}

          {privilege.data.includes("document.application.read") && (
            <li>
              <Link
                href="/helpdesk/apps-document"
                className={getLinkClassName([
                  "/helpdesk/apps-document",
                  "/helpdesk/apps-document/new",
                  "/helpdesk/apps-document/edit/[id]",
                ])}
              >
                <LuClipboardList />
                Dokumen aplikasi
              </Link>
            </li>
          )}

          {privilege.data.includes("user.privilege.read") && (
            <li>
              <Link
                href="/helpdesk/user-privilege"
                className={getLinkClassName([
                  "/helpdesk/user-privilege",
                  "/helpdesk/user-privilege/new",
                  "/helpdesk/user-privilege/edit/[id]",
                ])}
              >
                <RiUser3Line />
                User Privilege
              </Link>
            </li>
          )}

          {privilege.data.includes("bpo.read") && (
            <li>
              <Link
                href="/helpdesk/bpo"
                className={getLinkClassName([
                  "/helpdesk/bpo",
                  "/helpdesk/bpo/new",
                ])}
              >
                <RiBuildingLine />
                BPO
              </Link>
            </li>
          )}

          {/* Konfigurasi Dropdown */}
          <li>
            <div
              className={`flex items-center justify-between cursor-pointer ${
                pathname.startsWith("/helpdesk/config")
                  ? "text-[#65C7D5] font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => toggleDropdown("konfigurasi")}
            >
              <div className="flex items-center gap-2">
                <RiSettings3Line />
                Konfigurasi
              </div>
              {openDropdown === "konfigurasi" ? (
                <RiArrowUpSLine className="mr-4" />
              ) : (
                <RiArrowDownSLine className="mr-4" />
              )}
            </div>
            <ul
              className={`ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openDropdown === "konfigurasi"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {privilege.data.includes("config.team.member.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/team-member"
                    className={getLinkClassName([
                      "/helpdesk/config/team-member",
                      "/helpdesk/config/team-member/new",
                      "/helpdesk/config/team-member/edit/[id]",
                    ])}
                  >
                    Team Member
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.teams.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/agent-management"
                    className={getLinkClassName([
                      "/helpdesk/config/agent-management",
                      "/helpdesk/config/agent-management/new",
                      "/helpdesk/config/agent-management/edit/[id]",
                    ])}
                  >
                    Agent Management
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.ticket.status.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/tiket-status"
                    className={getLinkClassName([
                      "/helpdesk/config/tiket-status",
                      "/helpdesk/config/tiket-status/new",
                      "/helpdesk/config/tiket-status/edit/[id]",
                    ])}
                  >
                    Status Tiket
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.sla.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/sla-policy"
                    className={getLinkClassName([
                      "/helpdesk/config/sla-policy",
                      "/helpdesk/config/sla-policy/new",
                      "/helpdesk/config/sla-policy/edit/[id]",
                    ])}
                  >
                    SLA Policy
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.ticket.type.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/ticket-type"
                    className={getLinkClassName([
                      "/helpdesk/config/ticket-type",
                      "/helpdesk/config/ticket-type/edit/[id]",
                      "/helpdesk/config/ticket-type/new",
                    ])}
                  >
                    Tipe Tiket
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.application.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/application"
                    className={getLinkClassName([
                      "/helpdesk/config/application",
                      "/helpdesk/config/application/new",
                      "/helpdesk/config/application/edit/[id]",
                    ])}
                  >
                    Aplikasi
                  </Link>
                </li>
              )}
              {privilege.data.includes("config.helpdesk.info.read") && (
                <li>
                  <Link
                    href="/helpdesk/config/helpdesk-info"
                    className={getLinkClassName([
                      "/helpdesk/config/helpdesk-info",
                      "/helpdesk/config/helpdesk-info/new",
                      "/helpdesk/config/helpdesk-info/edit/[id]",
                    ])}
                  >
                    Helpdesk Info
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
