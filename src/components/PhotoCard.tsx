"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type PhotoCardProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function PhotoCard({ src, alt, width, height, caption }: PhotoCardProps) {
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? true;
    if (!isFinePointer) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // small max tilt: ±6deg
      tx = ((e.clientY - cy) / r.height) * -6;
      ty = ((e.clientX - cx) / r.width)  *  8;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--rx", `${x.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${y.toFixed(2)}deg`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="photo-stage">
      <div className="photo-stage__accent" aria-hidden="true" />
      <div ref={wrap} className="photo-card">
        <div className="photo-card__inner">
          <div className="photo-card__frame">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority
              sizes="(max-width: 900px) 80vw, 480px"
              className="photo-card__img"
            />
            <div className="photo-card__grain" aria-hidden="true" />
          </div>
          {caption && (
            <div className="photo-card__caption">
              <span className="dot" />
              <span>{caption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
