import React, { useState } from "react";
import {
  analyzeCodonUsage,
  CodonUsage,
} from "@/lib/services/tools/codon_usage";
import SequenceInput from "./components/SequenceInput";
import CodonTable from "./components/CodonTable";
// import CodonBarChart from "./components/CodonBarChart";
// import AminoAcidPieChart from "./components/AminoAcidPieChart";

const App: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [codonUsage, setCodonUsage] = useState<CodonUsage>({});
  const [tableHtml, setTableHtml] = useState("");
  const [aminoAcidFilter, setAminoAcidFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await analyzeCodonUsage(sequence);
      setCodonUsage(response.codon_usage);
      setTableHtml(response.table);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
        CodonCraft
      </h1>
      <SequenceInput
        sequence={sequence}
        setSequence={setSequence}
        onSubmit={handleSubmit}
      />
      {loading && (
        <p className="mt-4 text-center text-cyan-300">Analyzing...</p>
      )}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      {Object.keys(codonUsage).length > 0 && (
        <>
          <CodonTable
            tableHtml={tableHtml}
            codonUsage={codonUsage}
            aminoAcidFilter={aminoAcidFilter}
            setAminoAcidFilter={setAminoAcidFilter}
          />
          {/* <CodonBarChart codonUsage={codonUsage} /> */}
          {/* <AminoAcidPieChart codonUsage={codonUsage} /> */}
        </>
      )}
    </div>
  );
};

export default App;
