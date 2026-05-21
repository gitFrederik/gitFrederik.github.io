import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { CountUp } from "@/components/CountUp";
import { MdSim } from "@/components/MdSim";

export const metadata: Metadata = { title: "Work — Frederik Willemsen" };

const AGORIX_URL = "https://www.agorix.eu";
const AGORIX_GH  = "https://github.com/frederikwillemsen/agorix";
const MOLSIM_GH  = "https://github.com/gitFrederik/MolSim";
const AUTOPAS_GH = "https://github.com/gitFrederik/AutoPas";
const THESIS_PDF = "https://mediatum.ub.tum.de/doc/1797259/ffeqiqdcqqj2i6yq5rpd16q4k.pdf";

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <header className="page-header" data-screen-label="04 Work / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Work</div>
              <h1>Projects, shipped to real systems.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>3</strong> case studies</span>
              <span><strong>3</strong> in the grid</span>
              <span>AI · ML · systems</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">

          {/* ============ SPOTLIGHT 1 — agorix ============ */}
          <Reveal as="article" id="agorix" className="spotlight spotlight--clean">
            <div className="spotlight__head">
              <div>
                <div className="spotlight__index"><span className="num">01</span> <span>Civic technology · 48h hackathon · TUM.ai Agora Hacks</span></div>
                <h2>agorix<span style={{ color: "var(--primary)" }}>.</span>eu</h2>
                <div className="spotlight__role">An AI civic copilot that turns Munich&apos;s 30+ municipal sites into one conversation.</div>
              </div>
              <p className="spotlight__lede">
                Built in 48 hours by a team of three at TUM.ai Agora Hacks. Demo&apos;d live to a panel of leading professors in politics and computer science, including IBM&apos;s Head of AI. Live since the hackathon weekend.
              </p>
            </div>

            <div className="bignum bignum--first">
              <div className="bignum__display"><CountUp to={48} /><span className="unit">h</span></div>
              <div className="bignum__label">From kickoff to live demo. <strong>30+ municipal sources</strong> integrated into one chat interface.</div>
            </div>

            <div className="case-grid">
              <div>
                <h4>Problem</h4>
                <p>Munich&apos;s municipal information lives across <strong>30+ websites</strong> with inconsistent search, opening hours, and registration flows. Newcomers — especially international students — spend hours stitching information together.</p>
              </div>
              <div>
                <h4>Solution</h4>
                <p>An LLM-routed query layer over the city&apos;s real-time data. Free-text questions in, <strong>citizen-friendly answers</strong> with sources and registration links out.</p>
                <div className="tags">
                  <span className="tag">TypeScript</span>
                  <span className="tag">Python</span>
                  <span className="tag">Next.js</span>
                  <span className="tag tag--coral">LLM · RAG</span>
                </div>
              </div>
            </div>

            <div className="deepdive">
              <div>
                <h4>What I built</h4>
                <ul>
                  <li>A working conversational prototype: free-text Munich questions in, natural-language answers out.</li>
                  <li>LLM-driven Q&amp;A wired to a starter set of municipal data sources &mdash; a proof-of-concept for the broader vision below.</li>
                  <li>Source-attribution pattern integrated into responses, so every answer points back to where it came from.</li>
                  <li>Built, polished, and deployed live at <em>agorix.eu</em> in time for the judging demo.</li>
                </ul>
              </div>
              <div>
                <h4>Achieved</h4>
                <ul>
                  <li>Demo&apos;d live to a judging panel of leading German professors in politics and computer science, including <strong>IBM&apos;s Head of AI</strong>.</li>
                  <li>Live and reachable at <em>agorix.eu</em> through to today.</li>
                  <li>Three-person team, 48 hours, end-to-end prototype shipped on time.</li>
                </ul>
              </div>
              <div className="deepdive__full">
                <h4>The vision</h4>
                <ul>
                  <li><strong>LLM router</strong> classifying each query by district + topic before retrieval.</li>
                  <li><strong>Crawler + normalizer</strong> pulling structured data from 30+ Munich gov sites into a single schema.</li>
                  <li><strong>End-to-end citation pipeline</strong> &mdash; every answer linked back to the exact municipal page.</li>
                </ul>
              </div>
            </div>

            <div className="impact-row">
              <div className="ig"><span className="v"><CountUp to={48} /><small>h</small></span><span className="k">Build time</span></div>
              <div className="ig"><span className="v"><CountUp to={3} /><small>×</small></span><span className="k">Person team</span></div>
              <div className="ig"><span className="v"><CountUp to={30} suffix="+" /></span><span className="k">Data sources integrated</span></div>
            </div>

            <div className="spotlight__links">
              <Magnetic>
                <a className="btn btn--secondary" href={AGORIX_URL} target="_blank" rel="noopener">
                  <ExternalIcon />
                  Visit agorix.eu
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--secondary" href={AGORIX_GH} target="_blank" rel="noopener">
                  <GithubIcon />
                  Source on GitHub
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* ============ SPOTLIGHT 2 — Molecular Dynamics ============ */}
          <Reveal as="article" id="md-framework" className="spotlight spotlight--clean">
            <div className="spotlight__head">
              <div>
                <div className="spotlight__index"><span className="num">02</span> <span>Practical Course · TUM · 4-month project · 3-person team</span></div>
                <h2>Molecular dynamics <em style={{ color: "var(--primary)" }}>framework</em></h2>
                <div className="spotlight__role">A high-performance MD simulator in C++. Best in cohort by 60%.</div>
              </div>
              <p className="spotlight__lede">
                Eight teams, one final benchmark, four months. Three of us built a particle-based MD simulator from scratch — and ended up sixty percent ahead of the next-best team.
              </p>
            </div>

            <div className="bignum bignum--first">
              <div className="bignum__display"><CountUp to={60} /><span className="unit">%</span></div>
              <div className="bignum__label"><strong>Faster than the next-best team</strong> on the end-of-course benchmark. <strong>1 of 8</strong> teams in the cohort.</div>
            </div>

            <div className="deepdive" style={{ paddingTop: 0, marginTop: 0, borderTop: 0, gridTemplateColumns: "1fr" }}>
              <div>
                <h4>Try it</h4>
                <p style={{ margin: 0, fontSize: 15, color: "var(--body)", lineHeight: 1.55 }}>
                  Below: a live <strong>2D Lennard-Jones simulation</strong> running the same linked-cell algorithm that drove the cohort win, ported from C++ to JavaScript and rendered in canvas. Click anywhere to seed a particle, drag any particle to perturb the system, scrub the slider to heat or freeze it.
                </p>
              </div>
            </div>

            <MdSim />

            <div className="case-grid">
              <div>
                <h4>What we built</h4>
                <p>A particle-based MD simulator implementing <strong>linked-cell neighborhood search</strong>, classical force fields, periodic boundaries, thermostatting, and trajectory I/O — parallelized with <strong>OpenMP</strong>, designed for cache friendliness end-to-end.</p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">OpenMP</span>
                  <span className="tag">CMake</span>
                  <span className="tag tag--coral">HPC</span>
                </div>
              </div>
              <div>
                <h4>Why it won</h4>
                <p>We profiled from week one. Picked the right tradeoffs (memory layout &gt; algorithmic cleverness for this workload). Refused to add features that weren&apos;t in the hot path. Tested every commit against a benchmark harness we built ourselves.</p>
              </div>
            </div>

            <div className="deepdive">
              <div>
                <h4>Built into the simulator</h4>
                <ul>
                  <li><strong>Linked-cell neighborhood search</strong> — the single biggest perf win vs. the cohort.</li>
                  <li>Lennard-Jones + harmonic bond potentials, with cutoff handling.</li>
                  <li>Periodic boundary conditions with image cells.</li>
                  <li>Berendsen + velocity-scaling thermostats for equilibration.</li>
                  <li>VTK + XYZ trajectory I/O for visualization in ParaView.</li>
                  <li><strong>Structure-of-arrays</strong> particle layout — cache-friendly inner loops.</li>
                  <li><strong>OpenMP-parallel</strong> force evaluation, with thread-local accumulators.</li>
                </ul>
              </div>
              <div>
                <h4>Achieved</h4>
                <ul>
                  <li><strong>Best overall performance</strong> — 60% faster than the next-best team.</li>
                  <li>1 of 8 teams in TUM&apos;s Scientific Computing (PSE) practical.</li>
                  <li>Three-person team, led end-to-end including architecture decisions and perf reviews.</li>
                  <li>Open-sourced on GitHub as <em>MolSim</em>.</li>
                </ul>
              </div>
            </div>

            <div className="impact-row">
              <div className="ig"><span className="v"><CountUp to={60} prefix="+" /><small>%</small></span><span className="k">Faster than runner-up</span></div>
              <div className="ig"><span className="v"><CountUp to={8} /></span><span className="k">Competing teams</span></div>
              <div className="ig"><span className="v"><CountUp to={3} /><small>×</small></span><span className="k">Person team, led</span></div>
            </div>

            <div className="spotlight__links">
              <Magnetic>
                <a className="btn btn--secondary" href={MOLSIM_GH} target="_blank" rel="noopener">
                  <GithubIcon />
                  Source on GitHub (MolSim)
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* ============ SPOTLIGHT 3 — Thesis ============ */}
          <Reveal as="article" id="thesis" className="spotlight spotlight--clean">
            <div className="spotlight__head">
              <div>
                <div className="spotlight__index"><span className="num">03</span> <span>Research · BSc thesis · TUM PEML Chair · 6 months</span></div>
                <h2>ML-tuned HPC simulations</h2>
                <div className="spotlight__role">Data-driven configuration selection for particle simulations on CoolMuc-4. Open-sourced in AutoPas.</div>
              </div>
              <p className="spotlight__lede">
                Can ML pick algorithmic configurations for HPC particle simulations better than hand-tuning? It can — by sixteen percent on CoolMuc-4. Six months at TUM&apos;s Chair of Physics-Enhanced Machine Learning. Thesis grade 1.7.
              </p>
            </div>

            <div className="bignum bignum--first">
              <div className="bignum__display"><CountUp to={16} /><span className="unit">%</span></div>
              <div className="bignum__label"><strong>Runtime speedup</strong> over hand-tuned baselines on CoolMuc-4. Generalizes across grid geometries — no per-grid re-tuning.</div>
            </div>

            <div className="case-grid">
              <div>
                <h4>Method</h4>
                <p><strong>Random forests</strong> on execution traces predict per-grid optimal configurations. <strong>K-means + PCA</strong> on grid features identify which grids share a tuning regime. Performance-driven experimentation closes the loop.</p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">Python</span>
                  <span className="tag">Pandas</span>
                  <span className="tag">scikit-learn</span>
                </div>
              </div>
              <div>
                <h4>Result</h4>
                <p><strong>16% runtime speedup</strong> over legacy hand-tuned approaches on a large-scale HPC system. Generalizes across grid geometries — no per-grid re-tuning. Open-sourced as a patch to <em>AutoPas</em>.</p>
              </div>
            </div>

            <div className="deepdive">
              <div>
                <h4>Built</h4>
                <ul>
                  <li><strong>Trace logger</strong> capturing per-configuration execution metrics on CoolMuc-4.</li>
                  <li>Feature pipeline (Pandas) extracting grid geometry + workload features.</li>
                  <li><strong>Random-forest classifier</strong> predicting optimal config per grid.</li>
                  <li><strong>K-means + PCA</strong> clustering to identify grids that share a tuning regime.</li>
                  <li>Closed-loop tuner driving performance-driven experimentation.</li>
                  <li>Integration patch upstreamed to <em>AutoPas</em> — TUM&apos;s open-source HPC particle library.</li>
                </ul>
              </div>
              <div>
                <h4>Achieved</h4>
                <ul>
                  <li><strong>16% speedup</strong> vs. legacy hand-tuned baselines on CoolMuc-4.</li>
                  <li>Generalizes across grid geometries — no per-grid re-tuning required.</li>
                  <li>Open-sourced in AutoPas (active TUM-maintained library).</li>
                  <li>Thesis grade <strong>1.7</strong> · BSc passed with merit.</li>
                </ul>
              </div>
            </div>

            <div className="impact-row">
              <div className="ig"><span className="v"><CountUp to={16} prefix="+" /><small>%</small></span><span className="k">Speedup vs. baseline</span></div>
              <div className="ig"><span className="v"><CountUp to={8} /></span><span className="k">Grid geometries evaluated</span></div>
              <div className="ig"><span className="v">RF + KM + PCA</span><span className="k">Model ensemble</span></div>
            </div>

            <div className="spotlight__links">
              <Magnetic>
                <a className="btn btn--secondary" href={THESIS_PDF} target="_blank" rel="noopener">
                  <ExternalIcon />
                  Read the thesis (PDF)
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--secondary" href={AUTOPAS_GH} target="_blank" rel="noopener">
                  <GithubIcon />
                  Code on GitHub (AutoPas)
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Also</div>
            <h2>Smaller projects worth seeing.</h2>
          </Reveal>

          <div className="work-grid">
            <Reveal>
              <Link className="preview-card preview-card--dark" href="#">
                <div className="preview-card__meta">
                  <span>Check24 · Production</span>
                  <span>Aug — Oct 2025</span>
                </div>
                <h3>MCP context server</h3>
                <p>MCP server for structured LLM context delivery on Check24&apos;s internal AI platform. Boundary caching <strong>cut API latency by 50%</strong>.</p>
                <div className="tags">
                  <span className="tag">Java</span>
                  <span className="tag">Spring Boot</span>
                  <span className="tag tag--coral">MCP</span>
                </div>
                <div className="preview-card__cta">
                  Confidential — write-up on request
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link className="preview-card" href="#">
                <div className="preview-card__meta">
                  <span>Check24 · Production</span>
                  <span>Aug — Oct 2025</span>
                </div>
                <h3>Natural-language filtering</h3>
                <p>Free-text search and filter system shipped to <strong>15M+ users</strong> — conversational queries to structured filter state in one round-trip.</p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">Java</span>
                  <span className="tag">Spring Boot</span>
                </div>
                <div className="preview-card__cta">
                  See live filter
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link className="preview-card" href="#">
                <div className="preview-card__meta">
                  <span>Deloitte · Production</span>
                  <span>2026</span>
                </div>
                <h3>Aftersales lead prioritization</h3>
                <p>ML lead-ranking model for automotive aftersales — measurable conversion lift for an OEM client.</p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Pandas</span>
                  <span className="tag">scikit-learn</span>
                </div>
                <div className="preview-card__cta">
                  Internal · write-up on request
                  <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
