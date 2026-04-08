import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, GOLD_A } from "../constants";
import { DIVISIONS, type Player, type Division } from "../data";
import { PageHero, SectionLabel } from "./UI";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

function FortniteRow({ p, i }: { p: Player; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        borderLeft: hovered ? `2px solid ${GOLD}` : "2px solid transparent",
        background: hovered ? GOLD_A(0.03) : "transparent",
        cursor: "pointer", transition: "all 0.22s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.2)", minWidth: 26, fontSize: 10 }}>{p.num}</span>
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        borderLeft: hovered ? `2px solid ${isCoach ? "rgba(255,107,0,0.8)" : GOLD}` : "2px solid transparent",
        background: hovered ? (isCoach ? "rgba(255,107,0,0.03)" : GOLD_A(0.03)) : "transparent",
        cursor: "pointer", transition: "all 0.22s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.2)", minWidth: 26, fontSize: 10 }}>{p.num}</span>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{p.nat}</span>
        <div>
          <div className="fd" style={{ fontSize: "clamp(22px,3vw,42px)", lineHeight: 1, color: hovered ? (isCoach ? "#ff6b00" : GOLD) : "#fff", transition: "color 0.2s", fontWeight: 600 }}>
            {p.handle}
          </div>
          {p.role && (
            <div className="fb" style={{ color: isCoach ? "rgba(255,107,0,0.5)" : "rgba(255,255,255,0.3)", marginTop: 4, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
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
      <SectionLabel text="Roster" />
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
      <SectionLabel text="Players" />
      {players.map((p, i) => (
        <SiegeRow key={`${div.id}-${p.handle}`} p={p} i={i} />
      ))}

      {coaches.length > 0 && (
        <>
          <div style={{ marginTop: 48 }}>
            <SectionLabel text="Coaching Staff" />
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

      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 0, overflowX: "auto", padding: "0 80px" }}>
        {DIVISIONS.map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDiv(d.id)}
            className="fb"
            style={{
              background: "transparent", border: 0, cursor: "pointer",
              textTransform: "uppercase", whiteSpace: "nowrap",
              padding: "18px 28px", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              color: activeDiv === d.id ? "#fff" : "rgba(255,255,255,0.4)",
              borderBottom: activeDiv === d.id ? `2px solid ${GOLD}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {d.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDiv}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
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