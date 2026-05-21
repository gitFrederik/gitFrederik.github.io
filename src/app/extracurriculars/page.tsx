import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Extracurriculars — Frederik Willemsen" };

export default function ExtracurricularsPage() {
  return (
    <>
      <header className="page-header" data-screen-label="05 Extracurriculars / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Extracurriculars</div>
              <h1>What I do outside class.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>Two</strong> things I care about</span>
              <span><strong>Three</strong> ways to leave the laptop</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Outside class</div>
            <h2>Two things that mattered.</h2>
          </Reveal>

          <div className="ec-grid">
            <Reveal as="article" className="ec-card ec-card--coral">
              <div className="ec-card__meta">
                <span>Hackathon · Apr 2026</span>
                <span>48 hrs</span>
              </div>
              <h3>agorix.eu, in a weekend</h3>
              <p>Three of us, no sleep, a lot of coffee. We built <a href="https://www.agorix.eu" target="_blank" rel="noopener" style={{ color: "inherit", textDecoration: "underline" }}>agorix.eu</a> — an AI civic prototype taking the first step toward turning Munich&apos;s 30+ municipal sites into one conversation — and demo&apos;d it to a panel of leading German professors in politics and computer science, including IBM&apos;s Head of AI. The one I&apos;m proudest of.</p>
              <div className="tags">
                <span className="tag">TypeScript</span>
                <span className="tag">Python</span>
                <span className="tag">LLM</span>
              </div>
            </Reveal>

            <Reveal as="article" className="ec-card ec-card--feature">
              <div className="ec-card__meta">
                <span>TUM Uganda Club</span>
                <span>ongoing</span>
              </div>
              <h3>The Uganda Club</h3>
              <p>I&apos;ve been part of TUM&apos;s Uganda Club for a few years now — a long-running student initiative that supports partner schools and clinics in eastern Uganda. Fundraising, logistics, and the occasional trip. It&apos;s the bit of my week that has nothing to do with code, and the bit I&apos;d be most reluctant to give up.</p>
              <div className="tags">
                <span className="tag">Volunteer</span>
                <span className="tag">Education</span>
                <span className="tag">Healthcare</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Off the keyboard</div>
            <h2>How I close the laptop.</h2>
          </Reveal>

          <div className="beyond">
            <Reveal className="beyond-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v6l4.5-4.5"/><path d="M21 10h-6"/><path d="M3 16l3 5"/><path d="M7 11l4 4-2 5"/><path d="M9 7l5 5"/><circle cx="17" cy="4" r="2"/></svg>
              <h4>Running</h4>
              <div className="stat">Half-marathon PB: 1h 32m</div>
              <p>Long runs along the Isar most weeks. Chasing a sub-1:30 in Munich &apos;27.</p>
            </Reveal>

            <Reveal className="beyond-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="2.5"/><path d="M12 8.5v9"/><path d="M12 17.5l-2 4"/><path d="M12 17.5l2 4"/><circle cx="6.5" cy="20" r="1.5"/></svg>
              <h4>Golf</h4>
              <div className="stat">Handicap: 2.0</div>
              <p>Low-handicap club player. Munich is annoyingly good for golf in summer; I take advantage.</p>
            </Reveal>

            <Reveal className="beyond-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/><path d="M2 12h20"/></svg>
              <h4>Football</h4>
              <div className="stat">Same five friends since first semester</div>
              <p>Pickup matches. Less competitive every year, more sacred.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
