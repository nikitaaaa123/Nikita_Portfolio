import React, { useState, useEffect } from 'react';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ 
  className = '', 
  size = 'lg',
  showBadge = true
}) => {
  const [imgError, setImgError] = useState(false);
  const [photoSrc, setPhotoSrc] = useState<string>('/profesional_face_pic-removebg-preview.png');

  useEffect(() => {
    const saved = localStorage.getItem('nikita_portfolio_photo');
    if (saved) {
      setPhotoSrc(saved);
      setImgError(false);
    }
  }, []);

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36'
  };

  const ringSizes = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-1.5',
    xl: 'p-2'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Styled Gradient Border Frame */}
      <div className={`rounded-full bg-gradient-to-tr from-blue-500 via-violet-500 to-emerald-400 ${ringSizes[size]} shadow-md`}>
        <div className={`rounded-full overflow-hidden bg-slate-900 flex items-center justify-center ${sizeClasses[size]} relative`}>
          {!imgError ? (
            <img
              src={photoSrc}
              alt="Nikita Bhansali"
              referrerPolicy="no-referrer"
              onError={() => {
                if (photoSrc === '/profesional_face_pic-removebg-preview.png') {
                  setPhotoSrc('/profile.png');
                } else {
                  setImgError(true);
                }
              }}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white font-mono">
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                NB
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      {showBadge && (
        <span 
          className="absolute bottom-0 right-0 flex h-3 w-3"
          title="Active & Available"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
        </span>
      )}
    </div>
  );
};
