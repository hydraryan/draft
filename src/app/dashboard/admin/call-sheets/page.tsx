"use client";

import { useEffect, useState } from "react";

export default function CallSheetsPage() {
  const [callSheets, setCallSheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/call-sheets");
      const data = await res.json();
      setCallSheets(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">📑 Call Sheets</h1>

      <table className="w-full border border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {callSheets.map((sheet) => (
            <tr key={sheet.call_sheet_id} className="border-t border-gray-700">
              <td className="p-2">{sheet.title}</td>
              <td className="p-2">{sheet.date}</td>
              <td className="p-2">{sheet.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
