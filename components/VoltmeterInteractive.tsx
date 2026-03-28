"use client";

import { useState, useMemo } from "react";

function polarToCart(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function DialSVG({ C, fraction, U, good }: { C: number; fraction: number; U: number; good: boolean }) {
  const cx = 160, cy = 175, R = 144;
  const color = good ? "#00d4a0" : "#f0b030";
  const steps = 10;

  const ticks = Array.from({ length: steps + 1 }, (_, i) => {
    const angle = 180 + i * 18;
    const rad = (angle * Math.PI) / 180;
    const isMajor = i % 2 === 0;
    const r1 = R - (isMajor ? 22 : 12);
    const r2 = R - 2;
    return {
      x1: cx + r1 * Math.cos(rad), y1: cy + r1 * Math.sin(rad),
      x2: cx + r2 * Math.cos(rad), y2: cy + r2 * Math.sin(rad),
      lx: cx + (r1 - 14) * Math.cos(rad), ly: cy + (r1 - 14) * Math.sin(rad),
      isMajor, val: (C * i) / steps, i,
    };
  });

  const needleAngle = 180 + Math.min(1, fraction) * 180;
  const needleRad = (needleAngle * Math.PI) / 180;
  const nx = cx + (R - 10) * Math.cos(needleRad);
  const ny = cy + (R - 10) * Math.sin(needleRad);

  // Fixed full semicircle path — never changes, so no arc-flag flip bug
  const arcStart = polarToCart(cx, cy, R, 180);
  const arcEnd = polarToCart(cx, cy, R, 0);
  const fullArcD = `M ${arcStart.x.toFixed(2)} ${arcStart.y.toFixed(2)} A ${R} ${R} 0 0 1 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`;

  // Progress drawn via strokeDasharray on the same fixed path — smooth, no jumps
  const semiCirc = Math.PI * R;
  const progressDash = (Math.min(1, fraction) * semiCirc).toFixed(2);

  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ display: "block" }}>
      <clipPath id="vc-clip"><rect x="0" y="0" width="320" height="185" /></clipPath>

      {/* Background track */}
      <path d={fullArcD} fill="none" stroke="#1a2a1a" strokeWidth="20" clipPath="url(#vc-clip)" />

      {/* Progress — same path, clipped by dasharray. No large-arc-flag, no jump */}
      <path
        d={fullArcD}
        fill="none"
        stroke={color}
        strokeWidth="20"
        strokeOpacity="0.55"
        strokeDasharray={`${progressDash} ${semiCirc.toFixed(2)}`}
        clipPath="url(#vc-clip)"
      />

      {/* Tick marks + labels */}
      {ticks.map(({ x1, y1, x2, y2, lx, ly, isMajor, val, i }) => (
        <g key={i}>
          <line
            x1={x1.toFixed(1)} y1={y1.toFixed(1)}
            x2={x2.toFixed(1)} y2={y2.toFixed(1)}
            stroke={isMajor ? "#4a7a4a" : "#2a4a2a"}
            strokeWidth={isMajor ? 2 : 1}
          />
          {isMajor && (
            <text
              x={lx.toFixed(1)} y={(ly + 4).toFixed(1)}
              textAnchor="middle" fontSize="11"
              fontFamily="monospace" fill="#5a8a5a"
            >
              {val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}
            </text>
          )}
        </g>
      ))}

      {/* Unit label */}
      <text x={cx} y={cy - R * 0.52} textAnchor="middle"
        fontSize="13" fontFamily="monospace" fill="#4a7a4a" fontWeight="700">
        V
      </text>

      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={nx.toFixed(1)} y2={ny.toFixed(1)}
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="7" fill={color} />

      {/* Readout */}
      <text x={cx} y={cy - R * 0.28} textAnchor="middle"
        fontSize="15" fontWeight="700" fontFamily="monospace" fill={color}>
        {U.toFixed(2)} V
      </text>
    </svg>
  );
}

