"use client";

import { useEffect, useRef } from "react";

export function CursorHalo() {
  const haloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? true;
    if (!isFinePointer) {
      halo.style.display = "none";
      return;
    }

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    let revealed = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!revealed) {
        halo.classList.add("is-active");
        revealed = true;
      }
      const target = e.target as HTMLElement | null;
      const hot = target?.closest("a, button, [data-magnetic], .preview-card, .channel, .photo-card");
      halo.classList.toggle("is-hot", !!hot);
    };
    const onLeave = () => halo.classList.remove("is-active");

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      // Centering happens via CSS (translate(-50%, -50%)); JS only positions.
      halo.style.left = `${x.toFixed(2)}px`;
      halo.style.top = `${y.toFixed(2)}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={haloRef} className="cursor-halo" aria-hidden="true" />;
}
