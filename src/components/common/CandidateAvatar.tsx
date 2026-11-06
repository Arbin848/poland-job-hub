import React, { useState } from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface Props {
  photoUrl?: string;
  name: string;
  size?: number; // in pixels (e.g. 96, 112, 128)
  shape?: 'circle' | 'rounded-xl' | 'square';
  verified?: boolean;
  verifiedLabel?: string;
  accentColor?: string;
  className?: string;
}

export const CandidateAvatar: React.FC<Props> = ({
  photoUrl,
  name,
  size = 96,
  shape = 'circle',
  verified = false,
  verifiedLabel,
  accentColor = '#1e3a8a',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  const initials = (name || 'CV')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const shapeClass = {
    circle: 'rounded-full',
    'rounded-xl': 'rounded-xl',
    square: 'rounded-none'
  }[shape];

  const showImage = Boolean(photoUrl && !hasError);

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        style={{ width: size, height: size }}
        className={`overflow-hidden border-2 border-white/80 shadow-sm bg-slate-100 flex items-center justify-center ${shapeClass}`}
      >
        {showImage ? (
          <img
            src={photoUrl}
            alt={name ? `${name} – zdjęcie` : 'Kandydat – zdjęcie'}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center text-white font-bold select-none"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #0f172a 100%)`
            }}
          >
            <span
              style={{ fontSize: Math.max(12, Math.round(size * 0.36)) }}
              className="tracking-wider drop-shadow-xs"
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      {verified && (
        <span
          className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs border-2 border-white flex items-center justify-center"
          title={verifiedLabel || 'Profil Kandydata'}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  );
};
