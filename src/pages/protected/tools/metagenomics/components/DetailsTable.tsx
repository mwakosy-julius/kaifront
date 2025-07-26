import { useState } from "react";
import { Detail } from "@/lib/services/tools";

interface DetailsTableProps {
  details: Detail[];
}

const DetailsTable: React.FC<DetailsTableProps> = ({ details }) => {
  const [sortField, setSortField] = useState<keyof Detail>("confidence");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Detail) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedDetails = [...details].sort((a, b) => {
    const aValue = a[sortField] ?? 0;
    const bValue = b[sortField] ?? 0;
    return sortOrder === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : aValue > bValue
      ? -1
      : 1;
  });

  return (
    <div className="p-6 frosted-glass fade-in">
      <h2 className="mb-4 text-2xl font-semibold">Top Taxa Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th
                className="p-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("genus")}
              >
                Genus{" "}
                {sortField === "genus" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("phylum")}
              >
                Phylum{" "}
                {sortField === "phylum" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("kmer_count")}
              >
                K-mer Hits{" "}
                {sortField === "kmer_count" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("distance")}
              >
                Avg Mismatch{" "}
                {sortField === "distance" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("confidence")}
              >
                Confidence (%){" "}
                {sortField === "confidence" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDetails.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-gray-700/50"
              >
                <td className="p-3">{row.genus}</td>
                <td className="p-3">{row.phylum}</td>
                <td className="p-3">{row.kmer_count}</td>
                <td className="p-3">
                  {row.distance ? row.distance.toFixed(2) : "N/A"}
                </td>
                <td className="p-3">{row.confidence.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;
