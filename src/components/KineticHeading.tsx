"use client";

import { useEffect, useRef } from "react";

/**
 * Splits children words into hover-animated spans.
 * Subtle cursor-drift translates the whole heading by a few px following the pointer.
 * Each word morphs italic + coral underline on hover.
 *
 * Pass plain text (or text + <br/>) as children. Each whitespace-separated word
 * gets wrapped in <span class="kw">. <br/> tags are preserved.
 */
export function KineticHeading({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? true;
    if (!isFinePointer) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = ((e.clientX - cx) / window.innerWidth) * 14;
      ty = ((e.clientY - cy) / window.innerHeight) * 8;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--kx", `${x.toFixed(2)}px`);
      el.style.setProperty("--ky", `${y.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const parts: React.ReactNode[] = [];
  const segments = children.split(/(\n)/);
  let key = 0;
  for (const segment of segments) {
    if (segment === "\n") {
      parts.push(<br key={key++} />);
      continue;
    }
    const words = segment.split(/(\s+)/);
    for (const w of words) {
      if (/^\s+$/.test(w)) {
        parts.push(<span key={key++}>{w}</span>);
      } else if (w.length > 0) {
        parts.push(
          <span key={key++} className="kw">
            {w}
          </span>
        );
      }
    }
  }

  return (
    <h1 ref={ref} className={`kinetic-heading ${className ?? ""}`}>
      {parts}
    </h1>
  );
}
