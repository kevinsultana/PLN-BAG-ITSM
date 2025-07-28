"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  RiCalendarLine,
  RiInformationLine,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
} from "react-icons/ri";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState("Juli, 2025");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const ticketSummary = [
    {
      status: "Open",
      count: 80,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      status: "In Progress",
      count: 75,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      status: "Waiting",
      count: "100",
      color: "bg-orange-400",
      textColor: "text-orange-400",
    },
    {
      status: "Resolved",
      count: 55,
      color: "bg-blue-400",
      textColor: "text-blue-400",
    },
    {
      status: "Closed",
      count: 90,
      color: "bg-gray-400",
      textColor: "text-gray-400",
    },
  ];

  const ticketList = [
    {
      priority: "Kritis",
      priorityColor: "bg-red-100 text-red-700",
      subject: "Reset Password",
      slaDeadline: "Kamis, 20 Juni 2025 - 10:00 WIB",
    },
    {
      priority: "Kritis",
      priorityColor: "bg-red-100 text-red-700",
      subject: "Additional Kolom Lampiran",
      slaDeadline: "Kamis, 20 Juni 2025 - 10:00 WIB",
    },
    {
      priority: "Tinggi",
      priorityColor: "bg-orange-100 text-orange-700",
      subject: "Gagal Upload RAB",
      slaDeadline: "Kamis, 20 Juni 2025 - 10:00 WIB",
    },
    {
      priority: "Sedang",
      priorityColor: "bg-yellow-100 text-yellow-700",
      subject: "Vendor Bill Not Paid",
      slaDeadline: "Kamis, 20 Juni 2025 - 10:00 WIB",
    },
  ];

  const slaPerformance = [
    { label: "Total Ticket Todays", value: 32 },
    { label: "SLA on Track", value: 3 },
    { label: "SLA on Breached", value: 4 },
    { label: "AVG Resolution Time", value: "3 Jam" },
    { label: "AVG Response Time", value: "4.5 Jam" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const handleMonthChange = (offset) => {
    let newMonth = selectedMonth + offset;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleApplyDate = () => {
    setCurrentDate(`${months[selectedMonth]}, ${selectedYear}`);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="p-4 mt-4 bg-gray-50 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div
          className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm cursor-pointer relative"
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        >
          <RiCalendarLine className="mr-2 text-gray-500" />
          <span>{currentDate}</span>
          <RiArrowDownSLine className="ml-2 text-gray-500" />
        </div>

        {/* Date Picker Modal */}
        {isDatePickerOpen && (
          <div
            ref={datePickerRef}
            className="absolute top-48 right-10 z-50 bg-gray-800 text-white rounded-lg shadow-xl p-6 w-80"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                <RiArrowLeftSLine className="text-xl" />
              </button>
              <span className="font-semibold text-lg">
                {months[selectedMonth]} {selectedYear}
              </span>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                <RiArrowRightSLine className="text-xl" />
              </button>
            </div>
            {/* Bagian untuk bulan dan tahun */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(index)}
                  className={`p-2 rounded-md ${
                    selectedMonth === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {month.substring(0, 3)}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded-md text-white text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1900"
              max="2100"
            />
            <button
              onClick={handleApplyDate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setIsDatePickerOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      {/* Ticket Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {ticketSummary.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-6 rounded-lg shadow-md ${item.color} text-white`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{item.status}</span>
              <RiInformationLine className="text-xl" />
            </div>
            <span className="text-5xl font-bold">{item.count}</span>
          </div>
        ))}
      </div>
      {/* List Tiket & SLA Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Tiket */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            List Tiket
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer">
                      Prioritas
                      <RiArrowDownSLine className="ml-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subjek
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SLA Deadline
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ticketList.map((ticket, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${ticket.priorityColor}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.slaDeadline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SLA Performance */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            SLA Performance
          </h2>
          <div className="divide-y divide-gray-200">
            {slaPerformance.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3"
              >
                <span className="text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
