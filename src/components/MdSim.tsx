"use client";

/**
 * Live 2D molecular dynamics simulation.
 * - Lennard-Jones pair potential (σ = ε = 1 in reduced units)
 * - Linked-cell neighbour lookup (O(N) per step) — same algorithmic choice
 *   that drove the MolSim cohort win
 * - Velocity Verlet integration
 * - Berendsen thermostat coupled to the temperature slider
 * - Reflective walls
 * Vanilla canvas, no deps.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const SIGMA = 1;
const CUTOFF = 2.5;
const CUTOFF_SQ = CUTOFF * CUTOFF;
const MIN_R_SQ = 0.36; // soft floor so close overlaps don't explode the integrator
const DT = 0.005;
const STEPS_PER_FRAME = 4;
const MAX_PARTICLES = 240;
const BOX_W = 24; // σ units, fixed; height derives from canvas aspect

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number;
  fy: number;
  pinned: boolean;
};

function buildLattice(boxW: number, boxH: number, target: number): Particle[] {
  const spacing = 1.3;
  const cols = Math.max(2, Math.floor((boxW - 1) / spacing));
  const rows = Math.max(2, Math.floor((boxH - 1) / spacing));
  const total = Math.min(target, cols * rows);
  const out: Particle[] = [];
  const startX = (boxW - (cols - 1) * spacing) / 2;
  const startY = (boxH - (rows - 1) * spacing) / 2;
  for (let i = 0; i < total; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    out.push({
      x: startX + c * spacing + (r % 2) * spacing * 0.5,
      y: startY + r * spacing,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      fx: 0,
      fy: 0,
      pinned: false,
    });
  }
  return out;
}

export function MdSim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [temperature, setTemperature] = useState(1.0);
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);

  const tempRef = useRef(temperature);
  const pausedRef = useRef(paused);
  const particlesRef = useRef<Particle[]>([]);
  const boxRef = useRef({ w: BOX_W, h: 14, scale: 30 });

  useEffect(() => { tempRef.current = temperature; }, [temperature]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  const handleReset = useCallback(() => {
    const { w, h } = boxRef.current;
    particlesRef.current = buildLattice(w, h, 100);
    setCount(particlesRef.current.length);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      if (!canvas || !ctx || !wrap) return;
      const rect = wrap.getBoundingClientRect();
      const cssW = Math.max(280, rect.width);
      const cssH = Math.max(260, Math.min(440, cssW * 0.52));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = cssW / BOX_W;
      const boxH = cssH / scale;
      boxRef.current = { w: BOX_W, h: boxH, scale };
      // Re-clamp any particles after a resize
      for (const p of particlesRef.current) {
        p.x = Math.max(0.5, Math.min(BOX_W - 0.5, p.x));
        p.y = Math.max(0.5, Math.min(boxH - 0.5, p.y));
      }
    }

    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = buildLattice(boxRef.current.w, boxRef.current.h, 100);
    setCount(particlesRef.current.length);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      pausedRef.current = true;
      setPaused(true);
    }

    /** Build linked cells, accumulate LJ forces. O(N). */
    function computeForces() {
      const particles = particlesRef.current;
      const { w: boxW, h: boxH } = boxRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].fx = 0;
        particles[i].fy = 0;
      }
      const nx = Math.max(1, Math.floor(boxW / CUTOFF));
      const ny = Math.max(1, Math.floor(boxH / CUTOFF));
      const cellW = boxW / nx;
      const cellH = boxH / ny;
      const cells: number[][] = new Array(nx * ny);
      for (let i = 0; i < cells.length; i++) cells[i] = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.min(nx - 1, Math.max(0, Math.floor(p.x / cellW)));
        const cy = Math.min(ny - 1, Math.max(0, Math.floor(p.y / cellH)));
        cells[cy * nx + cx].push(i);
      }
      // Half stencil: only check 5 of 9 neighbor cells to avoid double-counting pairs.
      const STENCIL: ReadonlyArray<readonly [number, number]> = [
        [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1],
      ];
      for (let cy = 0; cy < ny; cy++) {
        for (let cx = 0; cx < nx; cx++) {
          const cellA = cells[cy * nx + cx];
          for (const [ddx, ddy] of STENCIL) {
            const ncx = cx + ddx;
            const ncy = cy + ddy;
            if (ncx < 0 || ncx >= nx || ncy < 0 || ncy >= ny) continue;
            const cellB = cells[ncy * nx + ncx];
            const same = ddx === 0 && ddy === 0;
            for (let ai = 0; ai < cellA.length; ai++) {
              const aIdx = cellA[ai];
              const pa = particles[aIdx];
              const startBj = same ? ai + 1 : 0;
              for (let bj = startBj; bj < cellB.length; bj++) {
                const bIdx = cellB[bj];
                const pb = particles[bIdx];
                const rx = pa.x - pb.x;
                const ry = pa.y - pb.y;
                let r2 = rx * rx + ry * ry;
                if (r2 > CUTOFF_SQ) continue;
                if (r2 < MIN_R_SQ) r2 = MIN_R_SQ;
                const inv2 = 1 / r2;
                const inv6 = inv2 * inv2 * inv2;
                const inv12 = inv6 * inv6;
                // F/r = (24ε/r²) · [2(σ/r)^12 − (σ/r)^6], σ=ε=1
                const fOverR = 24 * (2 * inv12 - inv6) * inv2;
                const fxv = fOverR * rx;
                const fyv = fOverR * ry;
                pa.fx += fxv;
                pa.fy += fyv;
                pb.fx -= fxv;
                pb.fy -= fyv;
              }
            }
          }
        }
      }
    }

    /** Velocity Verlet step + reflective walls + Berendsen thermostat. */
    function step() {
      const particles = particlesRef.current;
      const { w: boxW, h: boxH } = boxRef.current;
      const dt = DT;

      // 1) drift: x += v dt + 0.5 a dt²
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.pinned) continue;
        p.x += p.vx * dt + 0.5 * p.fx * dt * dt;
        p.y += p.vy * dt + 0.5 * p.fy * dt * dt;
        if (p.x < 0.5)         { p.x = 0.5;          p.vx =  Math.abs(p.vx); }
        if (p.x > boxW - 0.5)  { p.x = boxW - 0.5;   p.vx = -Math.abs(p.vx); }
        if (p.y < 0.5)         { p.y = 0.5;          p.vy =  Math.abs(p.vy); }
        if (p.y > boxH - 0.5)  { p.y = boxH - 0.5;   p.vy = -Math.abs(p.vy); }
      }
      // 2) first half-kick using old forces
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.pinned) continue;
        p.vx += 0.5 * p.fx * dt;
        p.vy += 0.5 * p.fy * dt;
      }
      // 3) new forces from new positions
      computeForces();
      // 4) second half-kick using new forces
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.pinned) continue;
        p.vx += 0.5 * p.fx * dt;
        p.vy += 0.5 * p.fy * dt;
      }
      // 5) Berendsen thermostat — scale velocities toward target T
      const tTarget = tempRef.current;
      let ke = 0;
      let n = 0;
      for (const p of particles) {
        if (p.pinned) continue;
        ke += 0.5 * (p.vx * p.vx + p.vy * p.vy);
        n++;
      }
      if (n > 0) {
        const tNow = ke / n; // 2D equipartition: <KE/particle> = T
        if (tNow > 1e-6 && tTarget > 1e-6) {
          const lambda = Math.sqrt(1 + 0.04 * (tTarget / tNow - 1));
          const L = Math.max(0.7, Math.min(1.5, lambda));
          for (const p of particles) {
            if (p.pinned) continue;
            p.vx *= L;
            p.vy *= L;
          }
        } else if (tTarget > 0.01) {
          // re-energize from a frozen state
          for (const p of particles) {
            if (p.pinned) continue;
            p.vx += (Math.random() - 0.5) * 0.2;
            p.vy += (Math.random() - 0.5) * 0.2;
          }
        }
      }
    }

    computeForces();

    function render() {
      if (!canvas || !ctx) return;
      const { scale } = boxRef.current;
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;
      ctx.clearRect(0, 0, cssW, cssH);

      // hairline grid at every 2σ
      ctx.strokeStyle = "rgba(204, 120, 92, 0.05)";
      ctx.lineWidth = 1;
      const gridStep = 2 * scale;
      for (let x = gridStep; x < cssW; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, cssH);
        ctx.stroke();
      }
      for (let y = gridStep; y < cssH; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(cssW, y);
        ctx.stroke();
      }

      const r = 0.5 * scale;
      for (const p of particlesRef.current) {
        const px = p.x * scale;
        const py = p.y * scale;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        // coral, hotter particles warm slightly
        const heat = Math.min(1, speed / 3);
        const cR = 204;
        const cG = Math.floor(120 + heat * 26);
        const cB = Math.floor(92 - heat * 16);
        ctx.fillStyle = `rgba(${cR}, ${cG}, ${cB}, 0.92)`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(20, 20, 19, 0.18)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        if (p.pinned) {
          ctx.strokeStyle = "rgba(20, 20, 19, 0.75)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    let raf = 0;
    function loop() {
      if (!pausedRef.current) {
        for (let s = 0; s < STEPS_PER_FRAME; s++) step();
      }
      render();
      raf = requestAnimationFrame(loop);
    }
    loop();

    // Pointer interactions
    let draggingIdx = -1;
    let lastX = 0;
    let lastY = 0;

    function ptr(e: PointerEvent) {
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scale = boxRef.current.scale;
      return {
        x: (e.clientX - rect.left) / scale,
        y: (e.clientY - rect.top) / scale,
      };
    }
    function pick(x: number, y: number) {
      let best = -1;
      let bestD = Infinity;
      const r2 = 0.7 * 0.7;
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const dx = ps[i].x - x;
        const dy = ps[i].y - y;
        const d = dx * dx + dy * dy;
        if (d < r2 && d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    }
    function onDown(e: PointerEvent) {
      const { x, y } = ptr(e);
      const { w, h } = boxRef.current;
      if (x < 0 || x > w || y < 0 || y > h) return;
      const idx = pick(x, y);
      if (idx >= 0) {
        draggingIdx = idx;
        const p = particlesRef.current[idx];
        p.pinned = true;
        p.vx = 0;
        p.vy = 0;
        canvas?.setPointerCapture(e.pointerId);
        lastX = x;
        lastY = y;
      } else {
        if (particlesRef.current.length >= MAX_PARTICLES) return;
        particlesRef.current.push({
          x: Math.max(0.5, Math.min(w - 0.5, x)),
          y: Math.max(0.5, Math.min(h - 0.5, y)),
          vx: 0,
          vy: 0,
          fx: 0,
          fy: 0,
          pinned: false,
        });
        setCount(particlesRef.current.length);
      }
    }
    function onMove(e: PointerEvent) {
      if (draggingIdx < 0) return;
      const { x, y } = ptr(e);
      const { w, h } = boxRef.current;
      const p = particlesRef.current[draggingIdx];
      p.x = Math.max(0.5, Math.min(w - 0.5, x));
      p.y = Math.max(0.5, Math.min(h - 0.5, y));
      // imprint pointer velocity (scaled down so flicks don't blow up)
      p.vx = ((x - lastX) / DT) * 0.2;
      p.vy = ((y - lastY) / DT) * 0.2;
      lastX = x;
      lastY = y;
    }
    function onUp(e: PointerEvent) {
      if (draggingIdx >= 0) {
        particlesRef.current[draggingIdx].pinned = false;
        if (canvas?.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
        draggingIdx = -1;
      }
    }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="md-sim">
      <div className="md-sim__head">
        <div className="md-sim__title">
          <span className="md-sim__dot" />
          <span>Live Lennard-Jones · linked-cell · 2D</span>
        </div>
        <div className="md-sim__hint">
          Click to add · drag a particle · scrub the temperature
        </div>
      </div>
      <div className="md-sim__canvasWrap">
        <canvas ref={canvasRef} className="md-sim__canvas" />
      </div>
      <div className="md-sim__controls">
        <label className="md-sim__slider">
          <span className="md-sim__k">Temperature</span>
          <input
            type="range"
            min={0}
            max={2.5}
            step={0.01}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            aria-label="Temperature in reduced LJ units"
          />
          <span className="md-sim__v">T = {temperature.toFixed(2)}</span>
        </label>
        <div className="md-sim__buttons">
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={handleReset}
          >
            Reset
          </button>
          <span className="md-sim__count">
            <strong>{count}</strong> particles
          </span>
        </div>
      </div>
    </div>
  );
}
