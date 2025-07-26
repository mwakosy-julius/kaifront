import { Detail } from "@/lib/services/tools";
interface DownloadButtonProps {
  details: Detail[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ details }) => {
  const handleDownload = () => {
    const headers = ["genus", "phylum", "kmer_count", "distance", "confidence"];
    const csvRows = [
      headers.join(","),
      ...details.map(
        (row) =>
          `"${row.genus}","${row.phylum}",${row.kmer_count},${
            row.distance ? row.distance.toFixed(2) : "N/A"
          },${row.confidence.toFixed(2)}`
      ),
    ];
    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metasimple_results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-2 mt-4 text-white rounded-lg bg-cyan-500 glow-button"
    >
      Download Results as CSV
    </button>
  );
};

export default DownloadButton;
