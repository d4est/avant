import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white/60 blur-[120px] mix-blend-overlay"></div>
      <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
    </div>
  );
};