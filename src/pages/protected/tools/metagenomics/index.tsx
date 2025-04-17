import { useState } from 'react';
import axios from 'axios';
import InputPanel from './components/InputPanel';
import ResultChart from './components/ResultChart';
import StatsGrid from './components/StatsGrid';
import DetailsTable from './components/DetailsTable';
import DownloadButton from './components/DownloadButton';
import ErrorModal from './components/ErrorModal';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [inputMethod, setInputMethod] = useState<'file' | 'text'>('text');
  const [fastaText, setFastaText] = useState<string>(
    `>read1\nATGCCATGCTAGCTAGCTAGC\n>read2\nCGTACGTACGTACGTACGTAC\n>read3\nGCTAGCTAGCTAGCTAGCTAG\n>read4\nAATTGAATTGAATTGAATTGA`
  );
  const [fastaFile, setFastaFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateFasta = (text: string): boolean => {
    const lines = text.trim().split('\n');
    if (!lines.some(line => line.startsWith('>'))) return false;
    const seq = lines.filter(line => !line.startsWith('>')).join('').toUpperCase();
    return /^[ATCGN]+$/.test(seq);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      if (inputMethod === 'text' && !validateFasta(fastaText)) {
        throw new Error('Invalid FASTA format. Use >header\nATCGN...');
      }

      const formData = new FormData();
      if (inputMethod === 'file' && fastaFile) {
        formData.append('file', fastaFile);
      } else if (inputMethod === 'text' && fastaText.trim()) {
        formData.append('fasta_text', fastaText);
      } else {
        throw new Error('Please provide FASTA file or text');
      }

      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-5xl font-bold text-center neon-title mb-4">MetaSimple</h1>
      <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
        Analyze metagenomic FASTA reads to uncover microbial diversity with a realistic local database.
      </p>

      <div className="max-w-5xl mx-auto space-y-6">
        <InputPanel
          inputMethod={inputMethod}
          setInputMethod={setInputMethod}
          fastaText={fastaText}
          setFastaText={setFastaText}
          setFastaFile={setFastaFile}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || (inputMethod === 'text' && !fastaText.trim()) || (inputMethod === 'file' && !fastaFile)}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg glow-button disabled:opacity-50 text-lg font-semibold flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Metagenome'
          )}
        </button>

        {error && <ErrorModal error={error} onClose={() => setError(null)} />}

        {result && (
          <div className="space-y-6">
            {result.taxa.length > 0 && <ResultChart taxa={result.taxa} />}
            <StatsGrid stats={result.stats} />
            {result.details.length > 0 && (
              <>
                <DetailsTable details={result.details} />
                <DownloadButton details={result.details} />
              </>
            )}
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-400">
        <p>MetaSimple: Fast, accurate metagenomic profiling</p>
      </footer>
    </div>
  );
};

export default App;