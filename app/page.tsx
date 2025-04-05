import React, { useState } from "react";

export default function RawDataTable({ data }: { data: any[] }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 100;

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const currentData = data.slice(start, end);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Raw Data ({data.length} rows)</h2>
      <div className="overflow-auto border rounded max-h-[70vh]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {Object.keys(currentData[0] || {}).map((col) => (
                <th key={col} className="p-2 border-b font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="p-2 border-b">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 0}
        >
          Prev
        </button>
        <span>Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(data.length / rowsPerPage) - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={end >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
