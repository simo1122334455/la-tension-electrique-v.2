"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type SignalType = "sine" | "square" | "triangle" | "dc";

export default function OscilloscopeInteractive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sigType, setSigType] = useState<SignalType>("sine");
  const [amp, setAmp] = useState(3);
  const [sv, setSv] = useState(2);
  const [yoff, setYoff] = useState(0);
  const [period, setPeriod] = useState(4);
  const [sh, setSh] = useState(5);
  const [xoff, setXoff] = useState(0);
  const [ch2, setCh2] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    const hDiv = 10, vDiv = 8;
    const left = 48, top = 20, right = 20, bottom = 24;
    const gW = W - left - right;
    const gH = H - top - bottom;
    const dx = gW / hDiv;
    const dy = gH / vDiv;
    const cy = top + gH / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0a140a";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#1a3520";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= hDiv; i++) {
      const x = left + i * dx;
      ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, top + gH); ctx.stroke();
    }
    for (let i = 0; i <= vDiv; i++) {
      const y = top + i * dy;
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(left + gW, y); ctx.stroke();
    }

    ctx.strokeStyle = "#2a5030";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(left, cy); ctx.lineTo(left + gW, cy); ctx.stroke();

    ctx.fillStyle = "#3a6040";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";
    for (let i = 0; i <= vDiv; i++) {
      const divVal = vDiv / 2 - i;
      if (divVal !== 0) ctx.fillText(String(divVal), left - 4, top + i * dy + 4);
    }
    ctx.textAlign = "center";
    for (let i = 0; i <= hDiv; i++) {
      const divVal = i - hDiv / 2;
      if (divVal !== 0) ctx.fillText(String(divVal), left + i * dx, top + gH + 16);
    }

    const getY = (t: number, ampDiv: number, yOffDiv: number, sType: SignalType) => {
      const phase = (2 * Math.PI * t) / period;
      let val = 0;
      if (sType === "sine") val = ampDiv * Math.sin(phase);
      else if (sType === "square") val = ampDiv * (Math.sin(phase) >= 0 ? 1 : -1);
      else if (sType === "triangle") {
        const frac = ((t / period) % 1 + 1) % 1;
        val = ampDiv * (frac < 0.5 ? 4 * frac - 1 : -4 * frac + 3);
      } else {
        val = ampDiv;
      }
      return cy - (val + yOffDiv) * dy;
    };

    const drawSignal = (color: string, ampDiv: number, yOffDiv: number, xOffDiv: number, sType: SignalType) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      const steps = 600;
      let started = false;
      for (let i = 0; i <= steps; i++) {
        const t = (hDiv * i) / steps - hDiv / 2 - xOffDiv;
        const px = left + (i / steps) * gW;
        const py = getY(t, ampDiv, yOffDiv, sType);
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };

    drawSignal("#00d4a0", amp, yoff, xoff, sigType);
    if (ch2) drawSignal("#f0b030", amp * 0.6, yoff - 1.5, xoff + period / 4, sigType);
  }, [amp, sv, yoff, period, sh, xoff, ch2, sigType]);

  useEffect(() => { draw(); }, [draw]);

  const Umax = (amp * sv).toFixed(2);
  const Ueff = sigType === "dc" ? Umax : ((amp * sv) / Math.sqrt(2)).toFixed(2);
  const Tms = (period * sh).toFixed(1);
  const freq = (1000 / (period * sh)).toFixed(2);

  const signals: { key: SignalType; label: string }[] = [
    { key: "sine", label: "Sinusoïdale" },
    { key: "square", label: "Rectangulaire" },
    { key: "triangle", label: "Triangulaire" },
    { key: "dc", label: "Continue" },
  ];

  const sliderStyle = { accentColor: "var(--color-accent)", width: "100%" };
  const labelStyle = { fontSize: 13, color: "var(--color-text-muted)", width: 90, flexShrink: 0 as const };
  const valStyle = { fontSize: 13, fontWeight: 600, color: "var(--color-text)", minWidth: 64, textAlign: "right" as const };

  return (
    <>
      <style>{`
        .osc-sig-btn { transition: background 150ms ease, color 150ms ease; }
        .osc-sig-btn:hover { background: var(--color-surface) !important; }
      `}</style>

      <div style={{ borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden", background: "var(--color-surface-2)" }}>

        {/* Signal type tabs */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {signals.map(({ key, label }) => (
              <button
                key={key}
                className="osc-sig-btn"
                onClick={() => setSigType(key)}
                style={{
                  fontSize: 12, padding: "5px 12px", borderRadius: 999,
                  border: `1px solid ${sigType === key ? "rgba(0,200,224,0.5)" : "var(--color-border)"}`,
                  background: sigType === key ? "rgba(0,200,224,0.1)" : "transparent",
                  color: sigType === key ? "var(--color-accent)" : "var(--color-text-muted)",
                  cursor: "pointer", fontWeight: sigType === key ? 700 : 400,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-text-muted)", cursor: "pointer" }}>
            <input type="checkbox" checked={ch2} onChange={e => setCh2(e.target.checked)} style={{ accentColor: "#f0b030" }} />
            Voie 2 (déphasée)
          </label>
        </div>

        {/* Screen */}
        <canvas
          ref={canvasRef}
          width={900}
          height={400}
          style={{ width: "100%", display: "block", background: "#0a140a" }}
        />

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, borderTop: "1px solid var(--color-border)" }}>
          {/* Vertical */}
          <div style={{ padding: "14px 16px", borderRight: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-sub)", marginBottom: 10 }}>
              VOIE 1 — VERTICAL
            </div>
            {[
              { label: "Amplitude", id: "amp", min: 0.5, max: 4, step: 0.5, val: amp, set: setAmp, fmt: (v: number) => v.toFixed(1) + " div" },
              { label: "Sensib. Sᵥ", id: "sv", min: 0.5, max: 10, step: 0.5, val: sv, set: setSv, fmt: (v: number) => v.toFixed(1) + " V/div" },
              { label: "Décalage Y", id: "yoff", min: -3, max: 3, step: 0.5, val: yoff, set: setYoff, fmt: (v: number) => v.toFixed(1) + " div" },
            ].map(({ label, id, min, max, step, val, set, fmt }) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={labelStyle}>{label}</span>
                <input type="range" min={min} max={max} step={step} value={val}
                  onChange={e => set(parseFloat(e.target.value))} style={sliderStyle} />
                <span style={valStyle}>{fmt(val)}</span>
              </div>
            ))}
          </div>

          {/* Horizontal */}
          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-sub)", marginBottom: 10 }}>
              BASE DE TEMPS — HORIZONTAL
            </div>
            {[
              { label: "Période", id: "period", min: 1, max: 6, step: 0.5, val: period, set: setPeriod, fmt: (v: number) => v.toFixed(1) + " div" },
              { label: "Sensib. Sₕ", id: "sh", min: 1, max: 20, step: 1, val: sh, set: setSh, fmt: (v: number) => v.toFixed(0) + " ms/div" },
              { label: "Décalage X", id: "xoff", min: -2, max: 2, step: 0.25, val: xoff, set: setXoff, fmt: (v: number) => v.toFixed(2) + " div" },
            ].map(({ label, id, min, max, step, val, set, fmt }) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={labelStyle}>{label}</span>
                <input type="range" min={min} max={max} step={step} value={val}
                  onChange={e => set(parseFloat(e.target.value))} style={sliderStyle} />
                <span style={valStyle}>{fmt(val)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", borderTop: "1px solid var(--color-border)" }}>
          {[
            { label: "Umax", val: Umax + " V" },
            { label: "Ueff", val: Ueff + " V" },
            { label: "Période T", val: sigType === "dc" ? "— ms" : Tms + " ms" },
            { label: "Fréquence f", val: sigType === "dc" ? "0 Hz" : freq + " Hz" },
          ].map(({ label, val }, i) => (
            <div key={label} style={{
              padding: "12px 14px",
              borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
            }}>
              <div style={{ fontSize: 11, color: "var(--color-text-sub)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-accent)" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
