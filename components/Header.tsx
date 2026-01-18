import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full px-8 py-6 flex justify-between items-center z-50">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">AvantSwap</span>
      </div>
      <button className="relative overflow-hidden group rounded-xl bg-white/50 hover:bg-white/80 border border-white/60 px-6 py-2.5 transition-all duration-300 shadow-sm backdrop-blur-sm">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        <span className="relative text-sm font-bold text-neutral-800 tracking-wide">Connect Wallet</span>
      </button>
    </header>
  );
};