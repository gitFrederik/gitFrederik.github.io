/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LogoMarquee, type MarqueeLogo } from "@/components/LogoMarquee";

export const metadata: Metadata = { title: "Experience — Frederik Willemsen" };

const COMPANY_LOGOS: MarqueeLogo[] = [
  { src: "/logos/tumai.svg",    alt: "TUM.ai",   tall: true  },
  { src: "/logos/deloitte.png", alt: "Deloitte", tall: false },
  { src: "/logos/check24.png",  alt: "Check24",  tall: false },
];

export default function ExperiencePage() {
  return (
    <>
      <header className="page-header" data-screen-label="03 Experience / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Experience</div>
              <h1>Three roles. Production systems. Real users.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>15M+</strong> users served</span>
              <span><strong>50%</strong> API latency cut</span>
              <span><strong>Top 10%</strong> at Deloitte</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <Reveal as="article" id="tumai" className="exp-card">
            <aside className="exp-side">
              <div className="exp-logo">
                <img src="/logos/tumai.svg" alt="TUM.ai" />
              </div>
              <div className="exp-meta">
                <div className="when">May 2026 — now</div>
                <div className="now">Current</div>
                <div className="where">Munich, Germany<br />Student initiative · ~400 members</div>
              </div>
            </aside>
            <div className="exp-body">
              <h3>TUM.ai</h3>
              <div className="role-line">Software Engineer</div>
              <p className="summary">Europe&apos;s largest AI student initiative. I lead engineering on the platforms it runs on — member ops, finance automation, internal tooling.</p>

              <ul className="impact-list">
                <li>
                  <div className="metric">400+<small>members</small></div>
                  <div className="text">
                    <strong>Member management platform.</strong> <span className="tag tag--wip">in progress</span> Centralizing operations across the organization — application review, project assignment, alumni records — into one system. Replacing six disconnected spreadsheets and three Notion bases.
                    <div className="tags">
                      <span className="tag">TypeScript</span>
                      <span className="tag">Next.js</span>
                      <span className="tag">Postgres</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="metric">∞<small>hours saved</small></div>
                  <div className="text">
                    <strong>Finance automation.</strong> <span className="tag tag--wip">in progress</span> Eliminating recurring manual overhead — reimbursements, sponsor invoicing, budget rollups — by codifying the board&apos;s monthly workflow into a small, auditable pipeline.
                    <div className="tags">
                      <span className="tag">Python</span>
                      <span className="tag">FastAPI</span>
                      <span className="tag">CI/CD</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="exp-stack">
                <span className="k">Stack</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Next.js</span>
                <span className="tag">Python</span>
                <span className="tag">FastAPI</span>
                <span className="tag">Postgres</span>
                <span className="tag">Docker</span>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" id="deloitte" className="exp-card">
            <aside className="exp-side">
              <div className="exp-logo">
                <img src="/logos/deloitte.png" alt="Deloitte" />
              </div>
              <div className="exp-meta">
                <div className="when">Oct 2025 — Feb 2026</div>
                <div className="where">Munich, Germany<br />Consulting · AI &amp; Data practice</div>
              </div>
            </aside>
            <div className="exp-body">
              <h3>Deloitte Consulting</h3>
              <div className="role-line">AI &amp; Data Project Intern</div>
              <p className="summary">Two production tracks in five months: an agentic chatbot on AWS, and an ML model for automotive aftersales lead prioritization. Selected for Top 10% talent pool on the way out.</p>

              <ul className="impact-list">
                <li>
                  <div className="metric">→ JP<small>tokyo conference</small></div>
                  <div className="text">
                    <strong>Agentic AI chatbot on AWS.</strong> Built and deployed to production with a multi-agent architecture leveraging a RAG pipeline with source citations. Full-stack: frontend, backend, APIs. <em>Presented by senior management at an international Deloitte AI conference in Japan to acquire new enterprise clients.</em>
                    <div className="tags">
                      <span className="tag">Python</span>
                      <span className="tag">Flask</span>
                      <span className="tag">Angular</span>
                      <span className="tag">AWS</span>
                      <span className="tag tag--coral">RAG · Agents</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="metric">+%<small>conversion lift</small></div>
                  <div className="text">
                    <strong>Lead prioritization model.</strong> Trained an ML model for customer lead ranking in automotive aftersales — measurably improving efficiency in lead management for a major OEM client.
                    <div className="tags">
                      <span className="tag">Pandas</span>
                      <span className="tag">scikit-learn</span>
                      <span className="tag">SQL</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="metric">10%<small>talent pool</small></div>
                  <div className="text">
                    <strong>Selected for Deloitte&apos;s Top 10% Talent Pool</strong> — a closed program for high-potential interns based on outstanding internship performance and partner feedback.
                  </div>
                </li>
              </ul>

              <div className="exp-stack">
                <span className="k">Stack</span>
                <span className="tag">Python</span>
                <span className="tag">Flask</span>
                <span className="tag">Angular</span>
                <span className="tag">Pandas</span>
                <span className="tag">SQL</span>
                <span className="tag">AWS</span>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" id="check24" className="exp-card">
            <aside className="exp-side">
              <div className="exp-logo">
                <img src="/logos/check24.png" alt="Check24" />
              </div>
              <div className="exp-meta">
                <div className="when">Aug 2025 — Oct 2025</div>
                <div className="where">Munich, Germany<br />Comparison platform · 15M+ users</div>
              </div>
            </aside>
            <div className="exp-body">
              <h3>Check24</h3>
              <div className="role-line">Software Engineer Intern</div>
              <p className="summary">Germany&apos;s largest comparison platform. Two production features on the highest-traffic surface — one infrastructural, one user-facing.</p>

              <ul className="impact-list">
                <li>
                  <div className="metric">-50%<small>api latency</small></div>
                  <div className="text">
                    <strong>MCP server for LLM context.</strong> Designed and deployed an MCP server for structured LLM context delivery — caching at the boundary cut API latency by half, improved context reliability, and lowered model-call cost across internal AI features.
                    <div className="tags">
                      <span className="tag">Java</span>
                      <span className="tag">Spring Boot</span>
                      <span className="tag tag--coral">MCP</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="metric">15M+<small>users served</small></div>
                  <div className="text">
                    <strong>Natural-language filtering.</strong> Designed, implemented, and shipped to production an AI-powered free-text search and filter system that maps natural language into structured filter state — live on Check24&apos;s main consumer surface.
                    <div className="tags">
                      <span className="tag">React</span>
                      <span className="tag">Java</span>
                      <span className="tag">Spring Boot</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="exp-stack">
                <span className="k">Stack</span>
                <span className="tag">Java</span>
                <span className="tag">Spring Boot</span>
                <span className="tag">React</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LogoMarquee
        logos={COMPANY_LOGOS}
        eyebrow="Worked at"
        ariaLabel="Companies I've worked at"
      />
    </>
  );
}
