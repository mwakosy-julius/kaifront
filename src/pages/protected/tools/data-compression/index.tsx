import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

// Define TypeScript interfaces matching FastAPI models
interface CompressionRequest {
  sequence: string;
  method: 'run_length' | 'delta';
  reference?: string;
}

interface CompressionResponse {
  original: string;
  compressed: string;
  method: string;
  compression_ratio: number;
}

const DataCompression: React.FC = () => {
  const [sequence, setSequence] = useState<string>(
    '>seq1\nATCGATCGATCGATCG\n>seq2\nATGGATCGATCGATCG'
  );
  const [method, setMethod] = useState<'run_length' | 'delta'>('run_length');
  const [reference, setReference] = useState<string>('');
  const [result, setResult] = useState<CompressionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompress = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    const request: CompressionRequest = {
      sequence,
      method,
      ...(method === 'delta' && reference ? { reference } : {}),
    };

    try {
      const response = await axios.post<CompressionResponse>(
        'http://localhost:8000/data_compression',
        request,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setResult(response.data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || 'Failed to compress data'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Genomic Data Compression</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>FASTA Sequence</strong>
          <br />
          <textarea
            rows={6}
            cols={50}
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Enter FASTA or raw DNA sequence"
            style={{ width: '100%', fontFamily: 'monospace' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Compression Method</strong>
          <br />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'run_length' | 'delta')}
            style={{ padding: '5px' }}
          >
            <option value="run_length">Run-Length Encoding</option>
            <option value="delta">Delta Compression</option>
          </select>
        </label>
      </div>

      {method === 'delta' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            <strong>Reference Sequence</strong>
            <br />
            <textarea
              rows={4}
              cols={50}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter reference sequence for delta compression"
              style={{ width: '100%', fontFamily: 'monospace' }}
            />
          </label>
        </div>
      )}

      <button
        onClick={handleCompress}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Compressing...' : 'Compress Data'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Compression Result</h2>
          <div style={{ fontFamily: 'monospace', background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Original Sequence:</strong></p>
            <pre>{result.original}</pre>
            <p><strong>Compressed Data:</strong></p>
            <pre>{result.compressed}</pre>
            <p><strong>Method:</strong> {result.method}</p>
            <p><strong>Compression Ratio:</strong> {result.compression_ratio.toFixed(2)}x</p>
          </div>
        </div>
      )}

      <p style={{ marginTop: '20px' }}>
        Enter a DNA sequence and select a compression method to compress it using the backend API.
      </p>
    </div>
  );
};

export default DataCompression;