/**
 * DotField — animated dot-grid background for middle portfolio sections.
 * v2 — stable RAF architecture (no flicker).
 *
 *  - drawRef pattern: the RAF tick always calls the latest draw() via a ref,
 *    eliminating stale-closure issues when props change.
 *  - The RAF loop runs continuously once started; IntersectionObserver only
 *    controls a `visible` flag — no loop restarts that could cause flicker.
 *  - clearRect uses plain CSS-space coords (W, H) since the context is
 *    already scaled by dpr.
 */

import React, { useEffect, useRef } from "react";

interface DotFieldProps {
  accentColor?: string;
  baseColor?: string;
  dotRadius?: number;
  gap?: number;
  speed?: number;
  baseOpacity?: number;
  peakOpacity?: number;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  x: number;
  y: number;
  phase: number;
  offsetX: number;
  offsetY: number;
  hoverIntensity: number;
}

const DotField: React.FC<DotFieldProps> = ({
  accentColor = "#C179FE",
  baseColor,
  dotRadius = 1.5,
  gap = 36,
  speed = 0.4,
  baseOpacity = 0.14,
  peakOpacity = 0.75,
  lightMode = false,
  className = "",
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef   = useRef<Dot[]>([]);
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  // Keep latest props accessible inside the RAF tick without recreating the loop
  const propsRef = useRef({ accentColor, baseColor, dotRadius, gap, speed, baseOpacity, peakOpacity, lightMode });
  useEffect(() => {
    propsRef.current = { accentColor, baseColor, dotRadius, gap, speed, baseOpacity, peakOpacity, lightMode };
  });

  // ── helpers ────────────────────────────────────────────────────────────────

  function hexToRgb(hex: string): [number, number, number] {
    const c = hex.replace("#", "");
    const n = parseInt(c, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function parseColor(color: string): [number, number, number] {
    if (color.startsWith("#")) return hexToRgb(color);
    const m = color.match(/[\d.]+/g);
    if (m && m.length >= 3) return [+m[0], +m[1], +m[2]];
    return [255, 255, 255];
  }

  // ── build grid ─────────────────────────────────────────────────────────────

  function buildGrid(w: number, h: number, g: number) {
    const dots: Dot[] = [];
    const cols = Math.ceil(w / g) + 2;
    const rows = Math.ceil(h / g) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Deterministic pseudo-random phase based on grid coordinates so resizing never shifts dot phases
        const phase = (((c * 37 + r * 59) % 1000) / 1000) * Math.PI * 2;
        dots.push({ x: c * g, y: r * g, phase, offsetX: 0, offsetY: 0, hoverIntensity: 0 });
      }
    }
    dotsRef.current = dots;
  }

  // ── mount ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastW = 0;
    let lastH = 0;
    
    // Check if the device has a fine pointer (mouse)
    const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const mouse = { x: -1000, y: -1000 };
    function handleMouseMove(e: MouseEvent) {
      if (isTouchDevice) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    function resize() {
      if (!canvas) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (W === lastW && H === lastH) return;
      lastW = W;
      lastH = H;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      buildGrid(W, H, propsRef.current.gap);
    }

    resize();

    // RAF tick — continuously runs without pausing or resetting
    function tick(ts: number) {
      rafRef.current = requestAnimationFrame(tick);

      const p = propsRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      timeRef.current += dt * p.speed;

      const t = timeRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.clearRect(0, 0, W, H);

      const resolvedBase = p.baseColor ?? (p.lightMode ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)");
      const [ar, ag, ab] = parseColor(p.accentColor);
      const [br, bg, bb] = parseColor(resolvedBase);
      const dots = dotsRef.current;

      const maxHoverDist = 260; // cursorRadius
      const bulgeStrength = 55;
      const lerpSpeed = 10 * dt; // Smooth interpolation speed

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        
        // Target state based on mouse
        let targetOffsetX = 0;
        let targetOffsetY = 0;
        let targetHoverN = 0;

        if (!isTouchDevice) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxHoverDist && dist > 0) {
            const normalizedDist = (maxHoverDist - dist) / maxHoverDist;
            targetHoverN = normalizedDist;
            
            // Bulge: push away from cursor
            const pushForce = Math.pow(normalizedDist, 2) * bulgeStrength;
            targetOffsetX = (dx / dist) * pushForce;
            targetOffsetY = (dy / dist) * pushForce;
          }
        }

        // Lerp current values towards target
        d.offsetX += (targetOffsetX - d.offsetX) * lerpSpeed;
        d.offsetY += (targetOffsetY - d.offsetY) * lerpSpeed;
        d.hoverIntensity += (targetHoverN - d.hoverIntensity) * lerpSpeed;

        const wave  = Math.sin(d.x * 0.012 + d.y * 0.008 + t + d.phase);
        let n       = (wave + 1) / 2;
        
        // Enhance intensity based on smooth hover
        n = Math.min(1, n + d.hoverIntensity * 1.5);

        const r     = Math.round(br + (ar - br) * n);
        const g     = Math.round(bg + (ag - bg) * n);
        const b     = Math.round(bb + (ab - bb) * n);
        const alpha = p.baseOpacity + (p.peakOpacity - p.baseOpacity) * n;

        ctx.beginPath();
        // Base radius + slight bump based on smooth hover intensity
        ctx.arc(d.x + d.offsetX, d.y + d.offsetY, p.dotRadius * (1 + d.hoverIntensity * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: lightMode ? "multiply" : "screen",
        ...style,
      }}
    />
  );
};

export default DotField;
