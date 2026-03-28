"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { Zap, ArrowRightLeft, CircleDot, Gauge } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import SectionCard from "../../components/SectionCard";
import FormulaBox from "../../components/FormulaBox";
import TableOfContents from "../../components/TableOfContents";
import WaveformSVG from "../../components/WaveformSVG";
import VoltageConventionsSchema from "../../components/VoltageConventionsSchema";
import WaveAnatomySchema from "../../components/WaveAnatomySchema";
import UMaxEffFrequencySchema from "../../components/UMaxEffFrequencySchema";
import PotentialDifferenceSchema from "../../components/PotentialDifferenceSchema";
import OscilloscopeInteractive from "../../components/OscilloscopeInteractive";
import VoltmeterInteractive from "../../components/VoltmeterInteractive";
import TensionLawsInteractive from "../../components/TensionLawsInteractive";
import { formulas } from "../../lib/formulas";

type PillProps = { tone: "green" | "red" | "gray"; children: ReactNode };

function Pill({ tone, children }: PillProps) {
  const bg = tone === "green" ? "rgba(76,175,130,0.14)" : tone === "red" ? "rgba(232,83,80,0.14)" : "rgba(158,179,200,0.10)";
  const color = tone === "green" ? "var(--color-green)" : tone === "red" ? "var(--color-red)" : "var(--color-text-muted)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: bg, color, fontSize: 13, letterSpacing: "0.04em", lineHeight: 1, fontWeight: 700 }}>
      {children}
    </span>
  );
}

function SmallCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "22px 22px", boxShadow: "0 4px 24px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "var(--color-accent)" }} />
      <div style={{ paddingLeft: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "var(--color-accent)" }}>{icon}</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>{title}</div>
        </div>
        <div style={{ marginTop: 10, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.8 }}>{children}</div>
      </div>
    </div>
  );
}

function PropertyCard({ color, title, text }: { color: string; title: ReactNode; text: string }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, overflow: "hidden", position: "relative", padding: "18px 18px" }}>
      <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: color }} />
      <div style={{ paddingLeft: 16 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>{title}</div>
        <div style={{ marginTop: 8, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.8 }}>{text}</div>
      </div>
    </div>
  );
}

function DefinitionCard({ color, title, text }: { color: string; title: string; text: string }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, overflow: "hidden", position: "relative", padding: "18px 18px" }}>
      <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: color }} />
      <div style={{ paddingLeft: 16 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>{title}</div>
        <div style={{ marginTop: 8, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.8 }}>{text}</div>
      </div>
    </div>
  );
}

function CharacteristicCard({ topColor, title, formula, text }: { topColor: string; title: string; formula: string; text: string }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 18, overflow: "hidden" }}>
      <div style={{ height: 5, background: topColor, borderRadius: 8, marginBottom: 14 }} />
      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>{title}</div>
      <div style={{ marginTop: 12 }}><FormulaBox formula={formula} /></div>
      <div style={{ marginTop: 12, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.8 }}>{text}</div>
    </div>
  );
}

