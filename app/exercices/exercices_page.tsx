"use client";

import ExerciseCard from "../../components/ExerciseCard";
import FormulaBox from "../../components/FormulaBox";
import { formulas } from "../../lib/formulas";

export default function ExercicesPage() {
  return (
    <div style={{ background: "var(--color-bg)", paddingBottom: 80 }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div style={{ paddingTop: 36 }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            Exercices
          </h1>
          <p style={{ marginTop: 10, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85, maxWidth: 640 }}>
            Entraîne-toi avec des exercices guidés : calcule, vérifie les lois, puis relie
            la lecture de l&rsquo;oscilloscope aux grandeurs du cours.
          </p>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>

            <ExerciseCard
              title="Exercice 1 — Voltmètre à aiguille"
              difficulty="Débutant"
              prompt={
                <>
                  Données :{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>C = 10 V</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>n = 75</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>n₀ = 150</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>classe = 2</span>.{" "}
                  Calculer <span style={{ fontFamily: "var(--font-mono)" }}>U</span> et{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>ΔU</span>.
                </>
              }
              solution={
                <div style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: 15 }}>
                  <FormulaBox formula={formulas.U_C_n_n0} label="Calcul de la tension" />
                  <div style={{ marginTop: 10 }}>
                    U = 10 × (75/150) = 10 × 0,5 ={" "}
                    <span style={{ color: "var(--color-text)", fontWeight: 700 }}>5 V</span>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <FormulaBox formula={formulas.DeltaU} label="Incertitude" />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    ΔU = (10 × 2) / 100 = 20/100 ={" "}
                    <span style={{ color: "var(--color-text)", fontWeight: 700 }}>0,2 V</span>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: "rgba(0,200,224,0.08)",
                      border: "1px solid rgba(0,200,224,0.2)",
                      color: "var(--color-text)",
                      fontWeight: 700,
                    }}
                  >
                    Résultat : U = 5,0 V ± 0,2 V
                  </div>
                </div>
              }
            />

            <ExerciseCard
              title="Exercice 2 — Loi des tensions en série"
              difficulty="Débutant"
              prompt={
                <>
                  Données :{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>U_G = 12 V</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>U₁ = 4,5 V</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>U₂ = 7,5 V</span>.{" "}
                  Vérifier la loi.
                </>
              }
              solution={
                <div style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: 15 }}>
                  <FormulaBox formula={formulas.UG_sum} label="Loi des tensions en série" />
                  <div style={{ marginTop: 10 }}>
                    U₁ + U₂ = 4,5 + 7,5 ={" "}
                    <span style={{ color: "var(--color-text)", fontWeight: 700 }}>12 V</span>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: "rgba(0,200,224,0.08)",
                      border: "1px solid rgba(0,200,224,0.2)",
                      color: "var(--color-text)",
                      fontWeight: 700,
                    }}
                  >
                    Donc : U_G = U₁ + U₂ ✓
                  </div>
                </div>
              }
            />

            <ExerciseCard
              title="Exercice 3 — Oscilloscope"
              difficulty="Intermédiaire"
              prompt={
                <>
                  Données :{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>S_v = 2 V/div</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>Y = 3 div</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>S_H = 5 ms/div</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>X = 4 div</span>.{" "}
                  Trouver{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>U_max</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>T</span>,{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>f</span> et{" "}
                  <span style={{ fontFamily: "var(--font-mono)" }}>U_eff</span>.
                </>
              }
              solution={
                <div style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: 15 }}>
                  <div>
                    <FormulaBox formula={formulas.Umax} label="Tension maximale" />
                    <div style={{ marginTop: 10 }}>
                      U_max = 3 × 2 ={" "}
                      <span style={{ color: "var(--color-text)", fontWeight: 700 }}>6 V</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormulaBox formula={formulas.T} label="Période T" />
                    <div style={{ marginTop: 10 }}>
                      T = 4 × 5 ms ={" "}
                      <span style={{ color: "var(--color-text)", fontWeight: 700 }}>20 ms</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormulaBox formula={formulas.f} label="Fréquence f" />
                    <div style={{ marginTop: 10 }}>
                      f = 1/T = 1/0,02 s ={" "}
                      <span style={{ color: "var(--color-text)", fontWeight: 700 }}>50 Hz</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <FormulaBox formula={formulas.Ueff} label="Tension efficace U_eff" />
                    <div style={{ marginTop: 10 }}>
                      U_eff ≈ 0,707 × 6 ≈{" "}
                      <span style={{ color: "var(--color-text)", fontWeight: 700 }}>4,24 V</span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: "rgba(0,200,224,0.08)",
                      border: "1px solid rgba(0,200,224,0.2)",
                      color: "var(--color-text)",
                      fontWeight: 700,
                    }}
                  >
                    U_max = 6 V · T = 20 ms · f = 50 Hz · U_eff ≈ 4,24 V
                  </div>
                </div>
              }
            />

          </div>
        </div>
      </div>
    </div>
  );
}
