import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SequenceChartProps } from "../types/alignment";

export const SequenceChart: React.FC<SequenceChartProps> = ({
  sequence1,
  sequence2,
}) => {
  const chartData = useMemo(() => {
    const bases = ["A", "T", "C", "G"];
    return bases.map((base) => ({
      base,
      "Sequence 1": (sequence1.match(new RegExp(base, "g")) || []).length,
      "Sequence 2": (sequence2.match(new RegExp(base, "g")) || []).length,
    }));
  }, [sequence1, sequence2]);

  return (
    <div className="w-full h-[400px] mt-4">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="base" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sequence 1" fill="#4f46e5" />
          <Bar dataKey="Sequence 2" fill="#e11d48" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
