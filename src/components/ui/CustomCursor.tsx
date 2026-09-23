import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      setDotPos({ x: e.clientX, y: e.clientY });

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      const isProject = target.closest('[data-cursor="project"]');

      if (isProject) {
        setCursorState('project');
      } else if (isClickable) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing ring loop
    let rafId: number;
    let ringX = -100;
    let ringY = -100;

    const loop = () => {
      ringX += (dotPos.x - ringX) * 0.22;
      ringY += (dotPos.y - ringY) * 0.22;
      setPos({ x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [dotPos.x, dotPos.y]);

  if (!visible) return null;

  return (
    <>
      {/* Leading Sharp Dot */}
      <div
        className="pointer-events-none fixed z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-150"
        style={{ left: `${dotPos.x}px`, top: `${dotPos.y}px` }}
      />

      {/* Trailing Physics Ring */}
      <div
        className={`pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/60 backdrop-blur-[1px] transition-all duration-200 ease-out flex items-center justify-center ${
          cursorState === 'hover'
            ? 'h-11 w-11 bg-purple-500/15 border-purple-400 scale-110'
            : cursorState === 'project'
            ? 'h-16 w-16 bg-purple-600/25 border-purple-300'
            : 'h-8 w-8 bg-transparent'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        {cursorState === 'project' && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-white uppercase">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
