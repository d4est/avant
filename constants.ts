import { Token } from './types';

export const TOKENS: Token[] = [
  { 
    id: 'eth', 
    symbol: 'ETH', 
    name: 'Ethereum', 
    balance: '4.204', 
    balanceUsd: '15,420', 
    color: 'bg-neutral-900', 
    iconType: 'icon',
    iconValue: 'token' 
  },
  { 
    id: 'usdc', 
    symbol: 'USDC', 
    name: 'USD Coin', 
    balance: '2,850.42', 
    balanceUsd: '2,850', 
    color: 'bg-[#2775CA]', 
    iconType: 'text',
    iconValue: 'U' 
  },
  { 
    id: 'usdt', 
    symbol: 'USDT', 
    name: 'Tether', 
    balance: '0', 
    balanceUsd: '-', 
    color: 'bg-[#26A17B]', 
    iconType: 'text',
    iconValue: 'T',
    opacity: true 
  },
  { 
    id: 'wbtc', 
    symbol: 'WBTC', 
    name: 'Wrapped BTC', 
    balance: '0.15', 
    balanceUsd: '6,300', 
    color: 'bg-[#F09242]', 
    iconType: 'text',
    iconValue: 'B',
    opacity: true 
  },
  { 
    id: 'dai', 
    symbol: 'DAI', 
    name: 'Dai Stablecoin', 
    balance: '0', 
    balanceUsd: '-', 
    color: 'bg-[#F5AC37]', 
    iconType: 'text',
    iconValue: 'D',
    opacity: true 
  },
];