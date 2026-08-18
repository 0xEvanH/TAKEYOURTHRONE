import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, GOLD_A, EASE_SIGNATURE } from "../constants";
import { DIVISIONS, type Player, type Division } from "../data";
import { PageHero, IndexBadge } from "./UI";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const COACH_ACCENT = "#ff8c33";

// A plain list heading, not the gold-chip eyebrow treatment — these exist to
// distinguish Players from Coaching Staff (real information), not to
// decorate every section the way a repeated eyebrow chip would.
function RosterLabel({ text }: { text: string }) {
  return (
    <div
      className="fb"
      style={{
        color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.3em", fontSize: 10.5, marginBottom: 24, paddingBottom: 12,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {text}
    </div>
  );
}

function FortniteRow({ p, i }: { p: Player; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: EASE_SIGNATURE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 20px", borderRadius: hovered ? 10 : 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        borderLeft: hovered ? `2px solid ${GOLD}` : "2px solid transparent",
        background: hovered ? GOLD_A(0.04) : "transparent",
        boxShadow: hovered ? `0 12px 32px -20px ${GOLD_A(0.6)}` : "none",
        cursor: "pointer", transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <IndexBadge active={hovered}>{p.num}</IndexBadge>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{p.nat}</span>
        <div>
          <div className="fd" style={{ fontSize: "clamp(22px,3vw,42px)", lineHeight: 1, color: hovered ? GOLD : "#fff", transition: "color 0.2s", fontWeight: 600 }}>
            {p.handle}
          </div>
          {p.earnings && (
            <div className="fb" style={{ color: "rgba(255,255,255,0.3)", marginTop: 4, fontSize: 11, letterSpacing: "0.2em" }}>
              EARNINGS: {p.earnings}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
        {p.pr !== undefined && (
          <div style={{ textAlign: "right" }}>
            <div className="fb" style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700, textTransform: "uppercase", fontSize: 9, letterSpacing: "0.25em" }}>PR</div>
            <div className="fd" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 20 }}>{p.pr}k</div>
          </div>
        )}
        <div style={{ textAlign: "right" }}>
          <div className="fb" style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700, textTransform: "uppercase", fontSize: 9, letterSpacing: "0.25em" }}>SINCE</div>
          <div className="fd" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 20 }}>{p.since}</div>
        </div>
      </div>
    </motion.div>
  );
}

function SiegeRow({ p, i }: { p: Player; i: number }) {
  const [hovered, setHovered] = useState(false);
  const isCoach = p.role?.toLowerCase() === "coach";

  const accent = isCoach ? COACH_ACCENT : GOLD;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: EASE_SIGNATURE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 20px", borderRadius: hovered ? 10 : 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        borderLeft: hovered ? `2px solid ${accent}` : "2px solid transparent",
        background: hovered ? `${accent}0a` : "transparent",
        boxShadow: hovered ? `0 12px 32px -20px ${accent}99` : "none",
        cursor: "pointer", transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <IndexBadge active={hovered} color={accent}>{p.num}</IndexBadge>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{p.nat}</span>
        <div>
          <div className="fd" style={{ fontSize: "clamp(22px,3vw,42px)", lineHeight: 1, color: hovered ? accent : "#fff", transition: "color 0.2s", fontWeight: 600 }}>
            {p.handle}
          </div>
          {p.role && (
            <div className="fb" style={{ color: isCoach ? `${COACH_ACCENT}80` : "rgba(255,255,255,0.3)", marginTop: 4, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {p.role}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ textAlign: "right" }}>
          <div className="fb" style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700, textTransform: "uppercase", fontSize: 9, letterSpacing: "0.25em" }}>SINCE</div>
          <div className="fd" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 20 }}>{p.since}</div>
        </div>
      </div>
    </motion.div>
  );
}

function FortniteRoster({ div }: { div: Division }) {
  return (
    <div style={{ background: "#090909", padding: "64px 80px 88px" }}>
      <RosterLabel text="Roster" />
      {div.players.map((p, i) => (
        <FortniteRow key={`${div.id}-${p.handle}`} p={p} i={i} />
      ))}
    </div>
  );
}

function SiegeRoster({ div }: { div: Division }) {
  const players = div.players.filter(p => p.role?.toLowerCase() !== "coach");
  const coaches = div.players.filter(p => p.role?.toLowerCase() === "coach");

  return (
    <div style={{ background: "#090909", padding: "64px 80px 88px" }}>
      <RosterLabel text="Players" />
      {players.map((p, i) => (
        <SiegeRow key={`${div.id}-${p.handle}`} p={p} i={i} />
      ))}

      {coaches.length > 0 && (
        <>
          <div style={{ marginTop: 48 }}>
            <RosterLabel text="Coaching Staff" />
          </div>
          {coaches.map((p, i) => (
            <SiegeRow key={`${div.id}-${p.handle}-coach`} p={p} i={i} />
          ))}
        </>
      )}
    </div>
  );
}

export function TeamsPage() {
  useSEO({
    title: "Teams",
    description:
      "TAKE YOUR THRONE teams - our competitive Fortnite and Rainbow Six Siege rosters, player bios, stats, and achievements.",
    url: "/teams",
  });
  
  const [activeDiv, setActiveDiv] = useState(DIVISIONS[0].id);
  const div = DIVISIONS.find(d => d.id === activeDiv)!;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Divisions"
        title="OUR"
        titleAccent="Teams"
        sub="Two world-class rosters competing at the highest level."
      />

      <div className="shop-filter-bar hide-scrollbar" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 0, overflowX: "auto", padding: "0 80px" }}>
        {DIVISIONS.map(d => {
          const isActive = activeDiv === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDiv(d.id)}
              className="fb"
              style={{
                position: "relative", background: "transparent", border: 0, cursor: "pointer",
                textTransform: "uppercase", whiteSpace: "nowrap",
                padding: "18px 28px", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {d.name}
              {isActive && (
                <motion.span
                  layoutId="division-underline"
                  transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
                  style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: GOLD, boxShadow: `0 0 16px -2px ${GOLD_A(0.7)}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDiv}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
        >
          <div style={{ background: "#0c0c0c", display: "flex", gap: 56, borderBottom: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", padding: "36px 80px" }}>
            {div.stats.map(({ label, value, highlight }) => (
              <div key={label}>
                <div className="fb" style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", marginBottom: 5, fontSize: 9, letterSpacing: "0.3em" }}>
                  {label}
                </div>
                <div className="fd" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.05em", color: highlight ? GOLD : "#fff" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {div.id === "fortnite" ? (
            <FortniteRoster div={div} />
          ) : (
            <SiegeRoster div={div} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}