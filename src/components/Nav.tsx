"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Spike } from "./Spike";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Academic path", href: "/academic" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Extracurriculars", href: "/extracurriculars" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Esc, outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  return (
    <header className="nav" role="banner">
      <div className="nav__inner">
        <div className="nav__left">
          <Link href="/" className="wordmark" aria-label="Frederik Willemsen, home">
            <span className="wordmark__spike"><Spike /></span>
            <span>Frederik Willemsen</span>
          </Link>
          <nav className="nav__menu" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav__link"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="nav__right">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className={`nav__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="nav-mobile-menu"
        className={`nav__mobile ${menuOpen ? "is-open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <nav className="nav__mobile-list" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav__mobile-link"
                aria-current={active ? "page" : undefined}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
