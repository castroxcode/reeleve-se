
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-serif text-4xl">Reeleve</span>
    </div>
  );
};
