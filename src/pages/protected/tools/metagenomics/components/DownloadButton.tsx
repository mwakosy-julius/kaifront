import { Detail } from '../types';

interface DownloadButtonProps {
  details: Detail[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ details }) => {
  const handleDownload = () => {
    const headers = ['genus', 'phylum', 'kmer_count', 'distance', 'confidence'];
    const csvRows = [
      headers.join(','),
      ...details.map(
        (row) =>
          `"${row.genus}","${row.phylum}",${row.kmer_count},${
            row.distance ? row.distance.toFixed(2) : 'N/A'
          },${row.confidence.toFixed(2)}`
      ),
    ];
    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metasimple_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 bg-cyan-500 text-white py-2 px-6 rounded-lg glow-button"
    >
      Download Results as CSV
    </button>
  );
};

export default DownloadButton;