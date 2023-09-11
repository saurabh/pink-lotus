import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface BuyButtonProps {
  amount: string;
  buy?: (() => void) | null;
  buyTxLoading: boolean;
  buyConfigStatus: string;
  buyTxError: boolean;
  buyTxStatus: string;
  buyStatus: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ amount, buy, buyTxLoading, buyConfigStatus, buyTxError, buyStatus, buyTxStatus }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current;

      gsap.set(button, { scale: 1 });

      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    }
  }, []);
  

  useEffect(() => {
    if (buyTxStatus === 'success') {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);  // Revert back to 'Buy' after 2 seconds
      }, 2000);

      return () => clearTimeout(timer);  // Cleanup timer
    }
  }, [buyTxStatus]);

  if (buyStatus === 'loading' || buyTxLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[65px]">
        <div className="spinner"></div> 
      </div>
    );
  }
  
  return (
    <button 
      ref={buttonRef}
      onClick={() => buy?.()} 
      className={`border-2 rounded-md w-full p-4 text-xl flex items-center justify-center h-[65px] 
                  ${buyStatus === 'loading' || buyTxLoading || buyConfigStatus === 'error' ? 'bg-gray-400 text-gray-700' : 'bg-pink text-black border-deeppink'}`}
      disabled={buyStatus === 'loading' || amount === '' || buyTxLoading || buyConfigStatus === 'error'}
    >
      <AnimatePresence mode="wait">
        {(!showSuccess || buyStatus === 'idle' || buyStatus === 'error') && <motion.span key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Buy</motion.span>}
        {showSuccess && <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>✔️</motion.span>}
      </AnimatePresence>
    </button>
  );
};

export default BuyButton;
