import React, { useState } from 'react';
import { TOKENS } from '../constants';
import { Token } from '../types';
import { TokenIcon } from './TokenIcon';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  activeTokenId?: string;
}

export const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, onSelect, activeTokenId }) => {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filteredTokens = TOKENS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-[480px] h-[580px] flex flex-col bg-[#F2F2F7] dark:bg-[#1C1C1E] shadow-soft-xl rounded-[28px] overflow-hidden font-sans border border-white/50 animate-[pulse-slow_0.5s_ease-out_1]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
          <h3 className="text-[19px] font-bold text-neutral-900 dark:text-white tracking-tight ml-1">Select a token</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer mr-1">
            <span className="material-symbols-outlined text-[20px] text-neutral-500 font-bold">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3 shrink-0">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-neutral-400 group-focus-within:text-neutral-600 transition-colors pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              className="w-full h-[46px] pl-11 pr-4 rounded-[14px] bg-white border-none shadow-sm text-[16px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 transition-all font-normal" 
              placeholder="Search name or paste address" 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 pb-2 shrink-0 flex gap-2 flex-wrap">
          {TOKENS.slice(0, 5).map(token => (
            <button 
              key={`chip-${token.id}`}
              onClick={() => onSelect(token)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white shadow-sm hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <TokenIcon token={token} size="sm" />
              <span className="text-[13px] font-semibold text-neutral-900">{token.symbol}</span>
            </button>
          ))}
        </div>

        <div className="h-px bg-black/5 mx-5 mt-2"></div>

        {/* Token List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5">
          {filteredTokens.map(token => {
            const isActive = token.id === activeTokenId;
            return (
              <div 
                key={token.id} 
                onClick={() => onSelect(token)} 
                className={`flex items-center justify-between px-4 py-3 rounded-[18px] cursor-pointer transition-colors ${isActive ? 'bg-[#E1F0F2] opacity-100' : 'hover:bg-black/5 opacity-80 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <TokenIcon token={token} size="lg" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[16px] font-semibold text-neutral-900 leading-tight">{token.name}</span>
                    <span className="text-[13px] font-normal text-neutral-500">{token.symbol}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[16px] font-normal text-neutral-900">{token.balance}</span>
                  <span className="text-[12px] text-neutral-400">{token.balanceUsd !== '-' ? `≈ $${token.balanceUsd}` : '-'}</span>
                </div>
              </div>
            );
          })}
          {filteredTokens.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-neutral-400">
               <span className="material-symbols-outlined text-[40px] mb-2">sentiment_dissatisfied</span>
               <p>No tokens found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};