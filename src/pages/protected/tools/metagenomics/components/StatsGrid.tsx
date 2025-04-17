import { Stats } from '../types';

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="frosted-glass p-6 fade-in">
    <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="frosted-glass p-4 text-center">
        <p className="text-gray-300">Total Reads</p>
        <p className="text-2xl text-cyan-400">{stats.total_reads}</p>
      </div>
      <div className="frosted-glass p-4 text-center">
        <p className="text-gray-300">Classified K-mers</p>
        <p className="text-2xl text-cyan-400">{stats.classified_kmers}</p>
      </div>
      <div className="frosted-glass p-4 text-center">
        <p className="text-gray-300">Unique Genera</p>
        <p className="text-2xl text-cyan-400">{stats.unique_genera}</p>
      </div>
    </div>
  </div>
);

export default StatsGrid;