"use client";

/**
 * Four original SVG visuals for the "Towards Adaptive Learning Systems" essay.
 * All drawn from scratch in the site's design language (coral / cream / navy);
 * no borrowed artwork. Animations are CSS-keyframe and intersection-observer
 * triggered, so they activate as the reader scrolls into them.
 */

import { useEffect, useRef, type ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Reveal-on-intersect figure wrapper                                          */
/* -------------------------------------------------------------------------- */

function Figure({
  children,
  caption,
  className,
  label,
}: {
  children: ReactNode;
  caption: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure ref={ref} className={`essay-figure ${className ?? ""}`}>
      <div className="essay-figure__media">{children}</div>
      <figcaption>
        {label && <span className="essay-figure__label">{label} ·</span>} {caption}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. AI Hierarchy — AI ⊃ ML ⊃ {Supervised, Unsupervised, RL ∩ Deep}          */
/* -------------------------------------------------------------------------- */

export function AIHierarchy() {
  return (
    <Figure
      caption="Where reinforcement learning sits within machine learning — and where deep learning intersects all three paradigms."
      label="Fig 01"
      className="essay-figure--diagram"
    >
      <svg
        viewBox="0 0 480 360"
        className="vis vis--ai"
        role="img"
        aria-label="Nested diagram: Artificial Intelligence contains Machine Learning, which contains Supervised Learning, Unsupervised Learning, and Reinforcement Learning, all overlapping at Deep Learning."
      >
        {/* AI outer ring */}
        <ellipse cx="240" cy="200" rx="226" ry="148" className="vis-ai__outer" />
        <text x="240" y="38" textAnchor="middle" className="vis-ai__title">Artificial Intelligence</text>

        {/* ML mid ring */}
        <ellipse cx="240" cy="210" rx="186" ry="118" className="vis-ai__mid" />
        <text x="240" y="84" textAnchor="middle" className="vis-ai__subtitle">Machine Learning</text>

        {/* Three paradigm circles, intersecting at Deep */}
        <circle cx="180" cy="240" r="76" className="vis-ai__sup" />
        <circle cx="300" cy="240" r="76" className="vis-ai__unsup" />
        <circle cx="240" cy="170" r="86" className="vis-ai__rl" />

        {/* Labels */}
        <text x="120" y="296" textAnchor="middle" className="vis-ai__leaf">Supervised</text>
        <text x="360" y="296" textAnchor="middle" className="vis-ai__leaf">Unsupervised</text>
        <text x="240" y="125" textAnchor="middle" className="vis-ai__leaf vis-ai__leaf--rl">
          Reinforcement
        </text>

        {/* Deep Learning intersection */}
        <circle cx="240" cy="210" r="36" className="vis-ai__deep" />
        <text x="240" y="206" textAnchor="middle" className="vis-ai__deep-label">Deep</text>
        <text x="240" y="222" textAnchor="middle" className="vis-ai__deep-label">Learning</text>
      </svg>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. RL Loop — Agent ↔ Environment with animated pulses on the arrows        */
/* -------------------------------------------------------------------------- */

export function RLLoop() {
  return (
    <Figure
      caption="The agent–environment loop. Action flows one way, state and reward come back."
      label="Fig 02"
      className="essay-figure--diagram"
    >
      <svg
        viewBox="0 0 480 240"
        className="vis vis--rl"
        role="img"
        aria-label="Agent and Environment connected by two arrows: Action from Agent to Environment, and State plus Reward from Environment back to Agent."
      >
        {/* Agent box */}
        <rect x="32" y="78" width="148" height="84" rx="14" className="vis-rl__box" />
        <text x="106" y="116" textAnchor="middle" className="vis-rl__box-title">AGENT</text>
        <text x="106" y="138" textAnchor="middle" className="vis-rl__box-sub">policy · value</text>

        {/* Environment box */}
        <rect x="300" y="78" width="148" height="84" rx="14" className="vis-rl__box" />
        <text x="374" y="116" textAnchor="middle" className="vis-rl__box-title">ENVIRONMENT</text>
        <text x="374" y="138" textAnchor="middle" className="vis-rl__box-sub">learner · task</text>

        {/* Top arrow: Action (Agent -> Environment) */}
        <path d="M 180 96 L 296 96" className="vis-rl__arrow" markerEnd="url(#vis-arrowhead)" />
        <text x="238" y="84" textAnchor="middle" className="vis-rl__arrow-label">action</text>
        <circle r="3.5" className="vis-rl__pulse vis-rl__pulse--top" />

        {/* Bottom arrow: State + Reward (Environment -> Agent) */}
        <path d="M 296 144 L 180 144" className="vis-rl__arrow" markerEnd="url(#vis-arrowhead)" />
        <text x="238" y="166" textAnchor="middle" className="vis-rl__arrow-label">state · reward</text>
        <circle r="3.5" className="vis-rl__pulse vis-rl__pulse--bot" />

        {/* Markerheads */}
        <defs>
          <marker
            id="vis-arrowhead"
            viewBox="0 0 10 10"
            refX="9" refY="5"
            markerWidth="6" markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="vis-rl__arrowhead" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Bandit Bar Chart — Duolingo reward comparison (replaces Table 1)        */
/* -------------------------------------------------------------------------- */

export function BanditBars() {
  // Visualized at full precision; bars normalized so the baseline reads at ~70%
  // of the track and the differences are visually obvious without exaggeration.
  const ROWS = [
    { label: "Baseline (random)",        value: 0.1295, pct: 0.6818, badge: "—",     win: false },
    { label: "Template",                 value: 0.1311, pct: 0.6902, badge: "+1.2%", win: false },
    { label: "Template + UI language",   value: 0.1318, pct: 0.6938, badge: "+1.8%", win: true  },
  ];
  return (
    <Figure
      caption="Multi-armed bandit policies vs. random baseline for Duolingo push notifications. Adapted from Yancey & Settles (2020)."
      label="Fig 03"
      className="essay-figure--chart"
    >
      <div className="vis-bars" role="img" aria-label="Bar chart of average reward per push-notification policy. Random baseline 0.1295, template 0.1311 (+1.2%), template plus UI language 0.1318 (+1.8%).">
        <div className="vis-bars__head">
          <span>Policy</span>
          <span>Avg. reward (r̄ ±0.00015)</span>
        </div>
        {ROWS.map((r) => (
          <div key={r.label} className={`vis-bars__row ${r.win ? "is-win" : ""}`}>
            <div className="vis-bars__name">{r.label}</div>
            <div className="vis-bars__track">
              <span
                className="vis-bars__fill"
                style={{ "--w": `${(r.pct * 100).toFixed(2)}%` } as React.CSSProperties}
              />
              <span className="vis-bars__value">{r.value.toFixed(4)}</span>
            </div>
            <div className={`vis-bars__badge ${r.win ? "is-win" : r.value > 0.13 ? "" : "is-base"}`}>
              {r.badge}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Blended Learning Flow — 4-stage loop                                     */
/* -------------------------------------------------------------------------- */

export function BlendedFlow() {
  const STAGES = [
    { num: "01", title: "Online preparation",    sub: "prior to the class · async, RL-driven content sequencing" },
    { num: "02", title: "Classroom learning",    sub: "in-person · comprehensive, human-led" },
    { num: "03", title: "Feedback analysis",     sub: "RL agent reads engagement + correctness data" },
    { num: "04", title: "Recapitulative recap",  sub: "personalized review · feeds back into 01" },
  ];
  return (
    <Figure
      caption="Blended learning workflow. The RL loop wraps offline classroom learning instead of replacing it."
      label="Fig 04"
      className="essay-figure--flow"
    >
      <ol className="vis-flow" aria-label="Four-stage blended learning workflow: online preparation, classroom learning, feedback analysis, recapitulative recap, looping back.">
        {STAGES.map((s, i) => (
          <li key={s.num} className="vis-flow__step" style={{ "--i": i } as React.CSSProperties}>
            <div className="vis-flow__num">{s.num}</div>
            <div className="vis-flow__body">
              <div className="vis-flow__title">{s.title}</div>
              <div className="vis-flow__sub">{s.sub}</div>
            </div>
            {i < STAGES.length - 1 && (
              <svg className="vis-flow__arrow" viewBox="0 0 24 16" aria-hidden="true">
                <path d="M 2 8 L 22 8 M 16 2 L 22 8 L 16 14" />
              </svg>
            )}
          </li>
        ))}
        <div className="vis-flow__loop" aria-hidden="true">
          <svg viewBox="0 0 60 24">
            <path d="M 4 20 Q 30 4 56 20" />
            <path d="M 50 14 L 56 20 L 50 26" />
          </svg>
          <span>loops back</span>
        </div>
      </ol>
    </Figure>
  );
}
