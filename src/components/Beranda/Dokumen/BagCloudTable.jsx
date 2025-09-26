import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function BagCloudTable({ data }) {
  // Expecting data.attachments to be an array of attachment objects
  const attachments = data.attachments || [];

  return (
    <div className="bg-slate-100 space-y-6">
      <div className="bg-white rounded-xl p-4 space-y-4">
        <h1 className="text-lg">List Dokumen {data.application_name}</h1>
        <div className="px-5">
          <table className="table-fixed w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-12 px-4 py-3">No.</th>
                <th className="px-4 py-3">Nama Dokumen</th>
                <th className="w-40 px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {attachments.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-center text-gray-400"
                  >
                    Tidak ada dokumen
                  </td>
                </tr>
              ) : (
                attachments.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}.</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-fit text-black px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                      >
                        <HiOutlineDocumentSearch className="text-xl" />
                        <span>Lihat</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
