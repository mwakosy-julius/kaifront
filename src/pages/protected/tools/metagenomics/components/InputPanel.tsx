interface InputPanelProps {
    inputMethod: 'file' | 'text';
    setInputMethod: (method: 'file' | 'text') => void;
    fastaText: string;
    setFastaText: (text: string) => void;
    setFastaFile: (file: File | null) => void;
  }
  
  const InputPanel: React.FC<InputPanelProps> = ({
    inputMethod,
    setInputMethod,
    fastaText,
    setFastaText,
    setFastaFile,
  }) => {
    return (
      <div className="frosted-glass p-6">
        <h2 className="text-2xl font-semibold mb-4">Input Metagenomic Reads</h2>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="inputMethod"
              checked={inputMethod === 'text'}
              onChange={() => setInputMethod('text')}
              className="mr-2 accent-cyan-500"
            />
            Paste FASTA
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="inputMethod"
              checked={inputMethod === 'file'}
              onChange={() => setInputMethod('file')}
              className="mr-2 accent-cyan-500"
            />
            Upload File
          </label>
        </div>
        {inputMethod === 'text' ? (
          <textarea
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={6}
            value={fastaText}
            onChange={(e) => setFastaText(e.target.value)}
            placeholder=">read1\nATGCCATGCTAGCTAGCTAGC..."
          />
        ) : (
          <input
            type="file"
            accept=".fasta,.fa"
            onChange={(e) => setFastaFile(e.target.files?.[0] || null)}
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg file:bg-cyan-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded"
          />
        )}
      </div>
    );
  };
  
  export default InputPanel;