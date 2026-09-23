import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktops/laptops with mouse/trackpad)
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    // Replace native desktop cursor globally
    document.documentElement.classList.add('custom-cursor-active');

    // Position coordinates
    const mouse = { x: -200, y: -200 };
    const dot = { x: -200, y: -200 };
    const circle = { x: -200, y: -200 };

    // State refs for 60-144fps rendering without React re-renders
    let isVisible = false;
    let hasMoved = false;
    let isClicking = false;
    let cursorState: 'default' | 'hover' | 'project' | 'text' = 'default';

    // Radius tracking
    let targetRadius = 19; // Half of 38px
    let currentRadius = 19;
    const dotRadius = 3; // Half of 6px
    const margin = 2.5; // Visual padding inside circle

    let rafId: number | null = null;

    const updateClasses = () => {
      const circleEl = circleRef.current;
      const labelEl = labelRef.current;
      if (!circleEl) return;

      // Reset dynamic size & color styles
      if (cursorState === 'project') {
        targetRadius = 38; // 76px diameter
        circleEl.style.width = '76px';
        circleEl.style.height = '76px';
        circleEl.style.borderRadius = '9999px';
        circleEl.style.borderColor = 'rgba(216, 180, 254, 0.9)'; // purple-300
        circleEl.style.backgroundColor = 'rgba(168, 85, 247, 0.28)';
        circleEl.style.boxShadow = '0 0 28px rgba(168, 85, 247, 0.45)';
        circleEl.style.backdropFilter = 'blur(4px)';
        if (labelEl) {
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'scale(1)';
        }
      } else if (cursorState === 'hover') {
        targetRadius = 27; // 54px diameter
        circleEl.style.width = '54px';
        circleEl.style.height = '54px';
        circleEl.style.borderRadius = '9999px';
        circleEl.style.borderColor = 'rgba(192, 132, 252, 0.85)'; // purple-400
        circleEl.style.backgroundColor = 'rgba(168, 85, 247, 0.18)';
        circleEl.style.boxShadow = '0 0 22px rgba(168, 85, 247, 0.35)';
        circleEl.style.backdropFilter = 'blur(2px)';
        if (labelEl) {
          labelEl.style.opacity = '0';
          labelEl.style.transform = 'scale(0.7)';
        }
      } else if (cursorState === 'text') {
        targetRadius = 15;
        circleEl.style.width = '24px';
        circleEl.style.height = '34px';
        circleEl.style.borderRadius = '12px';
        circleEl.style.borderColor = 'rgba(192, 132, 252, 0.7)';
        circleEl.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
        circleEl.style.boxShadow = '0 0 14px rgba(168, 85, 247, 0.2)';
        circleEl.style.backdropFilter = 'blur(1px)';
        if (labelEl) {
          labelEl.style.opacity = '0';
          labelEl.style.transform = 'scale(0.7)';
        }
      } else {
        targetRadius = 19; // 38px diameter
        circleEl.style.width = '38px';
        circleEl.style.height = '38px';
        circleEl.style.borderRadius = '9999px';
        circleEl.style.borderColor = 'rgba(192, 132, 252, 0.55)';
        circleEl.style.backgroundColor = 'rgba(168, 85, 247, 0.06)';
        circleEl.style.boxShadow = '0 0 14px rgba(168, 85, 247, 0.18)';
        circleEl.style.backdropFilter = 'blur(1.5px)';
        if (labelEl) {
          labelEl.style.opacity = '0';
          labelEl.style.transform = 'scale(0.7)';
        }
      }
    };

    const updateVisibility = (visible: boolean) => {
      isVisible = visible;
      const opacity = visible ? '1' : '0';
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (circleRef.current) circleRef.current.style.opacity = opacity;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        dot.x = e.clientX;
        dot.y = e.clientY;
        circle.x = e.clientX;
        circle.y = e.clientY;
      }

      if (!isVisible) {
        updateVisibility(true);
      }

      // Check current hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isProject = !!target.closest('[data-cursor="project"]');
      const isTextInput = !!target.closest('input, textarea, [contenteditable="true"]');
      const isClickable =
        !isProject &&
        !isTextInput &&
        !!(
          target.closest('a, button, [role="button"], select, label, summary, .cursor-pointer') ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON'
        );

      let newState: 'default' | 'hover' | 'project' | 'text' = 'default';
      if (isProject) {
        newState = 'project';
      } else if (isTextInput) {
        newState = 'text';
      } else if (isClickable) {
        newState = 'hover';
      }

      if (newState !== cursorState) {
        cursorState = newState;
        updateClasses();
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      updateVisibility(false);
    };

    const handleMouseEnter = () => {
      updateVisibility(true);
    };

    const handleWindowBlur = () => {
      updateVisibility(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);

    // Initial styling
    updateClasses();
    updateVisibility(false);

    // High performance 120Hz/144Hz physics animation loop
    const loop = () => {
      if (hasMoved) {
        // 1. Dot tracks mouse instantly for 0ms pointing and clicking precision
        dot.x = mouse.x;
        dot.y = mouse.y;

        // 2. Interpolate current boundary radius smoothly
        currentRadius += (targetRadius - currentRadius) * 0.2;

        // 3. Circle smoothly glides towards the dot with organic fluid inertia
        const lerpFactor = 0.22;
        circle.x += (dot.x - circle.x) * lerpFactor;
        circle.y += (dot.y - circle.y) * lerpFactor;

        // 4. STRICT LEASH CONSTRAINT: Dot physically CAN NEVER escape the circle perimeter!
        // Calculate vector distance from circle center to dot center
        const dx = dot.x - circle.x;
        const dy = dot.y - circle.y;
        const distance = Math.hypot(dx, dy);

        // Max allowable distance from circle center to keep the dot completely inside
        const maxAllowedDistance = Math.max(2, currentRadius - dotRadius - margin);

        if (distance > maxAllowedDistance && distance > 0.0001) {
          // Clamp circle along the angle vector so distance never exceeds maxAllowedDistance
          const angle = Math.atan2(dy, dx);
          circle.x = dot.x - Math.cos(angle) * maxAllowedDistance;
          circle.y = dot.y - Math.sin(angle) * maxAllowedDistance;
        }

        // 5. Apply hardware-accelerated 3D transforms directly to DOM (0 React re-renders)
        const circleScale = isClicking ? 0.82 : 1;
        const dotScale = isClicking ? 1.25 : 1;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        }
        if (circleRef.current) {
          circleRef.current.style.transform = `translate3d(${circle.x}px, ${circle.y}px, 0) translate(-50%, -50%) scale(${circleScale})`;
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* High-Precision Inner Dot Pointer (Zero Lag, Hardware-Accelerated) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-1.5 w-1.5 rounded-full bg-white opacity-0 shadow-[0_0_8px_rgba(255,255,255,1),0_0_16px_rgba(168,85,247,0.7)] will-change-transform"
        style={{
          transition: 'opacity 0.2s ease-out',
        }}
      />

      {/* Trailing Physical Ring with Strict Leash Containment & Liquid Transitions */}
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] flex items-center justify-center rounded-full border border-purple-400/60 opacity-0 will-change-transform"
        style={{
          transition:
            'width 0.26s cubic-bezier(0.16, 1, 0.3, 1), height 0.26s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.25s ease, opacity 0.22s ease',
        }}
      >
        <span
          ref={labelRef}
          className="select-none font-mono text-[9px] font-extrabold uppercase tracking-[0.24em] text-white drop-shadow-sm opacity-0 pointer-events-none"
          style={{
            transition: 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'scale(0.7)',
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
