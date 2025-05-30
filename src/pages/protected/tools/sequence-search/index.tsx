import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import SearchResults from "./components/SearchResults";
import { SearchResponse, searchSequence } from "@/lib/services/tools/sequence_search";

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
    <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default SequenceSearchTool;