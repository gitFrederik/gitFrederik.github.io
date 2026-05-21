"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; label: string };

/**
 * Sticky table of contents with scroll-spy.
 * Renders a numbered list of section headings on the right rail (desktop).
 * Hidden on mobile (essay flows top to bottom; numbered headings are enough).
 */
export function Toc({ items }: { items: Heading[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);

    if (nodes.length === 0) return;

    // Track which heading is most visible. We pick the one closest to top
    // (but past it), so as you scroll past a heading, it lights up.
    const io = new IntersectionObserver(
      (entries) => {
        // Find the topmost heading that is currently above or at 30% of viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [items]);

  return (
    <aside className="toc" aria-label="Table of contents">
      <div className="toc__label">Contents</div>
      <ol className="toc__list">
        {items.map((h, i) => (
          <li key={h.id} className={`toc__item ${active === h.id ? "is-active" : ""}`}>
            <a href={`#${h.id}`}>
              <span className="toc__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="toc__text">{h.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
