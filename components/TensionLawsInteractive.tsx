"use client";

import { useState } from "react";

export default function TensionLawsInteractive() {
  const [mode, setMode] = useState<"serie" | "derivation">("serie");
  const [ug, setUg] = useState(12);
  const [u1, setU1] = useState(4.5);
  const [u2, setU2] = useState(7.5);

  const serieSum = parseFloat((u1 + u2).toFixed(3));
  const serieOk = Math.abs(serieSum - ug) < 0.01;
  const derivOk = Math.abs(u1 - ug) < 0.01 && Math.abs(u2 - ug) < 0.01;

  const sliderStyle = { accentColor: "var(--color-accent)", width: "100%" };
  const labelSt = { fontSize: 13, color: "var(--color-text-muted)", width: 80, flexShrink: 0 as const };
  const valSt = { fontSize: 13, fontWeight: 600, color: "var(--color-text)", minWidth: 52, textAlign: "right" as const };

  return (
    <div style={{ borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden", background: "var(--color-surface-2)", marginTop: 18 }}>

      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: 8 }}>
        {([["serie", "En série"], ["derivation", "En dérivation"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setMode(key)} style={{
            fontSize: 12, padding: "5px 14px", borderRadius: 999, cursor: "pointer",
            border: `1px solid ${mode === key ? "rgba(0,200,224,0.5)" : "var(--color-border)"}`,
            background: mode === key ? "rgba(0,200,224,0.1)" : "transparent",
            color: mode === key ? "var(--color-accent)" : "var(--color-text-muted)",
            fontWeight: mode === key ? 700 : 400,
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>

        {/* Circuit diagram */}
        <div style={{ padding: 16, borderRight: "1px solid var(--color-border)" }}>
          {mode === "serie" ? (
            <svg viewBox="0 0 320 160" width="100%" role="img" aria-label="Circuit série">
              {/* Wire */}
              <path d="M20 80 H60" stroke="rgba(0,200,224,0.5)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M140 80 H180" stroke="rgba(0,200,224,0.5)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M260 80 H300" stroke="rgba(0,200,224,0.5)" strokeWidth="3" strokeLinecap="round"/>
              {/* G */}
              <rect x="20" y="55" width="40" height="50" rx="8" fill="rgba(21,86,168,0.2)" stroke="rgba(21,86,168,0.5)" strokeWidth="2"/>
              <text x="40" y="84" textAnchor="middle" fill="var(--color-blue-lt)" fontSize="14" fontWeight="700" fontFamily="var(--font-heading)">G</text>
              <text x="40" y="42" textAnchor="middle" fill="var(--color-gold)" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">{ug}V</text>
              {/* R1 */}
              <rect x="140" y="55" width="40" height="50" rx="8" fill="rgba(0,188,212,0.1)" stroke="rgba(0,188,212,0.4)" strokeWidth="2"/>
              <text x="160" y="84" textAnchor="middle" fill="var(--color-accent)" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">R1</text>
              <text x="160" y="42" textAnchor="middle" fill="var(--color-gold)" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">{u1}V</text>
              {/* R2 */}
              <rect x="260" y="55" width="40" height="50" rx="8" fill="rgba(0,188,212,0.1)" stroke="rgba(0,188,212,0.4)" strokeWidth="2"/>
              <text x="280" y="84" textAnchor="middle" fill="var(--color-accent)" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">R2</text>
              <text x="280" y="42" textAnchor="middle" fill="var(--color-gold)" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">{u2}V</text>
              {/* sum */}
              <text x="160" y="148" textAnchor="middle" fill={serieOk ? "var(--color-green)" : "var(--color-red)"} fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">
                U₁+U₂ = {serieSum}V {serieOk ? "= U_G ✓" : "≠ U_G"}
              </text>
            </svg>
          ) : (
            <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Circuit dérivation">
              <path d="M20 90 H60" stroke="rgba(0,200,224,0.5)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M260 90 H300" stroke="rgba(0,200,224,0.5)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M60 50 H260" stroke="rgba(0,200,224,0.3)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M60 130 H260" stroke="rgba(0,200,224,0.3)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M60 50 V130" stroke="rgba(0,200,224,0.3)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M260 50 V130" stroke="rgba(0,200,224,0.3)" strokeWidth="2" strokeLinecap="round"/>
              <rect x="20" y="65" width="40" height="50" rx="8" fill="rgba(21,86,168,0.2)" stroke="rgba(21,86,168,0.5)" strokeWidth="2"/>
              <text x="40" y="94" textAnchor="middle" fill="var(--color-blue-lt)" fontSize="14" fontWeight="700" fontFamily="var(--font-heading)">G</text>
              <rect x="120" y="28" width="80" height="44" rx="8" fill="rgba(0,188,212,0.1)" stroke="rgba(0,188,212,0.4)" strokeWidth="2"/>
              <text x="160" y="54" textAnchor="middle" fill="var(--color-accent)" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">R1 — {u1}V</text>
              <rect x="120" y="108" width="80" height="44" rx="8" fill="rgba(0,188,212,0.1)" stroke="rgba(0,188,212,0.4)" strokeWidth="2"/>
              <text x="160" y="134" textAnchor="middle" fill="var(--color-accent)" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">R2 — {u2}V</text>
              <text x="160" y="170" textAnchor="middle" fill={derivOk ? "var(--color-green)" : "var(--color-red)"} fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">
                {derivOk ? "U_G = U₁ = U₂ ✓" : "Réglez U₁ et U₂ = U_G"}
              </text>
            </svg>
          )}
        </div>

        {/* Sliders */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-sub)", marginBottom: 12 }}>TENSIONS</div>
          {[
            { label: "U_G (V)", min: 1, max: 24, step: 0.5, val: ug, set: setUg },
            { label: "U₁ (V)", min: 0, max: 20, step: 0.5, val: u1, set: setU1 },
            { label: "U₂ (V)", min: 0, max: 20, step: 0.5, val: u2, set: setU2 },
          ].map(({ label, min, max, step, val, set }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={labelSt}>{label}</span>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(parseFloat(e.target.value))} style={sliderStyle} />
              <span style={valSt}>{val.toFixed(1)} V</span>
            </div>
          ))}

          <div style={{
            marginTop: 8, padding: "10px 12px", borderRadius: 10,
            background: mode === "serie"
              ? (serieOk ? "rgba(76,175,130,0.12)" : "rgba(239,83,80,0.10)")
              : (derivOk ? "rgba(76,175,130,0.12)" : "rgba(239,83,80,0.10)"),
            border: `1px solid ${(mode === "serie" ? serieOk : derivOk) ? "rgba(76,175,130,0.3)" : "rgba(239,83,80,0.3)"}`,
            fontSize: 13, fontWeight: 700,
            color: (mode === "serie" ? serieOk : derivOk) ? "var(--color-green)" : "var(--color-red)",
          }}>
            {mode === "serie"
              ? (serieOk ? `U₁ + U₂ = ${serieSum} V = U_G ✓` : `U₁ + U₂ = ${serieSum} V ≠ U_G (${ug} V)`)
              : (derivOk ? "U_G = U₁ = U₂ ✓" : `Réglez U₁ et U₂ à ${ug} V`)}
          </div>
        </div>
      </div>
    </div>
  );
}
