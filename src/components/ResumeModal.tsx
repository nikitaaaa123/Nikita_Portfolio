import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Brain, 
  Radio, 
  FileText, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { ThemeMode } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'aiml' | 'embedded';
  theme: ThemeMode;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialType = 'aiml',
  theme,
}) => {
  const [resumeType, setResumeType] = useState<'aiml' | 'embedded'>(initialType);
  const [cacheBuster, setCacheBuster] = useState<number>(() => Date.now());
  const [loadError, setLoadError] = useState(false);

  // Sync initial type when opening and refresh timestamp to prevent browser stale cache
  React.useEffect(() => {
    if (isOpen) {
      if (initialType) {
        setResumeType(initialType);
      }
      setCacheBuster(Date.now());
      setLoadError(false);
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isAiml = resumeType === 'aiml';

  // Exact file paths pulling dynamically from the public folder with cache-busting query
  const fileName = isAiml ? 'Nikita_Bhansali_Resume.pdf' : 'Nikita_Bhansali_Resume_Embedded_RF.pdf';
  const rawFilePath = isAiml ? '/Nikita_Bhansali_Resume.pdf' : '/Nikita_Bhansali_Resume_Embedded_RF.pdf';
  const livePdfUrl = `${rawFilePath}?v=${cacheBuster}#toolbar=0&navpanes=0&scrollbar=1`;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = rawFilePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`${rawFilePath}?v=${Date.now()}`, '_blank', 'noopener,noreferrer');
  };

  const handleReloadPdf = () => {
    setCacheBuster(Date.now());
    setLoadError(false);
  };

  return (
    <div 
      id="resume-print-wrapper"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl transition-all h-[92vh] max-h-[95vh] flex flex-col overflow-hidden ${
          isDark ? 'bg-[#18122e] border-violet-900/80 text-violet-100' : 'bg-white border-violet-200 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-violet-900/40 shrink-0 bg-[#20183e] text-violet-100">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-violet-400 shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-semibold truncate">
              {isAiml ? 'AI/ML Resume' : 'Embedded / RF Resume'} — {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle Specialization */}
            <div className="flex rounded-lg p-0.5 bg-[#100b24] border border-violet-900/70 text-xs font-mono">
              <button
                onClick={() => {
                  setResumeType('aiml');
                  setCacheBuster(Date.now());
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAiml ? 'bg-violet-500 text-white font-semibold shadow-sm' : 'text-violet-300 hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI/ML Resume</span>
                <span className="sm:hidden">AI/ML</span>
              </button>
              <button
                onClick={() => {
                  setResumeType('embedded');
                  setCacheBuster(Date.now());
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isAiml ? 'bg-violet-500 text-white font-semibold shadow-sm' : 'text-violet-300 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Embedded / RF Resume</span>
                <span className="sm:hidden">Embedded</span>
              </button>
            </div>

            {/* Refresh PDF Cache */}
            <button
              onClick={handleReloadPdf}
              className="p-1.5 rounded-lg border border-violet-900/60 hover:bg-violet-950 text-violet-300 hover:text-white transition-all cursor-pointer"
              title="Reload newest PDF from public directory"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Open in New Tab */}
            <button
              id="resume-open-tab-btn"
              onClick={handleOpenInNewTab}
              className="px-3 py-1.5 rounded-lg border border-violet-900/60 hover:bg-violet-950 text-violet-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title="Open full PDF document in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">New Tab</span>
            </button>

            {/* Direct Download Button */}
            <button
              id="resume-download-btn"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white transition-all text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm shadow-violet-500/20 cursor-pointer"
              title={`Download exact ${fileName} file`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-violet-900/60 hover:bg-violet-950 text-violet-300 hover:text-white transition-all ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live PDF Viewer directly rendering the PDF from /public */}
        <div className="relative flex-1 w-full h-full bg-[#100b24]/40 overflow-hidden">
          {loadError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
              <FileText className="w-12 h-12 text-violet-400" />
              <div className="space-y-1">
                <p className="text-base font-semibold text-violet-100">Unable to preview PDF directly in browser</p>
                <p className="text-xs text-violet-300/80 max-w-md">
                  Your browser may be restricting embedded PDF rendering. You can open the live PDF directly or download it.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenInNewTab}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm shadow-violet-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Live PDF in New Tab
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-[#20183e] hover:bg-violet-950 text-violet-200 border border-violet-900/60 text-xs font-semibold rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </button>
              </div>
            </div>
          ) : (
            <iframe
              key={`${rawFilePath}-${cacheBuster}`}
              src={livePdfUrl}
              title={`Nikita Bhansali Resume (${isAiml ? 'AI/ML' : 'Embedded RF'})`}
              className="w-full h-full border-0 bg-white"
              onError={() => setLoadError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
