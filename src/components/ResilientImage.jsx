import { useState } from 'react';
import { Gem } from 'lucide-react';

export default function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Tabitha Beads & Accessories',
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1D3A] via-[#162C52] to-[#243B64] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gem className="w-8 h-8 text-[#E04819] mb-2 opacity-90" />
        <span className="text-xs font-medium tracking-wide text-slate-200 max-w-[20ch]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
