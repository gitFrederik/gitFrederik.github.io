"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const wrap = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? true;
    if (!isFinePointer) return;

    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      inner.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={wrap} className={`magnetic ${className ?? ""}`} data-magnetic="">
      <span className="magnetic__inner">{children}</span>
    </span>
  );
}
