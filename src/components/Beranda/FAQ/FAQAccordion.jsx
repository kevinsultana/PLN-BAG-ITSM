"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Bagaimana cara membuat tiket permintaan bantuan?",
    answer:
      "Anda dapat membuat tiket dengan masuk ke portal Helpdesk IT, kemudian klik tombol 'Buat Tiket' dan lengkapi formulir yang tersedia dengan informasi detail mengenai masalah Anda.",
  },
  {
    question: "Berapa lama waktu respons untuk tiket yang saya ajukan?",
    answer:
      "Waktu respons tergantung pada tingkat prioritas tiket. Untuk prioritas tinggi (seperti gangguan sistem utama), tim IT akan merespons dalam waktu maksimal 1 jam. Untuk prioritas normal, maksimal 1 hari kerja.",
  },
  {
    question: "Bagaimana cara mengetahui status tiket saya?",
    answer:
      "Setelah tiket dibuat, Anda dapat memantau statusnya melalui dashboard tiket. Anda akan menerima notifikasi email setiap kali ada pembaruan status.",
  },
  {
    question: "Apakah saya bisa menambahkan informasi setelah tiket dibuat?",
    answer:
      "Ya, Anda bisa membuka tiket Anda di sistem dan menambahkan komentar atau lampiran jika diperlukan.",
  },
  {
    question: "Apa yang harus saya lakukan jika lupa nomor tiket saya?",
    answer:
      "Silakan masuk ke akun Anda di sistem helpdesk. Semua tiket yang Anda buat akan tampil di halaman dashboard Anda.",
  },
  {
    question: "Masalah apa saja yang bisa dilaporkan lewat tiket helpdesk?",
    answer:
      "Anda bisa melaporkan berbagai masalah seperti komputer/laptop bermasalah, software tidak berfungsi, permintaan akses sistem, email tidak bisa digunakan, atau permintaan instalasi aplikasi.",
  },
  {
    question: "Bisakah saya mengubah prioritas tiket setelah dibuat?",
    answer:
      "Perubahan prioritas dapat dilakukan oleh tim IT berdasarkan evaluasi terhadap dampak masalah. Jika Anda merasa masalah semakin mendesak, tambahkan komentar di tiket untuk memberi penjelasan tambahan.",
  },
  {
    question: "Kapan tiket dianggap selesai?",
    answer:
      "Tiket dianggap selesai setelah tim IT menyelesaikan masalah dan Anda telah mengonfirmasi bahwa solusi sudah sesuai. Jika tidak ada respons dalam 2 hari setelah solusi diberikan, tiket akan otomatis ditutup.",
  },
  {
    question: "Apakah saya bisa membuka kembali tiket yang sudah ditutup?",
    answer:
      "Ya, Anda dapat membuka kembali tiket yang sudah ditutup dalam waktu 7 hari jika masalah belum sepenuhnya terselesaikan.",
  },
  {
    question:
      "Siapa yang bisa saya hubungi jika ada masalah dengan sistem helpdesk?",
    answer:
      "Silakan hubungi administrator IT atau kirim email ke helpdesk@namaperusahaan.com jika Anda mengalami kendala dalam mengakses sistem helpdesk.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="bg-slate-100 ">
      <div className="bg-white rounded-xl pb-6">
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl ">List FAQ</h1>
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
