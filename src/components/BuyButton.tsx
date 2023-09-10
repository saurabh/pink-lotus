import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface BuyButtonProps {
  buy?: (() => void) | null;
  buyTxLoading: boolean;
  buyTxError: boolean;
  buyTxStatus: string;
  buyStatus: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ buy, buyTxLoading, buyTxError, buyStatus, buyTxStatus}) => {
  return (
    <button 
      onClick={() => buy?.()} 
      className="bg-pink border-2 border-deeppink text-black rounded-md w-full p-4 text-xl flex items-center justify-center h-[65px]"
      disabled={buyStatus === 'loading'}
    >
      <AnimatePresence mode="wait">
        {buyStatus === 'idle' && <motion.span key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Buy</motion.span>}
        {(buyStatus === 'loading' || buyTxLoading)  && (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
            <div className="spinner"></div>
            {/* <span className="opacity-0">Buy</span> */}
          </motion.span>
        )}
        {buyTxStatus === 'success' && <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>✔️</motion.span>}
      </AnimatePresence>
    </button>
  );
};

export default BuyButton;
// {success && <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>✔️</motion.span>}