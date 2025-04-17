interface ErrorModalProps {
    error: string;
    onClose: () => void;
  }
  
  const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => (
    <div className="fixed top-4 right-4 frosted-glass p-4 text-red-400 max-w-sm animate-shake">
      <div className="flex justify-between items-center">
        <p>Error: {error}</p>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          ✕
        </button>
      </div>
    </div>
  );
  
  export default ErrorModal;