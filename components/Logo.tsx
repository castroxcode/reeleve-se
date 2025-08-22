
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
        <svg width="48" height="48" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C35 10 25 20 25 35C25 45 35 50 50 50C65 50 75 60 75 75C75 85 65 90 50 90C35 90 25 80 25 65C25 55 35 50 50 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M90 50C90 65 80 75 65 75C55 75 50 65 50 50C50 35 40 25 25 25C15 25 10 35 10 50C10 65 20 75 35 75C45 75 50 65 50 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      <span className="font-serif text-4xl">Reeleve</span>
    </div>
  );
};
