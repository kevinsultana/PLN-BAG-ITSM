"use client";
import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

export default function TambahAnggotaModal({ isOpen, onClose, onSubmit }) {
  const [selectedFilters, setSelectedFilters] = useState({
    name: "",
    email: "",
    value: "",
  });

  useEffect(() => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      value: selectedFilters.name.toLocaleLowerCase(),
    }));
  }, [selectedFilters.name]);

  const handleApplyFilter = () => {
    onSubmit(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setSelectedFilters({
      name: "",
      email: "",
      value: "",
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
              <h2 className="text-xl font-bold">Tambah Anggota</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4">
              {/* input name */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Masukkan name Lengkap"
                  value={selectedFilters.name}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* input email */}
              <div>
                <label className="font-semibold text-sm block mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="Masukkan Email"
                  value={selectedFilters.email}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilter}
                  className="px-6 py-2 rounded-lg text-white bg-[#65C7D5] hover:bg-[#4FB3C1] transition"
                >
                  Tambah
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
