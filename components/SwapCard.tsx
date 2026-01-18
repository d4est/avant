import React from 'react';
import { Token } from '../types';
import { TokenIcon } from './TokenIcon';

interface SwapCardProps {
  payToken: Token;
  receiveToken: Token;
  payAmount: string;
  receiveAmount: string;
  onPayAmountChange: (value: string) => void;
  onOpenTokenSelect: (side: 'pay' | 'receive') => void;
  onSwapSides: () => void;
  exchangeRate: number;
}

export const SwapCard: React.FC<SwapCardProps> = ({
  payToken,
  receiveToken,
  payAmount,
  receiveAmount,
  onPayAmountChange,
  onOpenTokenSelect,
  onSwapSides,
  exchangeRate
}) => {
  
  const estimatedUsdPay = payAmount ? (parseFloat(payAmount) * 2450.12).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00';
  const estimatedUsdReceive = receiveAmount ? (parseFloat(receiveAmount) * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00';

  return (
    <div className="relative z-30 w-full max-w-[520px] bg-glass-surface dark:bg-neutral-900/80 glass-panel border border-white/50 dark:border-white/10 shadow-monolith rounded-squircle overflow-hidden transition-all duration-500">
      <div className="absolute inset-0 rounded-squircle bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-50"></div>
      <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="relative px-2 py-2">
        {/* Header within Card */}
        <div className="flex justify-between items-center px-6 pt-6 pb-2">
          <h2 className="text-sm font-bold text-neutral-400 tracking-widest uppercase">Swap</h2>
          <div className="relative group/history">
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-300 hover:text-neutral-500 hover:bg-black/5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div className="absolute right-0 top-full mt-2 w-max px-3 py-1.5 bg-neutral-900 text-white text-[10px] font-medium rounded-lg shadow-xl opacity-0 invisible group-hover/history:opacity-100 group-hover/history:visible transition-all duration-200 z-50">
              Transaction History
            </div>
          </div>
        </div>

        {/* Pay Section */}
        <div className="relative group/pay p-6 pb-4 transition-all duration-300 hover:bg-white/30 rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">You Pay</label>
            <div className="px-2 py-0.5 rounded-full bg-neutral-100/50 border border-neutral-200/50 text-[10px] font-medium text-neutral-500">
              Balance: {payToken.balance} {payToken.symbol}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input 
              className="w-full bg-transparent border-none p-0 text-5xl sm:text-6xl font-light text-neutral-900 placeholder-neutral-300 focus:ring-0 leading-none tracking-tight transition-all duration-300 focus:scale-[1.02] origin-left font-display" 
              placeholder="0" 
              type="number" 
              value={payAmount}
              onChange={(e) => onPayAmountChange(e.target.value)}
            />
            <button 
              onClick={() => onOpenTokenSelect('pay')}
              className="shrink-0 flex items-center gap-2 pl-3 pr-4 py-2 bg-white/40 hover:bg-white/80 border border-white/60 shadow-sm rounded-2xl backdrop-blur-md transition-all duration-200 hover:shadow-md group/token self-center"
            >
              <TokenIcon token={payToken} />
              <span className="text-lg font-bold text-neutral-800">{payToken.symbol}</span>
              <span className="material-symbols-outlined text-neutral-500 text-[20px] group-hover/token:rotate-180 transition-transform">expand_more</span>
            </button>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500 tracking-tight">≈ {estimatedUsdPay}</span>
          </div>
        </div>

        {/* Swap Orb Divider */}
        <div className="relative h-[2px] z-30 flex justify-center items-center my-2">
          <div className="absolute inset-x-6 h-[1px] bg-gradient-to-r from-neutral-200/30 via-neutral-200 to-neutral-200/30"></div>
          <div className="absolute group/orb cursor-pointer" onClick={onSwapSides}>
            <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-neutral-800 border border-white shadow-orb backdrop-blur-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(82,224,224,0.6)]">
              <span className="material-symbols-outlined text-primary text-[28px] transition-transform duration-700 group-hover/orb:rotate-[180deg]">sync_alt</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/30 scale-100 opacity-0 group-hover/orb:scale-150 group-hover/orb:opacity-100 transition-all duration-700"></div>
          </div>
        </div>

        {/* Receive Section */}
        <div className="relative group/receive p-6 pt-4 rounded-b-3xl transition-all duration-300 hover:bg-white/30 rounded-t-3xl">
          <div className="flex justify-between items-start mb-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">You Receive</label>
            <div className="px-2 py-0.5 rounded-full bg-neutral-100/50 border border-neutral-200/50 text-[10px] font-medium text-neutral-500">
              Balance: {receiveToken.balance} {receiveToken.symbol}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input 
              className="w-full bg-transparent border-none p-0 text-5xl sm:text-6xl font-light text-neutral-400 focus:ring-0 leading-none tracking-tight cursor-default font-display" 
              placeholder="0" 
              readOnly 
              type="text" // Using text to handle formatted numbers if needed, but number is cleaner for raw
              value={receiveAmount}
            />
            <button 
              onClick={() => onOpenTokenSelect('receive')}
              className="shrink-0 flex items-center gap-2 pl-3 pr-4 py-2 bg-white/40 hover:bg-white/80 border border-white/60 shadow-sm rounded-2xl backdrop-blur-md transition-all duration-200 hover:shadow-md group/token self-center"
            >
              <TokenIcon token={receiveToken} />
              <span className="text-lg font-bold text-neutral-800">{receiveToken.symbol}</span>
              <span className="material-symbols-outlined text-neutral-500 text-[20px] group-hover/token:rotate-180 transition-transform">expand_more</span>
            </button>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500 tracking-tight">≈ {estimatedUsdReceive}</span>
            <span className="text-sm font-medium text-emerald-500 tracking-tight">(-0.02%)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-6 pt-2 pb-4">
          <button className="relative w-full overflow-hidden h-14 rounded-2xl bg-neutral-900 text-white font-bold text-lg tracking-wide shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 group-hover:via-neutral-700 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              Review Swap
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </button>
        </div>

        {/* Details Divider */}
        <div className="relative w-full h-px px-6 opacity-80">
          <div className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-accent-prism/50 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
        </div>

        {/* Swap Details */}
        <div className="px-8 pb-8 pt-6">
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">Exchange Rate</span>
                <div className="relative h-4 w-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                    <circle className="text-neutral-200" cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-progress-cyan animate-progress-ring" cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeDasharray="62.83" strokeDashoffset="20" strokeLinecap="round" strokeWidth="3"></circle>
                  </svg>
                </div>
              </div>
              <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">1 {payToken.symbol} = {exchangeRate.toFixed(4)} {receiveToken.symbol}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">Price Impact</span>
              <span className="font-mono text-xs font-bold text-emerald-600 tracking-tight">~0.05%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">Slippage</span>
              <div className="flex items-center gap-1 group/edit cursor-pointer">
                <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">Auto (0.5%)</span>
                <span className="material-symbols-outlined text-[10px] text-neutral-400 group-hover/edit:text-primary transition-colors">edit</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">Network Fee</span>
              </div>
              <span className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">$4.20 <span className="text-neutral-400 font-normal">(14 Gwei)</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};