function AnimatedArrowGroup() {
  return (
    <svg width="520" height="260" viewBox="0 0 520 260" fill="none" aria-hidden style={{ opacity: 0.95 }}>
      <rect x="40" y="70" width="130" height="120" rx="12" stroke="rgba(255,255,255,0.12)" fill="rgba(15,30,51,0.55)" />
      <rect x="200" y="70" width="130" height="120" rx="12" stroke="rgba(255,255,255,0.12)" fill="rgba(15,30,51,0.55)" />
      <rect x="360" y="70" width="130" height="120" rx="12" stroke="rgba(255,255,255,0.12)" fill="rgba(15,30,51,0.55)" />
      <text x="105" y="110" fill="var(--color-text)" fontFamily="var(--font-heading)" fontSize="18" fontWeight="800">G</text>
      <text x="265" y="110" fill="var(--color-text)" fontFamily="var(--font-heading)" fontSize="18" fontWeight="800">R1</text>
      <text x="420" y="110" fill="var(--color-text)" fontFamily="var(--font-heading)" fontSize="18" fontWeight="800">R2</text>
      <path d="M170 130 H200" stroke="rgba(0,200,224,0.35)" strokeWidth="3" strokeLinecap="round" />
      <path d="M330 130 H360" stroke="rgba(0,200,224,0.35)" strokeWidth="3" strokeLinecap="round" />
      {(["U_G", "U_1", "U_2"] as const).map((label, i) => (
        <motion.g key={label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: i * 0.1 }}>
          <path d={i === 0 ? "M110 60 V95" : i === 1 ? "M270 60 V95" : "M430 60 V95"} stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
          <path d={i === 0 ? "M92 74 L110 60 L128 74" : i === 1 ? "M252 74 L270 60 L288 74" : "M412 74 L430 60 L448 74"} fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x={i === 0 ? 80 : i === 1 ? 240 : 400} y="52" fill="var(--color-gold)" fontFamily="var(--font-body)" fontSize="14" fontWeight="800">
            U<tspan baselineShift="sub" fontSize="10">{label === "U_G" ? "G" : label === "U_1" ? "1" : "2"}</tspan>
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function DipoleDiagram() {
  const [hovered, setHovered] = useState<"ab" | "ba" | null>(null);
  return (
    <div style={{ background: "var(--color-surface-2)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 18, position: "relative", minHeight: 260 }}>
      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>Dipôle + flèche</div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
        <svg width="420" height="170" viewBox="0 0 420 170" role="img" aria-label="Schéma dipolaire">
          <path d="M120 85 H160" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
          <path d="M260 85 H300" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="120" cy="85" r="18" fill="rgba(255,193,7,0.12)" stroke="rgba(255,193,7,0.35)" strokeWidth="2" />
          <circle cx="300" cy="85" r="18" fill="rgba(76,175,130,0.12)" stroke="rgba(76,175,130,0.35)" strokeWidth="2" />
          <text x="120" y="60" fill="var(--color-gold)" fontFamily="var(--font-heading)" fontSize="20" fontWeight="900" textAnchor="middle">A</text>
          <text x="300" y="60" fill="var(--color-green)" fontFamily="var(--font-heading)" fontSize="20" fontWeight="900" textAnchor="middle">B</text>
          <g onMouseEnter={() => setHovered("ab")} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
            <path d="M165 85 H255" stroke={hovered === "ab" ? "var(--color-accent)" : "rgba(0,200,224,0.45)"} strokeWidth={hovered === "ab" ? 4 : 3} strokeLinecap="round" />
            <path d="M235 68 L255 85 L235 102" fill="none" stroke={hovered === "ab" ? "var(--color-accent)" : "rgba(0,200,224,0.45)"} strokeWidth={hovered === "ab" ? 4 : 3} strokeLinecap="round" strokeLinejoin="round" />
            <text x="212" y="145" fill="var(--color-text-muted)" fontFamily="var(--font-body)" fontSize="14" textAnchor="middle">U<tspan baselineShift="sub" fontSize="10">AB</tspan></text>
          </g>
          <g onMouseEnter={() => setHovered("ba")} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
            <path d="M165 85 H255" stroke={hovered === "ba" ? "var(--color-gold)" : "rgba(255,193,7,0.45)"} strokeWidth={hovered === "ba" ? 4 : 3} strokeLinecap="round" />
            <path d="M185 68 L165 85 L185 102" fill="none" stroke={hovered === "ba" ? "var(--color-gold)" : "rgba(255,193,7,0.45)"} strokeWidth={hovered === "ba" ? 4 : 3} strokeLinecap="round" strokeLinejoin="round" />
            <text x="212" y="20" fill="var(--color-text-sub)" fontFamily="var(--font-body)" fontSize="14" textAnchor="middle">U<tspan baselineShift="sub" fontSize="10">BA</tspan></text>
          </g>
        </svg>
      </div>
      {hovered && (
        <div role="status" style={{ position: "absolute", left: 18, right: 18, bottom: 18, padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(8,18,30,0.75)", color: "var(--color-text)", fontSize: 13, lineHeight: 1.6 }}>
          {hovered === "ab" ? "Flèche de A vers B : U_AB mesure V_A − V_B." : "Flèche de B vers A : U_BA change de signe."}
        </div>
      )}
    </div>
  );
}

function ParallelIllustration() {
  return (
    <div style={{ background: "var(--color-surface-2)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 18, marginTop: 12 }}>
      <svg width="520" height="210" viewBox="0 0 520 210" aria-hidden>
        <rect x="80" y="40" width="360" height="130" rx="14" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.10)" />
        <path d="M130 105 H170" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
        <path d="M350 105 H390" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
        <path d="M170 75 V135" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
        <path d="M350 75 V135" stroke="rgba(0,200,224,0.35)" strokeWidth="4" strokeLinecap="round" />
        <rect x="190" y="58" width="70" height="95" rx="12" fill="rgba(255,193,7,0.06)" stroke="rgba(255,193,7,0.35)" />
        <rect x="260" y="58" width="70" height="95" rx="12" fill="rgba(255,193,7,0.06)" stroke="rgba(255,193,7,0.35)" />
        <text x="225" y="105" textAnchor="middle" fill="var(--color-gold)" fontFamily="var(--font-heading)" fontSize="18" fontWeight="900">R1</text>
        <text x="295" y="105" textAnchor="middle" fill="var(--color-gold)" fontFamily="var(--font-heading)" fontSize="18" fontWeight="900">R2</text>
        {[0, 1].map((i) => (
          <motion.g key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <path d={i === 0 ? "M185 40 V90" : "M345 40 V90"} stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
            <path d={i === 0 ? "M165 58 L185 40 L205 58" : "M325 58 L345 40 L365 58"} stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x={i === 0 ? 185 : 345} y="34" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-body)" fontSize="14" fontWeight="900">
              U<tspan baselineShift="sub" fontSize="10">{i === 0 ? "1" : "2"}</tspan>
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function CoursPage() {
  return (
    <div style={{ background: "var(--color-bg)", paddingBottom: 80 }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-10">

          <div>
            <div style={{ paddingTop: 28 }}>
              <TableOfContents />
            </div>
          </div>

          <div>

            {/* SECTION I */}
            <div style={{ paddingTop: 28 }} id="section-i" />
            <SectionCard accentColor="var(--color-accent)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                I · Potentiel électrique et tension
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SmallCard icon={<CircleDot size={26} />} title="Potentiel V">
                  Le potentiel en un point décrit une référence d&rsquo;énergie électrique par unité de charge.
                  Plus le potentiel est élevé, plus le point est &ldquo;énergétiquement favorable&rdquo; pour les charges positives.
                </SmallCard>
                <SmallCard icon={<ArrowRightLeft size={26} />} title="Tension U">
                  La tension entre deux points mesure la différence d&rsquo;énergie (par unité de charge) entre ces points.
                  Elle détermine le sens et l&rsquo;intensité de la circulation de charges.
                </SmallCard>
              </div>
              <PotentialDifferenceSchema />
              <div style={{ marginTop: 22 }}>
                <FormulaBox formula={formulas.UAB_VA_VB} label="Définition — différence de potentiel" />
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                <Pill tone="green">Si <InlineMath math={"V_A > V_B"} /> alors <InlineMath math={"U_{AB} > 0"} /></Pill>
                <Pill tone="red">Si <InlineMath math={"V_A < V_B"} /> alors <InlineMath math={"U_{AB} < 0"} /></Pill>
                <Pill tone="gray">Si <InlineMath math={"V_A = V_B"} /> alors <InlineMath math={"U_{AB} = 0"} /></Pill>
              </div>
            </SectionCard>

            {/* SECTION II */}
            <div style={{ paddingTop: 48 }} id="section-ii" />
            <SectionCard accentColor="var(--color-gold)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                II · Représentation par flèche
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85 }}>
                    Pour définir la tension U<sub>AB</sub>, on choisit un sens (de A vers B).
                    La flèche indique quel point est pris comme référence pour le signe de la différence de potentiel.
                  </p>
                  <p style={{ color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85, marginTop: 10 }}>
                    Si la flèche pointe vers un potentiel plus grand, la tension sera positive ; sinon elle sera négative.
                  </p>
                </div>
                <DipoleDiagram />
              </div>
              <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
                <PropertyCard color="var(--color-gold)" title={<InlineMath math={formulas.UAB_neg_UBA} />} text="Inverser les points A et B change le sens de la flèche : le signe de la tension s'inverse." />
                <PropertyCard color="var(--color-green)" title={<InlineMath math={formulas.UAB_gt0} />} text="La tension est positive quand V_A > V_B : le point A est à un potentiel plus élevé." />
                <PropertyCard color="var(--color-red)" title={<InlineMath math={formulas.UAB_lt0} />} text="La tension est négative quand V_A < V_B : le potentiel de B est supérieur." />
              </div>
              <VoltageConventionsSchema />
            </SectionCard>

            {/* SECTION III — with VoltmeterInteractive */}
            <div style={{ paddingTop: 48 }} id="section-iii" />
            <SectionCard accentColor="var(--color-green)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                III · Mesure au voltmètre
              </h2>
              <div style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(76,175,130,0.08)", display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <Gauge size={20} style={{ color: "var(--color-green)", flexShrink: 0 }} />
                <div style={{ fontWeight: 700, letterSpacing: "0.06em", fontSize: 14 }}>Branchement en dérivation</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, letterSpacing: "0.04em" }}>Incertitude de mesure</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85, marginTop: 10 }}>
                    Un voltmètre peut donner une valeur approximative. L&rsquo;écart possible entre la valeur mesurée
                    et la valeur réelle est lié à la classe et au calibre utilisé.
                  </p>
                  <div style={{ marginTop: 16 }}><FormulaBox formula={formulas.U_C_n_n0} label="Lecture de la tension" /></div>
                  <div style={{ marginTop: 14 }}><FormulaBox formula={formulas.DeltaU} label="Incertitude" /></div>
                </div>
                <div style={{ marginTop: 18, background: "var(--color-surface-2)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ color: "var(--color-green)", flexShrink: 0 }}><Zap size={20} /></div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>Voltmètre numérique</div>
                    <div style={{ marginTop: 8, color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85 }}>
                      Il affiche directement la valeur de la tension et réduit les erreurs liées à la lecture.
                      L&rsquo;incertitude dépend des spécifications de l&rsquo;appareil et de l&rsquo;échelle choisie.
                    </div>
                  </div>
                </div>
              </div>
              <VoltmeterInteractive />
            </SectionCard>

            {/* SECTION IV — with TensionLawsInteractive */}
            <div style={{ paddingTop: 48 }} id="section-iv" />
            <SectionCard accentColor="var(--color-gold)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                IV · Lois des tensions
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, letterSpacing: "0.04em" }}>Série : G + R1 + R2</h3>
                  <div style={{ marginTop: 14 }}><AnimatedArrowGroup /></div>
                  <div style={{ marginTop: 16 }}><FormulaBox formula={formulas.UG_sum} label="Loi des tensions en série" /></div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, letterSpacing: "0.04em" }}>Dérivation (branches en parallèle)</h3>
                  <ParallelIllustration />
                  <div style={{ marginTop: 16 }}><FormulaBox formula={formulas.UG_equal} label="Loi des tensions en dérivation" /></div>
                </div>
              </div>
              <TensionLawsInteractive />
            </SectionCard>

            {/* SECTION V — with OscilloscopeInteractive */}
            <div style={{ paddingTop: 48 }} id="section-v" />
            <SectionCard accentColor="var(--color-accent)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                V · L&rsquo;oscilloscope et la tension continue
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.85, marginBottom: 18 }}>
                On mesure une tension en comptant les divisions verticales entre l&rsquo;axe central et le signal,
                puis on multiplie par la sensibilité verticale S<sub>V</sub>. Utilisez les curseurs ci-dessous
                pour explorer les différents types de signaux et lire les grandeurs directement.
              </p>
              <div style={{ marginBottom: 18 }}>
                <FormulaBox formula={formulas.U_SV_Y} label="Relation de lecture" />
              </div>
              <OscilloscopeInteractive />
            </SectionCard>

            {/* SECTION VI */}
            <div style={{ paddingTop: 48 }} id="section-vi" />
            <SectionCard accentColor="var(--color-purple)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                VI · Tensions variable, alternative, périodique
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
                <DefinitionCard color="var(--color-accent)" title="Variable" text="La tension variable change avec le temps : sa valeur n'est pas constante." />
                <DefinitionCard color="var(--color-gold)" title="Alternative" text="La tension alternative change de signe périodiquement : elle passe par des valeurs positives et négatives." />
                <DefinitionCard color="var(--color-green)" title="Périodique" text="Une tension périodique se répète identiquement au bout d'un même intervalle de temps : la période T." />
              </div>
              <WaveAnatomySchema />
              <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
                {([
                  { type: "sine", color: "var(--color-accent)", label: "Sinusoïdale" },
                  { type: "square", color: "var(--color-gold)", label: "Rectangulaire" },
                  { type: "triangle", color: "var(--color-green)", label: "Triangulaire" },
                ] as const).map(({ type, color, label }) => (
                  <div key={type}>
                    <WaveformSVG type={type} color={color} animated />
                    <div style={{ marginTop: 10, textAlign: "center", color, fontWeight: 700, letterSpacing: "0.04em", fontSize: 13 }}>{label}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* SECTION VII */}
            <div style={{ paddingTop: 48 }} id="section-vii" />
            <SectionCard accentColor="var(--color-gold)">
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 18 }}>
                VII · Caractéristiques de la tension alternative
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}>
                <CharacteristicCard topColor="var(--color-accent)" title="U_max" formula={formulas.Umax} text="Amplitude maximale atteinte par la tension alternative." />
                <CharacteristicCard topColor="var(--color-gold)" title="U_eff" formula={formulas.Ueff} text="Valeur efficace : tension équivalente pour produire le même effet qu'une tension continue." />
                <CharacteristicCard topColor="var(--color-green)" title="Période T" formula={formulas.T} text="Temps nécessaire pour que le signal effectue un cycle complet." />
                <CharacteristicCard topColor="var(--color-purple)" title="Fréquence f" formula={formulas.f} text="Nombre de cycles réalisés par seconde. En France, le réseau est à 50 Hz." />
              </div>
              <UMaxEffFrequencySchema />
              <div style={{ marginTop: 18, padding: "18px 20px", borderRadius: 12, border: "1px solid var(--color-border)", background: "rgba(255,193,7,0.05)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.04em" }}>Exemple guidé</div>
                <div style={{ marginTop: 4, color: "var(--color-text-sub)", fontSize: 12 }}>S_V = 2 V/div, Y = 3 div, S_H = 5 ms/div, X = 4 div</div>
                <div style={{ marginTop: 12, color: "var(--color-text-muted)", lineHeight: 2, fontSize: 15 }}>
                  <div><InlineMath math={"U_{max} = 3 \\times 2 = 6\\,\\text{V}"} /></div>
                  <div><InlineMath math={"T = 4 \\times 5\\,\\text{ms} = 20\\,\\text{ms}"} /></div>
                  <div><InlineMath math={"f = \\dfrac{1}{T} = 50\\,\\text{Hz}"} /></div>
                  <div><InlineMath math={"U_{eff} \\approx 0{,}707 \\times 6 \\approx 4{,}24\\,\\text{V}"} /></div>
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}
