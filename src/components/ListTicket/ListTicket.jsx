"use client";
import React, { useMemo, useState } from "react";

const data = [
  {
    no: 1,
    ticket: "TK00001 - reset - password",
    description: "Maintenance Request",
    date: "11/10/2025 - 11:58 WIB",
    status: "In Progress",
  },
  {
    no: 2,
    ticket: "TK00002 - reset - password",
    description: "Maintenance Request",
    date: "11/10/2025 - 11:58 WIB",
    status: "Open",
  },
  {
    no: 3,
    ticket: "TK00003 - reset - password",
    description: "Maintenance Request",
    date: "11/10/2025 - 11:58 WIB",
    status: "Close",
  },
  {
    no: 4,
    ticket: "TK00004 - reset - password",
    description: "Maintenance Request",
    date: "11/10/2025 - 11:58 WIB",
    status: "Waiting",
  },
];

const statusColor = {
  "In Progress": "bg-red-500",
  Open: "bg-green-600",
  Close: "bg-slate-500",
  Waiting: "bg-yellow-500",
};

export default function TicketTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
        className: "w-12",
      },
      {
        Header: "Tiket",
        accessor: "ticket",
        className: "w-[30%]",
      },
      {
        Header: "Deskripsi Tiket",
        accessor: "description",
        className: "w-[30%]",
      },
      {
        Header: "Tanggal",
        accessor: "date",
        className: "w-[24%]",
      },
      {
        Header: "Tahapan",
        accessor: "status",
        className: "w-36",
        Cell: ({ value }) => (
          <div
            className={`text-white rounded-full px-3 py-1 text-center ${statusColor[value]}`}
          >
            {value}
          </div>
        ),
      },
    ],
    []
  );

  const currentPageData = data.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="bg-slate-100 py-6 px-14 h-full">
      <div className="bg-white rounded-xl pb-4">
        <div className="flex justify-between items-center p-5 pb-6">
          <h1 className="text-2xl font-bold">Urutan Tiket</h1>
          <p className="text-sm text-slate-500">
            Beranda / Helpdesk / Urutan Ticket
          </p>
        </div>
        <div className="px-5">
          <table className="min-w-full border border-gray-200 divide-y divide-x divide-gray-800 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={`px-4 py-2 text-left ${col.className || ""}`}
                  >
                    {col.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`px-4 py-2 ${col.className || ""}`}
                    >
                      {col.Cell
                        ? col.Cell({ value: row[col.accessor] })
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
              disabled={pageIndex === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setPageIndex((p) =>
                  (p + 1) * pageSize < data.length ? p + 1 : p
                )
              }
              disabled={(pageIndex + 1) * pageSize >= data.length}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
