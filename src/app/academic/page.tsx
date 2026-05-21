import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = { title: "Academic path — Frederik Willemsen" };

export default function AcademicPage() {
  return (
    <>
      <header className="page-header" data-screen-label="02 Academic / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Academic path</div>
              <h1>Six years of CS, mostly at TUM.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>Master&apos;s</strong> · &apos;25 — &apos;27</span>
              <span><strong>Bachelor&apos;s</strong> · with merit, Aug &apos;25</span>
              <span><strong>Exchange GPA</strong> · 3.92 / 4.0</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container container-narrow">
          <div className="timeline">
            <Reveal as="article" id="msc" className="t-item t-item--current">
              <span className="t-item__node" aria-hidden="true" />
              <div className="t-item__meta">
                <span>Oct 2025 — Dec 2027</span>
                <span>·</span>
                <span>Munich</span>
                <span className="now">In progress</span>
              </div>
              <h3>Technical University of Munich</h3>
              <div className="t-item__sub">M.Sc. Computer Science</div>
              <div className="t-item__body">
                <p>Research-oriented. Concentrating in AI engineering and applied ML at scale.</p>
              </div>
              <div className="t-detail-grid">
                <div className="t-detail">
                  <h4>Focus areas</h4>
                  <ul>
                    <li>Machine learning &amp; DL systems</li>
                    <li>Distributed &amp; high-performance computing</li>
                    <li>NLP and large language models</li>
                    <li>Software engineering for AI</li>
                  </ul>
                </div>
                <div className="t-detail">
                  <h4>Relevant coursework</h4>
                  <div className="courses">
                    <span className="tag">Advanced ML</span>
                    <span className="tag">Deep Learning</span>
                    <span className="tag">NLP</span>
                    <span className="tag">Distributed Systems</span>
                    <span className="tag">ML for Engineers</span>
                    <span className="tag">Compiler Construction</span>
                    <span className="tag">Cloud Computing</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="article" id="davis" className="t-item">
              <span className="t-item__node" aria-hidden="true" />
              <div className="t-item__meta">
                <span>Sep 2023 — Jan 2024</span>
                <span>·</span>
                <span>Davis, California</span>
              </div>
              <h3>University of California, Davis</h3>
              <div className="t-item__sub">Exchange semester · GPA 3.92 / 4.0</div>
              <div className="t-item__body">
                <p>A semester at UC Davis through TUM&apos;s exchange program. Discovered the parts of CS I&apos;d later orient my master&apos;s around.</p>
              </div>
              <div className="t-detail-grid">
                <div className="t-detail">
                  <h4>Highlights</h4>
                  <ul>
                    <li>GPA 3.92 / 4.0 across CS coursework</li>
                    <li>Audited graduate-level ML seminar</li>
                    <li>First exposure to research talks at the Davis AI Lab</li>
                  </ul>
                </div>
                <div className="t-detail">
                  <h4>Coursework</h4>
                  <div className="courses">
                    <span className="tag">Algorithms &amp; DS</span>
                    <span className="tag">Operating Systems</span>
                    <span className="tag">Artificial Intelligence</span>
                    <span className="tag">Database Systems</span>
                    <span className="tag">Theory of Computation</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="article" id="bsc" className="t-item">
              <span className="t-item__node" aria-hidden="true" />
              <div className="t-item__meta">
                <span>Oct 2021 — Aug 2025</span>
                <span>·</span>
                <span>Munich</span>
              </div>
              <h3>Technical University of Munich</h3>
              <div className="t-item__sub">B.Sc. Computer Science · passed with merit</div>
              <div className="t-item__body">
                <p>Foundations in systems, algorithms, and theory. Closed with a thesis at the Chair of Physics-Enhanced ML — 16% runtime gain on CoolMuc-4.</p>
              </div>
              <div className="t-detail-grid">
                <div className="t-detail">
                  <h4>Thesis</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--body)" }}>
                    <em>Data-Driven Selection of Algorithmic Configurations</em> — RF + k-means + PCA driving HPC particle-simulation tuning. <strong>16% speedup</strong> over legacy approaches.
                  </p>
                </div>
                <div className="t-detail">
                  <h4>Core coursework</h4>
                  <div className="courses">
                    <span className="tag">Algorithms &amp; DS</span>
                    <span className="tag">Computer Architecture</span>
                    <span className="tag">Operating Systems</span>
                    <span className="tag">Computer Networks</span>
                    <span className="tag">Databases</span>
                    <span className="tag">Logic &amp; Discrete Structures</span>
                    <span className="tag">Linear Algebra</span>
                    <span className="tag">Analysis I + II</span>
                    <span className="tag">Probability</span>
                    <span className="tag">Numerical Programming</span>
                    <span className="tag">Scientific Computing (PSE)</span>
                    <span className="tag">Functional Programming</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container container-narrow">
          <Reveal className="gpa-card">
            <div>
              <div className="lbl">Exchange GPA</div>
              <div className="big"><CountUp to={3.92} decimals={2} /><span> / 4.0</span></div>
            </div>
            <div>
              <h4>UC Davis · Fall 2023</h4>
              <p>Top 5% of exchange cohort. Algorithms, AI, systems.</p>
            </div>
            <div>
              <h4>B.Sc. with merit</h4>
              <p>TUM CS · 2021 — 2025. Thesis grade 1.7.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container container-narrow">
          <Reveal className="section-head">
            <div className="eyebrow">Honors &amp; recognition</div>
            <h2>Where the work was noticed.</h2>
          </Reveal>

          <div className="honors">
            <Reveal className="honor">
              <div className="yr">2026</div>
              <h4>Top 10% Talent Pool</h4>
              <p>Selected by Deloitte — closed program for high-potential interns.</p>
            </Reveal>
            <Reveal className="honor">
              <div className="yr">2025</div>
              <h4>Best team — PSE</h4>
              <p>Won TUM&apos;s Scientific Computing practical, 60% faster than runner-up across 8 teams.</p>
            </Reveal>
            <Reveal className="honor">
              <div className="yr">2023</div>
              <h4>TUM Exchange Award</h4>
              <p>Competitive nomination to UC Davis based on academic standing.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
