"use client";

import { useEffect, useState } from "react";

const SEQ = ["w", "h", "o", "a", "m", "i"];

export function Konami() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      buf.push(k);
      if (buf.length > SEQ.length) buf = buf.slice(-SEQ.length);
      if (buf.join("") === SEQ.join("")) {
        setShown(true);
        buf = [];
        setTimeout(() => setShown(false), 4200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!shown) return null;
  return (
    <div className="konami" role="status" aria-live="polite">
      <span className="konami__prompt">→</span>
      <span className="konami__cmd">whoami</span>
      <span className="konami__out">frederik · msc cs · tum · munich · open for &apos;27 + &apos;28</span>
    </div>
  );
}
