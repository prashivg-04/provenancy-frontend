import React from 'react';

export default function Logo({ className = "", textClassName = "text-xl", iconSize = 36 }) {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* 
        Recreated Provenancy 'P' interlocking logo using pure SVG and CSS. 
        Highly performant, fully responsive, and natively integrates with the dark mode/light mode themes.
      */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 shadow-[inset_0_0_15px_rgba(26,35,126,0.15)] group-hover:bg-primary/20 transition-colors"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          width={iconSize * 0.55} 
          height={iconSize * 0.55} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(26,35,126,0.5)]"
        >
          {/* Outer interlocking 'P' ring */}
          <path d="M7 21V8a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-8" />
          {/* Inner concentric ring (fingerprint / chain aesthetic) */}
          <path d="M7 11.5v-1a2 2 0 0 1 2-2h4" />
        </svg>
      </div>
      
      <span className={`font-semibold tracking-[0.2em] text-foreground uppercase group-hover:text-primary transition-colors ${textClassName}`}>
        Provenancy
      </span>
    </div>
  );
}
