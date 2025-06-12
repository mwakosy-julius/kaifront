import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import SearchResults from "./components/SearchResults";
import {
  SearchResponse,
  searchSequence,
} from "@/lib/services/tools/sequence_search";
import { ToolLayout } from "@/components/shared/bio-tools";
import { Dna } from "lucide-react";

const SequenceSearchTool: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queryType, setQueryType] = useState<"gene" | "protein">("gene"); // Initialize with a valid default value
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a gene or protein name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await searchSequence({ query, query_type: queryType });
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Genomic Sequence Searcher"
      description="Quickly search Gene and Protein Sequences from database"
      icon={Dna}
      toolId="sequence_search"
      documentationUrl="/docs/tools/sequence-search"
      shareUrl="/share/sequence-search"
      infoText="Use this tool to search for specific genes or proteins in our database. You can enter either a gene name or a protein name to find relevant sequences."
      // className="max-w-4xl mx-auto"
    >
      <SequenceInput
        query={query}
        setQuery={setQuery}
        setQueryType={setQueryType}
        handleSearch={handleSearch}
        onSubmit={handleSearch}
        loading={loading}
        queryType={queryType}
        error={error}
      />
      <SearchResults results={results} />
    </ToolLayout>
  );
};

export default SequenceSearchTool;
