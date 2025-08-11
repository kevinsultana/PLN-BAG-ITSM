import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function WebsiteTable() {
  const formList = [
    {
      id: 1,
      name: "User Matrix Website",
    },
    {
      id: 2,
      name: "Dokumen Konfigurasi Website",
    },
    {
      id: 3,
      name: "Dokumen SOP Website",
    },
    {
      id: 4,
      name: "Dokumen Shipment Website",
    },
  ];

  return (
    <div className="bg-slate-100 space-y-6">
      <div className="bg-white rounded-xl p-4 space-y-4">
        <h1 className="text-lg">List Dokumen</h1>

        <div className="px-5">
          <table className="table-fixed w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-12 px-4 py-3">No.</th>
                <th className="px-4 py-3">Website</th>
                <th className="w-40 px-4 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {formList.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}.</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center">
                    {item.file ? (
                      <a
                        href={item.file}
                        download
                        className="flex items-center gap-2 w-fit text-black px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                      >
                        <HiOutlineDocumentSearch className="text-xl" />
                      </a>
                    ) : (
                      <button
                        // onClick={() => handleOnClickForm(item)}
                        className="flex items-center gap-2 text-black px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition"
                      >
                        <HiOutlineDocumentSearch className="text-xl" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
