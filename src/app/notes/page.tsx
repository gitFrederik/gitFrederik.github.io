import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notes — Frederik Willemsen",
  description: "Essays and writing by Frederik Willemsen — on AI, learning systems, and engineering.",
};

const NOTES = [
  {
    slug: "towards-adaptive-learning-systems",
    title: "Towards Adaptive Learning Systems",
    dek: "The potential of Reinforcement Learning in eLearning systems — from Duolingo bandits to blended learning.",
    date: "May 21, 2026",
    readTime: "12 min",
    tags: ["Reinforcement Learning", "eLearning", "Review"],
  },
];

export default function NotesIndexPage() {
  return (
    <>
      <header className="page-header" data-screen-label="07 Notes / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Notes</div>
              <h1>Writing.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>{NOTES.length}</strong> {NOTES.length === 1 ? "essay" : "essays"}</span>
              <span>more coming</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container container-narrow">
          <ul className="notes-list">
            {NOTES.map((n) => (
              <Reveal as="li" key={n.slug} className="note-item">
                <Link href={`/notes/${n.slug}`} className="note-item__link">
                  <div className="note-item__meta">
                    <span>{n.date}</span>
                    <span className="mono">·</span>
                    <span>{n.readTime}</span>
                  </div>
                  <h2 className="note-item__title">{n.title}</h2>
                  <p className="note-item__dek">{n.dek}</p>
                  <div className="note-item__tail">
                    <div className="tags">
                      {n.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <span className="note-item__cta">
                      Read
                      <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
