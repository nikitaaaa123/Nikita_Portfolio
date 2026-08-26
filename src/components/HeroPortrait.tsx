import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Sparkles, User, RefreshCw } from 'lucide-react';

interface HeroPortraitProps {
  isDark: boolean;
  className?: string;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ isDark, className = '' }) => {
  const [imgSrc, setImgSrc] = useState<string>('/profesional_face_pic-removebg-preview.png');
  const [hasError, setHasError] = useState<boolean>(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user previously uploaded or customized photo in localStorage
    const saved = localStorage.getItem('nikita_portfolio_photo');
    if (saved) {
      setCustomPhoto(saved);
      setHasError(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          setHasError(false);
          try {
            localStorage.setItem('nikita_portfolio_photo', result);
          } catch {
            // Storage quota exceeded fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = () => {
    // Try other standard image file names before showing fallback
    if (imgSrc === '/profesional_face_pic-removebg-preview.png') {
      setImgSrc('/profile.png');
    } else if (imgSrc === '/profile.png') {
      setImgSrc('/nikita.png');
    } else {
      setHasError(true);
    }
  };

  const activeSrc = customPhoto || imgSrc;

  return (
    <div className={`relative flex flex-col items-center justify-end w-full max-w-[420px] mx-auto lg:max-w-none ${className}`}>
      {/* Hidden file input for uploading photo */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Dynamic Ambient Background Glow matching the engineer's domain */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-opacity duration-700 ${
        isDark ? 'bg-gradient-to-tr from-blue-600/25 via-emerald-600/15 to-violet-600/25 opacity-70' : 'bg-gradient-to-tr from-blue-400/20 via-emerald-400/15 to-violet-400/20 opacity-90'
      }`} />

      {/* Main Cutout Image Container with Bottom Fade Out (like reference sample) */}
      <div className="relative w-full flex items-end justify-center">
        {!hasError ? (
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] group">
            {/* The Cutout Portrait */}
            <div className="relative overflow-hidden">
              <img
                src={activeSrc}
                alt="Nikita Bhansali - AI/ML & Embedded Systems Engineer"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-auto max-h-[480px] sm:max-h-[540px] lg:max-h-[580px] object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  // Subtle bottom mask fade to smoothly blend portrait into the page baseline
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>

            {/* Quick Upload / Adjust button overlay */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Change / Upload portrait photo"
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md ${
                isDark 
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Elegant interactive portrait card with prompt to pick the image */
          <div className={`w-full max-w-[340px] sm:max-w-[380px] h-[420px] sm:h-[480px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
            isDark 
              ? 'border-slate-800 bg-slate-900/40 hover:border-blue-500/50' 
              : 'border-slate-300 bg-slate-50/60 hover:border-blue-400'
          }`}>
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${
              isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
              <User className="w-10 h-10" />
            </div>

            <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Nikita Bhansali's Portrait
            </h3>
            <p className={`text-xs mb-4 max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Displaying photo on the right side of the hero section
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Photo (profesional_face_pic.png)</span>
            </button>
          </div>
        )}
      </div>

      {/* Cultural / Personal Signature beneath the portrait, exactly styled like reference sample ("जय जिनेन्द्र") */}
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <span className={`text-2xl sm:text-3xl font-serif font-medium tracking-wide ${
          isDark 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400' 
            : 'text-emerald-800'
        }`}>
          जय जिनेन्द्र
        </span>
        <span className={`text-[11px] font-mono tracking-wider uppercase mt-0.5 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          a jain greeting
        </span>
      </div>
    </div>
  );
};
