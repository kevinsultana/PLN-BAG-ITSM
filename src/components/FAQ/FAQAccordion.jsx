"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Lorem Ipsum",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
  {
    question: "Lorem Ipsum",
    answer: "Jawaban untuk pertanyaan kedua akan ditampilkan di sini.",
  },
  {
    question: "Lorem Ipsum",
    answer: "Ini adalah konten jawaban untuk pertanyaan ketiga.",
  },
  {
    question: "Lorem Ipsum",
    answer: "Penjelasan atau jawaban untuk pertanyaan keempat.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="bg-slate-100 py-6 px-14 h-full">
      <div className="bg-white rounded-xl pb-6">
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <p className="text-sm text-slate-500">
            Beranda / <span className="text-gray-700">FAQ</span>
          </p>
        </div>

        <div className="px-5 divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="font-semibold text-gray-800">
                  {item.question}
                </span>
                <span className="text-xl text-gray-700">
                  {openIndex === index ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 text-sm text-gray-700">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
