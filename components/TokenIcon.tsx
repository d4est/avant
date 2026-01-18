import React from 'react';
import { Token } from '../types';

interface TokenIconProps {
  token: Token;
  size?: 'sm' | 'md' | 'lg';
}

export const TokenIcon: React.FC<TokenIconProps> = ({ token, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-6 h-6 text-[10px]',
    lg: 'w-10 h-10 text-lg',
  };

  const iconSize = {
    sm: 'text-[14px]',
    md: 'text-[16px]',
    lg: 'text-[20px]',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full ${token.color} text-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm`}>
      {token.iconType === 'text' ? (
        <div className="w-full h-full flex items-center justify-center font-bold">
          {token.iconValue}
        </div>
      ) : (
        <span className={`material-symbols-outlined ${iconSize[size]}`}>
          {token.iconValue}
        </span>
      )}
    </div>
  );
};