export default function VoltmeterInteractive() {
  const [mode, setMode] = useState<"analogique" | "numerique">("analogique");
  const [calibre, setCalibre] = useState(10);
  const [ndiv, setNdiv] = useState(75);
  const [ndivmax, setNdivmax] = useState(150);
  const [classe, setClasse] = useState(2);

  const U = useMemo(() => calibre * ndiv / ndivmax, [calibre, ndiv, ndivmax]);
  const dU = useMemo(() => (calibre * classe) / 100, [calibre, classe]);
  const rel = U > 0 ? (dU / U) * 100 : 0;
  const fraction = ndivmax > 0 ? ndiv / ndivmax : 0;
  const good = rel < 5 || U === 0;
  const accentColor = good ? "var(--color-green)" : "var(--color-gold)";

  const sliderStyle = { accentColor: "var(--color-accent)", width: "100%" };
  const labelSt: React.CSSProperties = { fontSize: 13, color: "var(--color-text-muted)", width: 96, flexShrink: 0 };
  const valSt: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "var(--color-text)", minWidth: 60, textAlign: "right" };

  return (
    <div style={{ borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden", background: "var(--color-surface-2)", marginTop: 18 }}>

      {/* Mode tabs */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: 8 }}>
        {(["analogique", "numerique"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            fontSize: 12, padding: "5px 14px", borderRadius: 999, cursor: "pointer",
            border: `1px solid ${mode === m ? "rgba(0,200,224,0.5)" : "var(--color-border)"}`,
            background: mode === m ? "rgba(0,200,224,0.1)" : "transparent",
            color: mode === m ? "var(--color-accent)" : "var(--color-text-muted)",
            fontWeight: mode === m ? 700 : 400,
          }}>
            {m === "analogique" ? "Analogique" : "Numérique"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* Dial / digital display */}
        <div style={{ padding: 16, borderRight: "1px solid var(--color-border)", background: "#0d1a0d" }}>
          {mode === "analogique" ? (
            <DialSVG C={calibre} fraction={fraction} U={U} good={good} />
          ) : (
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{
                fontSize: 52, fontWeight: 700, letterSpacing: "-2px",
                color: good ? "#00d4a0" : "#f0b030",
                fontFamily: "monospace",
              }}>
                {U.toFixed(3)}
              </div>
              <div style={{ fontSize: 16, color: "#4a8a4a", marginTop: 6 }}>Volts</div>
              <div style={{
                marginTop: 14, fontSize: 12, padding: "5px 14px", borderRadius: 999,
                display: "inline-block",
                background: good ? "rgba(0,212,160,0.12)" : "rgba(240,176,48,0.12)",
                color: good ? "#00d4a0" : "#f0b030",
              }}>
                {good ? "Bonne précision" : "Incertitude élevée"}
              </div>
            </div>
          )}
        </div>

        {/* Controls + results */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-sub)", marginBottom: 12 }}>
            RÉGLAGES
          </div>
          {[
            { label: "Calibre C", min: 1, max: 50, step: 1, val: calibre, set: setCalibre, fmt: (v: number) => v + " V" },
            { label: "Divisions n", min: 0, max: 150, step: 1, val: ndiv, set: setNdiv, fmt: (v: number) => String(v) },
            { label: "Div. max n₀", min: 50, max: 200, step: 10, val: ndivmax, set: setNdivmax, fmt: (v: number) => String(v) },
            { label: "Classe", min: 0.5, max: 5, step: 0.5, val: classe, set: setClasse, fmt: (v: number) => v.toFixed(1) },
          ].map(({ label, min, max, step, val, set, fmt }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={labelSt}>{label}</span>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(parseFloat(e.target.value))} style={sliderStyle} />
              <span style={valSt}>{fmt(val)}</span>
            </div>
          ))}

          <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-sub)", marginBottom: 8 }}>
            RÉSULTATS
          </div>
          {[
            { label: "Tension U", val: U.toFixed(3) + " V" },
            { label: "Incertitude ΔU", val: "± " + dU.toFixed(3) + " V" },
            { label: "Mesure", val: U.toFixed(2) + " ± " + dU.toFixed(3) },
            { label: "Erreur relative", val: U > 0 ? rel.toFixed(1) + " %" : "—" },
          ].map(({ label, val }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(30,58,110,0.4)" }}>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>{val}</span>
            </div>
          ))}

          <div style={{
            marginTop: 10, padding: "8px 10px", borderRadius: 8,
            fontSize: 12, fontWeight: 700,
            background: good ? "rgba(76,175,130,0.12)" : "rgba(255,193,7,0.12)",
            color: accentColor,
          }}>
            {good ? "Bonne précision (erreur < 5 %)" : "Incertitude élevée (erreur > 5 %)"}
          </div>
        </div>
      </div>

      <div style={{ padding: "9px 16px", borderTop: "1px solid var(--color-border)", fontSize: 12, color: "var(--color-text-sub)", fontFamily: "var(--font-mono)" }}>
        U = C × n / n₀ &nbsp;|&nbsp; ΔU = C × classe / 100
      </div>
    </div>
  );
}
