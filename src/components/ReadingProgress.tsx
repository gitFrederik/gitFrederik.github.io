"use client";

import { useEffect, useRef } from "react";

/**
 * Thin coral progress bar fixed to the top of the viewport.
 * Fills as the document scrolls; uses requestAnimationFrame to avoid jank.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    let pending = false;

    function update() {
      pending = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
    }

    function onScroll() {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={barRef} className="reading-progress__bar" />
    </div>
  );
}
