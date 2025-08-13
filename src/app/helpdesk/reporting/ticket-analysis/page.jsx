"use client";
import { useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import TicketAnalysisChart from "@/components/Helpdesk/Reporting/TicketAnalysisChart";
import FilterModal from "@/components/Helpdesk/Reporting/FilterModal";
import { RiFilter2Line } from "react-icons/ri";

const dataFunctional = [
  { name: "New", value: 10 },
  { name: "In Progress", value: 20 },
  { name: "On Hold", value: 25 },
  { name: "Resolved", value: 45 },
  { name: "Closed", value: 10 },
];

const dataTechnical = [
  { name: "New", value: 15 },
  { name: "In Progress", value: 25 },
  { name: "On Hold", value: 15 },
  { name: "Resolved", value: 45 },
  { name: "Closed", value: 20 },
];

export default function Page() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reporting</h1>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer">
            Export
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">Ticket Analysis</h1>
            <button
              onClick={handleOpenFilter}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <RiFilter2Line />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TicketAnalysisChart title="Functional" data={dataFunctional} />
            <TicketAnalysisChart title="Technical" data={dataTechnical} />
          </div>
        </div>
      </HelpdeskLayout>

      <FilterModal isOpen={isFilterModalOpen} onClose={handleCloseFilter} />
    </div>
  );
}
