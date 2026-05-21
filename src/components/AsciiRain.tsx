"use client";

import { useEffect, useRef } from "react";

const TOKENS = [
  "claude", "anthropic", "tum", "munich", "agent", "rag", "mcp",
  "thesis", "build", "train", "infer", "tokenize", "embed",
  "gradient", "ascent", "descent", "vector", "tensor", "model",
  "research", "consider", "transform", "attention", "layer",
  "▌", "▍", "▎", "│", "·", "→", "·", "·",
  "0x4a3", "0xff", "λ", "Σ", "∇", "∂", "≈",
  "def", "fn", "let", "const", "return", "yield",
  "make", "ship", "iterate", "review", "diff",
  "Frederik", "MSc", "CS", "C++", "Py",
];

type Column = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  chars: string[];
  coralIdx: number;
  cursorIdx: number;
  nextSwap: number;
};

export function AsciiRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const fontSize = 14;
    const lineHeight = fontSize * 1.55;
    let cols: Column[] = [];

    const buildChars = () => {
      const n = 10 + Math.floor(Math.random() * 9);
      const out: string[] = [];
      for (let i = 0; i < n; i++) out.push(TOKENS[Math.floor(Math.random() * TOKENS.length)]);
      return out;
    };

    const makeColumn = (i: number, total: number): Column => {
      const baseX = (w / total) * i + (w / total) * 0.5;
      const jitter = (Math.random() - 0.5) * (w / total) * 0.6;
      return {
        x: baseX + jitter,
        y: Math.random() * h,
        speed: 14 + Math.random() * 22,
        opacity: 0.05 + Math.random() * 0.12,
        chars: buildChars(),
        coralIdx: Math.random() < 0.25 ? Math.floor(Math.random() * 8) : -1,
        cursorIdx: Math.floor(Math.random() * 6) + 2,
        nextSwap: 0,
      };
    };

    const seedColumns = () => {
      const colCount = Math.max(6, Math.floor(w / 110));
      cols = [];
      for (let i = 0; i < colCount; i++) cols.push(makeColumn(i, colCount));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedColumns();
    };

    let last = performance.now();
    let rafId = 0;
    let running = true;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      const cs = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      void cs; // intentionally unused but keeps theme-reactive

      ctx.clearRect(0, 0, w, h);
      ctx.font = `400 ${fontSize}px var(--font-mono), "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (const c of cols) {
        c.y += c.speed * dt;
        const totalHeight = c.chars.length * lineHeight + 240;
        if (c.y > h + 80) {
          c.y = -totalHeight;
          c.chars = buildChars();
          c.opacity = 0.05 + Math.random() * 0.12;
          c.coralIdx = Math.random() < 0.25 ? Math.floor(Math.random() * 8) : -1;
        }

        c.nextSwap -= dt;
        if (c.nextSwap <= 0) {
          c.chars[Math.floor(Math.random() * c.chars.length)] = TOKENS[Math.floor(Math.random() * TOKENS.length)];
          c.nextSwap = 0.4 + Math.random() * 1.2;
        }

        for (let i = 0; i < c.chars.length; i++) {
          const cy = c.y + i * lineHeight;
          if (cy < -lineHeight || cy > h + lineHeight) continue;
          const tailT = i / c.chars.length;
          const alpha = c.opacity * (1 - tailT * 0.85);
          let color = isDark
            ? `rgba(244, 241, 234, ${alpha})`
            : `rgba(20, 20, 19, ${alpha})`;
          if (i === c.coralIdx) {
            color = `rgba(204, 120, 92, ${Math.min(0.55, alpha * 3.2)})`;
          }
          if (i === 0) {
            color = isDark
              ? `rgba(244, 241, 234, ${Math.min(0.45, alpha * 2)})`
              : `rgba(20, 20, 19, ${Math.min(0.4, alpha * 2)})`;
          }
          ctx.fillStyle = color;
          ctx.fillText(c.chars[i], c.x, cy);
        }
      }

      if (running) rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    start();

    const onResize = () => resize();
    const onVis = () => (document.hidden ? stop() : start());
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      stop();
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
