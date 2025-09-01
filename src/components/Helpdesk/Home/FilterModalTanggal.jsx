"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

export default function FilterModalTanggal({ isOpen, onClose }) {
  const [selectedFilters, setSelectedFilters] = useState({
    kategori: "",
    periode: "Hari",
    tanggal: new Date().toISOString().split("T")[0],
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const dataPeriode = [
    "Hari",
    "Minggu",
    "Bulan",
    "Triwulan",
    "Semester",
    "Tahun",
  ];

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleApplyFilter = () => {
    console.log("Applied filters:", selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setSelectedFilters({
      kategori: "",
      periode: "",
      tanggal: new Date().toISOString().split("T")[0],
    });
    setOpenDropdown(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">Filter</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Filter Periode */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Periode<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="periode"
                    value={selectedFilters.periode}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        periode: e.target.value,
                      })
                    }
                    className="input w-full appearance-none"
                  >
                    <option value="" disabled>
                      Pilih Periode
                    </option>
                    {dataPeriode.map((periode, index) => (
                      <option key={index} value={periode}>
                        {periode}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filter Tanggal */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Tanggal<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="tanggal"
                    value={selectedFilters.tanggal}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        tanggal: e.target.value,
                      })
                    }
                    className="input w-full pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    <FaCalendarAlt />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilter}
                  className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
                >
                  Terpakan
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
