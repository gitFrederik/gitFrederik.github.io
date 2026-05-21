import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { KineticHeading } from "@/components/KineticHeading";
import { CountUp } from "@/components/CountUp";
import { PhotoCard } from "@/components/PhotoCard";

export default function HomePage() {
  return (
    <>
      <section className="k-hero" data-screen-label="01 Home / Hero">
        <div className="k-hero__grain" aria-hidden="true" />
        <div className="container">
          <div className="k-hero__layout">
            <div className="k-hero__copy">
              <div className="k-hero__signal" aria-label="Status">
                <span className="dot" />
                <span>Open · SWE / AI engineering · Summer 2027 + full-time &apos;28</span>
              </div>

              <KineticHeading className="k-hero__name">
                {"Frederik\nWillemsen."}
              </KineticHeading>

              <KineticHeading className="k-hero__role">
                {"Software & AI engineer in Munich."}
              </KineticHeading>

              <p className="k-hero__lede">
                CS master&apos;s at TUM. I ship production AI at <strong>Deloitte</strong> and <strong>Check24</strong>, and design HPC algorithms that beat hand-tuning by double digits.
              </p>

              <div className="k-hero__row">
                <Magnetic>
                  <Link className="btn btn--primary btn--lg" href="/projects">
                    <span>View work</span>
                    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link className="btn btn--secondary btn--lg" href="/contact">
                    <span>Get in touch</span>
                  </Link>
                </Magnetic>
              </div>

              <div className="k-hero__strip">
                <div className="cell">
                  <div className="k">Now</div>
                  <div className="v">TUM.ai<small>Software Engineer</small></div>
                </div>
                <div className="cell">
                  <div className="k">Based</div>
                  <div className="v">Munich<small>open to relocate</small></div>
                </div>
                <div className="cell">
                  <div className="k">MSc</div>
                  <div className="v">TUM CS<small>&apos;25 — &apos;27</small></div>
                </div>
                <div className="cell">
                  <div className="k">Exchange GPA</div>
                  <div className="v">
                    <CountUp to={3.92} decimals={2} />
                    <span style={{ color: "var(--muted)", fontSize: 16 }}> / 4.0</span>
                    <small>UC Davis</small>
                  </div>
                </div>
              </div>
            </div>

            <PhotoCard
              src="/photo.jpg"
              alt="Frederik Willemsen, portrait"
              width={1071}
              height={1272}
              caption="Frederik · Munich · 2026"
            />
          </div>
        </div>
      </section>

      <LogoMarquee />

      <div className="strip">
        <div className="container">
          <div className="strip__inner">
            <span className="strip__label">In production</span>
            <div className="strip__items">
              <span><CountUp to={15} suffix="M+ users served" /></span>
              <span><CountUp to={50} suffix="% API latency cut" /></span>
              <span><CountUp to={16} suffix="% HPC speedup" /></span>
              <span>Top <CountUp to={10} suffix="% Deloitte talent pool" /></span>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Selected work</div>
            <h2>Three things, made.</h2>
          </Reveal>
          <div className="grid-three">
            <Reveal>
              <Link className="preview-card" href="/projects#agorix">
                <div className="preview-card__meta">
                  <span>Hackathon — Apr 2026</span>
                  <span>48 hrs</span>
                </div>
                <h3>agorix.eu</h3>
                <p>Munich&apos;s 30+ municipal sites collapsed into one conversation. LLM-routed, source-cited, citizen-friendly.</p>
                <div className="tags">
                  <span className="tag">TypeScript</span>
                  <span className="tag">Python</span>
                  <span className="tag tag--coral">LLM · RAG</span>
                </div>
                <div className="preview-card__cta">
                  Case study
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link className="preview-card preview-card--dark" href="/projects#md-framework">
                <div className="preview-card__meta">
                  <span>TUM Scientific Computing</span>
                  <span>Best in cohort</span>
                </div>
                <h3>Molecular dynamics framework</h3>
                <p>Three of us, eight teams, four months. <strong>60% faster than the next-best team</strong> on the final benchmark.</p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">OpenMP</span>
                  <span className="tag tag--coral">HPC</span>
                </div>
                <div className="preview-card__cta">
                  Case study
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link className="preview-card" href="/projects#thesis">
                <div className="preview-card__meta">
                  <span>BSc Thesis — TUM</span>
                  <span>16% speedup</span>
                </div>
                <h3>ML-tuned HPC simulations</h3>
                <p>Random forests, k-means, PCA picking configurations for particle simulations on CoolMuc-4. Beat hand-tuning by 16%.</p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">Python</span>
                  <span className="tag tag--coral">ML · HPC</span>
                </div>
                <div className="preview-card__cta">
                  Case study
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Stack</div>
            <h2>What I reach for.</h2>
          </Reveal>

          <Reveal className="stack-strip">
            <div className="stack-cell">
              <div className="k">Languages</div>
              <div className="v"><strong>Python</strong>, Java, C++, TypeScript, SQL</div>
            </div>
            <div className="stack-cell">
              <div className="k">AI / ML</div>
              <div className="v"><strong>PyTorch</strong>, LangChain, RAG, MCP</div>
            </div>
            <div className="stack-cell">
              <div className="k">Backend</div>
              <div className="v"><strong>Spring Boot</strong>, Flask, FastAPI</div>
            </div>
            <div className="stack-cell">
              <div className="k">Frontend</div>
              <div className="v"><strong>React</strong>, Next.js, Angular</div>
            </div>
            <div className="stack-cell">
              <div className="k">Infra</div>
              <div className="v"><strong>AWS</strong>, Docker, OpenMP</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Where I&apos;ve worked</div>
            <h2>Three roles. Production scale.</h2>
          </Reveal>
          <div className="grid-three">
            <Reveal>
              <Link className="preview-card" href="/experience#tumai">
                <div className="preview-card__meta">
                  <span>TUM.ai · Munich</span>
                  <span>May 2026 — now</span>
                </div>
                <h3>Software Engineer</h3>
                <p>Member-management platform for 400+ members at Europe&apos;s largest AI student initiative.</p>
              </Link>
            </Reveal>
            <Reveal>
              <Link className="preview-card" href="/experience#deloitte">
                <div className="preview-card__meta">
                  <span>Deloitte · Munich</span>
                  <span>Oct &apos;25 — Feb &apos;26</span>
                </div>
                <h3>AI &amp; Data Intern</h3>
                <p>Shipped an agentic chatbot to prod. Top 10% talent pool.</p>
              </Link>
            </Reveal>
            <Reveal>
              <Link className="preview-card" href="/experience#check24">
                <div className="preview-card__meta">
                  <span>Check24 · Munich</span>
                  <span>Aug — Oct 2025</span>
                </div>
                <h3>SWE Intern</h3>
                <p>MCP server cut API latency 50%. NL filtering shipped to 15M+ users.</p>
              </Link>
            </Reveal>
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link className="text-link" href="/experience" style={{ fontSize: 15 }}>
              See the full timeline
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta-band">
          <div className="container">
            <div className="cta-band__inner">
              <h2>Hiring for SWE or AI engineering?</h2>
              <p>Open for summer 2027 + full-time from Jan 2028. Bias toward teams where engineering rigor matters.</p>
              <div className="hero__cta" style={{ justifyContent: "center" }}>
                <Magnetic>
                  <Link className="btn btn--cream btn--lg" href="/contact">
                    Start a conversation
                    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
