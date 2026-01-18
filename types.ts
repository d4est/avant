export type TokenType = 'crypto' | 'stable';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  balance: string;
  balanceUsd: string;
  iconType: 'icon' | 'text';
  iconValue: string; // Material symbol name or text letter
  color: string;
  opacity?: boolean;
}
