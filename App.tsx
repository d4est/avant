import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SwapCard } from './components/SwapCard';
import { TokenModal } from './components/TokenModal';
import { Token, TokenType } from './types';
import { TOKENS } from './constants';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<'pay' | 'receive'>('pay');
  
  const [payToken, setPayToken] = useState<Token>(TOKENS[0]); // ETH
  const [receiveToken, setReceiveToken] = useState<Token>(TOKENS[1]); // USDC
  
  const [payAmount, setPayAmount] = useState<string>('1.5');
  const [receiveAmount, setReceiveAmount] = useState<string>('');

  // Mock exchange rate logic
  useEffect(() => {
    if (!payAmount || isNaN(parseFloat(payAmount))) {
      setReceiveAmount('');
      return;
    }

    const rate = getRate(payToken.symbol, receiveToken.symbol);
    const calculated = (parseFloat(payAmount) * rate).toFixed(2);
    setReceiveAmount(calculated);
  }, [payAmount, payToken, receiveToken]);

  const getRate = (from: string, to: string): number => {
    // Simple mock rates relative to USD
    const rates: Record<string, number> = {
      ETH: 2450.12,
      USDC: 1.0,
      USDT: 1.0,
      WBTC: 42000.0,
      DAI: 1.0,
    };
    
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    
    return fromRate / toRate;
  };

  const handleOpenModal = (side: 'pay' | 'receive') => {
    setActiveSide(side);
    setIsModalOpen(true);
  };

  const handleTokenSelect = (token: Token) => {
    if (activeSide === 'pay') {
      if (token.id === receiveToken.id) {
        // Swap if selecting the same token
        setReceiveToken(payToken);
      }
      setPayToken(token);
    } else {
      if (token.id === payToken.id) {
        // Swap if selecting the same token
        setPayToken(receiveToken);
      }
      setReceiveToken(token);
    }
    setIsModalOpen(false);
  };

  const handleSwapSides = () => {
    const prevPay = payToken;
    const prevReceive = receiveToken;
    const prevPayAmt = payAmount;
    
    setPayToken(prevReceive);
    setReceiveToken(prevPay);
    // Usually you might keep the input value or calculate active side. 
    // For simplicity, let's keep the 'pay' amount logic or reset.
    // Let's recalculate based on the new pay token which was the receive token
    // Actually, visually swapping usually keeps the values but recalculates
    setPayAmount(receiveAmount); 
  };

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Background />
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 relative">
        <div className="relative flex items-center justify-center w-full max-w-4xl">
          <SwapCard 
            payToken={payToken}
            receiveToken={receiveToken}
            payAmount={payAmount}
            receiveAmount={receiveAmount}
            onPayAmountChange={setPayAmount}
            onOpenTokenSelect={handleOpenModal}
            onSwapSides={handleSwapSides}
            exchangeRate={getRate(payToken.symbol, receiveToken.symbol)}
          />
        </div>
      </main>

      {isModalOpen && (
        <TokenModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSelect={handleTokenSelect}
          activeTokenId={activeSide === 'pay' ? payToken.id : receiveToken.id}
        />
      )}
      
      <Footer />
    </div>
  );
}