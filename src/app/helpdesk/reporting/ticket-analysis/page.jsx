"use client";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import TicketAnalysisChart from "@/components/Helpdesk/Reporting/TicketAnalysisChart";
import FilterModal from "@/components/Helpdesk/Reporting/FilterModal";
import { RiFilter2Line } from "react-icons/ri";
import { ProxyUrl } from "@/api/BaseUrl";
import CircularProgress from "@mui/material/CircularProgress";

export default function Page() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/reports/tickets/analysis");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApplyFilter = async (filters) => {
    try {
      const res = await ProxyUrl.get(
        "/reports/tickets/analysis?category=" +
          filters.kategori +
          "&start_date=" +
          filters.tanggal +
          "&end_date=" +
          filters.tanggalend
      );
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
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

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <CircularProgress />
            </div>
          ) : data && data.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <TicketAnalysisChart
                    title={item.category_name}
                    data={item.statuses.map((status) => ({
                      name: status.status,
                      value: status.total,
                    }))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border rounded-lg text-center text-gray-600">
              Tidak ada data
            </div>
          )}
        </div>
      </HelpdeskLayout>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilter}
        onClickApply={handleApplyFilter}
      />
    </div>
  );
}
