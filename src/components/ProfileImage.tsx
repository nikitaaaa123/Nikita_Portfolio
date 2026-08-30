import React from 'react';

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
          <img
            src="/final_prof_pic.png"
            alt="Nikita Bhansali"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
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
