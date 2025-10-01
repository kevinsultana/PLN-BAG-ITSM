"use client";
import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function FilterModal({ isOpen, onClose, onClickApply }) {
  const [selectedFilters, setSelectedFilters] = useState({
    kategori: "team",
    tanggal: getTodayDate(),
    tanggalend: getTodayDate(),
  });

  const dataKategori = [
    { name: "Team", value: "team" },
    { name: "Tipe Tiket", value: "type" },
    { name: "SLA Policy", value: "sla_policy" },
    { name: "Aplikasi", value: "application" },
  ];

  const handleApplyFilter = () => {
    onClickApply(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setSelectedFilters({
      kategori: "team",
      tanggal: new Date().toISOString().split("T")[0],
      tanggalend: new Date().toISOString().split("T")[0],
    });
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
              {/* Filter Kategori */}
              <div>
                <FormControl fullWidth>
                  <InputLabel id="kategori-label">
                    Kategori<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Select
                    labelId="kategori-label"
                    id="kategori-select"
                    value={selectedFilters.kategori}
                    label="Kategori"
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        kategori: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">
                      <em>Pilih Kategori</em>
                    </MenuItem>
                    {dataKategori.map((kategori) => (
                      <MenuItem key={kategori.value} value={kategori.value}>
                        {kategori.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Filter Tanggal Awal */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Tanggal Mulai<span className="text-red-500">*</span>
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

              {/* Filter Tanggal */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Tanggal Berakhir<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="tannggalend"
                    value={selectedFilters.tanggalend}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        tanggalend: e.target.value,
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
                  Terapkan
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
