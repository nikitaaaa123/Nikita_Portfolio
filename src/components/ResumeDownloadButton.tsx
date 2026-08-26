import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface ResumeDownloadButtonProps {
  initialType?: 'aiml' | 'ece' | 'embedded';
  showSelect?: boolean;
  className?: string;
  variant?: 'default' | 'navbar' | 'inline';
}

export default function ResumeDownloadButton({
  initialType = 'aiml',
  showSelect = true,
  className = '',
  variant = 'default',
}: ResumeDownloadButtonProps) {
  const [selected, setSelected] = useState<'aiml' | 'ece'>(
    initialType === 'embedded' || initialType === 'ece' ? 'ece' : 'aiml'
  );

  const handleDownload = () => {
    // Create an invisible HTML anchor tag
    const link = document.createElement('a');
    
    // Set the path to match the exact files in the public folder
    if (selected === 'aiml') {
      link.href = '/Nikita_Bhansali_Resume.pdf';
      link.download = 'Nikita_Bhansali_Resume.pdf';
    } else {
      link.href = '/Nikita_Bhansali_Resume_Embedded_RF.pdf';
      link.download = 'Nikita_Bhansali_Resume_Embedded_RF.pdf';
    }
    
    // Append to body, click to trigger download, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!showSelect) {
    return (
      <button
        id="direct-resume-download-btn"
        onClick={handleDownload}
        className={`px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm cursor-pointer ${className}`}
        title={`Download ${selected === 'aiml' ? 'AI/ML' : 'ECE'} Resume PDF`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download Resume</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <select
          id="resume-type-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value as 'aiml' | 'ece')}
          className="px-2.5 py-1.5 pr-7 text-xs font-mono rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
        >
          <option value="aiml">AI/ML Resume</option>
          <option value="ece">ECE Resume</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <button
        id="resume-download-trigger-btn"
        onClick={handleDownload}
        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm cursor-pointer"
        title="Download official PDF copy"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download PDF</span>
      </button>
    </div>
  );
}

export { ResumeDownloadButton };
