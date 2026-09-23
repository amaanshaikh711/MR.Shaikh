import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 150);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        const diff = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + diff);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#060608] p-8 md:p-14 text-white transition-opacity duration-500 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
        <span>AMAN SHAIKH</span>
        <span>A / S · PORTFOLIO 2026</span>
      </div>

      {/* Center Counter */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="font-display text-7xl sm:text-9xl font-extrabold tracking-tighter tabular-nums text-white">
          {progress.toString().padStart(2, '0')}%
        </div>
        <p className="mt-4 font-mono text-xs tracking-widest uppercase text-purple-400">
          INITIALIZING DIGITAL EXPERIENCE
        </p>

        {/* Minimal Progress Line */}
        <div className="mt-6 w-48 h-[1px] bg-zinc-800 overflow-hidden relative">
          <div
            className="h-full bg-purple-400 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer Metadata */}
      <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-zinc-600 border-t border-white/[0.05] pt-4">
        <span>FULL-STACK ARCHITECTURE & APPLIED AI</span>
        <span className="mt-1 sm:mt-0">MUMBAI, INDIA</span>
      </div>
    </div>
  );
};

export default Preloader;
