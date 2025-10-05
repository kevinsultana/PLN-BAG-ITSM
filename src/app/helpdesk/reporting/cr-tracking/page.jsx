"use client";
import { useEffect, useState } from "react";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import CrTrackingChart from "@/components/Helpdesk/Reporting/CrTrackingChart";
import FilterModalTanggal from "@/components/Helpdesk/Reporting/FilterModalTanggal";
import { RiFilter2Line } from "react-icons/ri";
import { ProxyUrl } from "@/api/BaseUrl";
import CircularProgress from "@mui/material/CircularProgress";
import CrTrackingTable from "@/components/Helpdesk/Reporting/CrTrackingTable";

export default function Page() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    page_size: 5,
    total: 0,
    total_pages: 1,
    has_prev: false,
    has_next: false,
  });
  const [filters, setFilters] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    tanggalend: new Date().toISOString().split("T")[0],
  });

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const getData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/reports/change-requests/tracking", {
        params: {
          from: filters.tanggal,
          to: filters.tanggalend,
          page: page,
          page_size: 5,
        },
      });
      setData(res.data.data.items || []);
      setMeta(
        res.data.meta || {
          page: 1,
          page_size: 5,
          total: 0,
          total_pages: 1,
          has_prev: false,
          has_next: false,
        }
      );
    } catch (error) {
      console.error("Error fetching CR tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApplyFilter = async (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/reports/change-requests/tracking", {
        params: {
          from: newFilters.tanggal,
          to: newFilters.tanggalend,
          page: 1,
          page_size: 5,
        },
      });
      setData(res.data.data.items || []);
      setMeta(
        res.data.meta || {
          page: 1,
          page_size: 5,
          total: 0,
          total_pages: 1,
          has_prev: false,
          has_next: false,
        }
      );
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const res = await ProxyUrl.get("/reports/change-requests/tracking", {
        params: {
          from: filters.tanggal,
          to: filters.tanggalend,
          page: newPage,
          page_size: 5,
        },
      });
      setData(res.data.data.items || []);
      setMeta(res.data.meta);
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <HelpdeskLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reporting</h1>
          {user.data.role === "Lead Agent" ||
            (user.data.role === "Administrator" && (
              <button
                onClick={() => {}}
                disabled={loadingDownload}
                className="flex items-center min-w-20 justify-center gap-2 px-4 py-2.5 bg-[#65C7D5] text-white rounded-2xl text-sm hover:opacity-90 cursor-pointer"
              >
                {loadingDownload ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Exports"
                )}
              </button>
            ))}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">CR Tracking</h1>
            <div className="flex items-center gap-3">
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(meta.page - 1)}
                  disabled={!meta.has_prev || loading}
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                <span className="text-sm text-gray-600">
                  {meta.page} / {meta.total_pages}
                </span>
                <button
                  onClick={() => handlePageChange(meta.page + 1)}
                  disabled={!meta.has_next || loading}
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>

              {/* Filter Button */}
              <button
                onClick={handleOpenFilter}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <RiFilter2Line />
                Filter
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <CircularProgress />
            </div>
          ) : (
            <>
              <CrTrackingChart data={data} />
              <div className="h-6"></div>
              <CrTrackingTable data={data} />
              {meta.total > 0 && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Menampilkan {(meta.page - 1) * meta.page_size + 1}-
                  {Math.min(meta.page * meta.page_size, meta.total)} dari{" "}
                  {meta.total} data CR Tracking
                </div>
              )}
            </>
          )}
        </div>
      </HelpdeskLayout>

      <FilterModalTanggal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilter}
        onClickApply={handleApplyFilter}
      />
    </div>
  );
}
