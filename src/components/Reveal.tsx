"use client";

import { useEffect, useRef, type ReactNode, type ElementType, createElement } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Reveal({ as = "div", children, className, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-40px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["reveal", className].filter(Boolean).join(" ");

  return createElement(as, { ref, id, className: cls }, children);
}
