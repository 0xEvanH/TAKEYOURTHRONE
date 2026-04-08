import { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GOLD, PURPLE, GOLD_A } from "../constants";

const gridPattern = `linear-gradient(${GOLD_A(0.045)} 1px,transparent 1px),linear-gradient(90deg,${GOLD_A(0.045)} 1px,transparent 1px)`;

const bracketPositions: CSSProperties[] = [
  { top: 76, left: 40, borderTop: `1.5px solid ${GOLD_A(0.35)}`, borderLeft: `1.5px solid ${GOLD_A(0.35)}` },
  { top: 76, right: 40, borderTop: `1.5px solid ${GOLD_A(0.35)}`, borderRight: `1.5px solid ${GOLD_A(0.35)}` },
  { bottom: 52, left: 40, borderBottom: `1.5px solid ${GOLD_A(0.35)}`, borderLeft: `1.5px solid ${GOLD_A(0.35)}` },
  { bottom: 52, right: 40, borderBottom: `1.5px solid ${GOLD_A(0.35)}`, borderRight: `1.5px solid ${GOLD_A(0.35)}` },
];

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080808",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: gridPattern,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow — bottom left, matching Hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -100,
          left: -100,
          width: 700,
          height: 700,
          background: `radial-gradient(circle,${GOLD_A(0.09)} 0%,transparent 65%)`,
        }}
      />

      {/* Corner brackets */}
      {bracketPositions.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ width: 22, height: 22, ...s }}
        />
      ))}

      {/* EST. badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: "absolute",
          top: 88,
          left: 56,
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: GOLD,
            display: "block",
          }}
        />
        <span
          className="fb"
          style={{
            color: GOLD,
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.3em",
          }}
        >
          EST. 2025
        </span>
      </motion.div>

      {/* Ghost watermark "404" */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: -40,
          top: "50%",
          transform: "translateY(-52%)",
          lineHeight: 0.85,
        }}
      >
        <span
          className="fd"
          style={
            {
              fontSize: "clamp(200px,28vw,420px)",
              fontWeight: 700,
              WebkitTextStroke: `1.5px ${GOLD_A(0.07)}`,
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.04em",
            } as CSSProperties
          }
        >
          404
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          left: "5vw",
          maxWidth: 620,
          alignSelf: "flex-start",
          padding: "0 56px",
        }}
      >
        {/* Error label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fb"
          style={{
            color: GOLD,
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 18,
            fontSize: 10,
            letterSpacing: "0.4em",
          }}
        >
          Error — Page not found
        </motion.p>

        {/* Headline */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            className="fd"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "#fff",
              fontWeight: 700,
              display: "block",
              fontSize: "clamp(56px,8vw,128px)",
              lineHeight: 0.9,
              letterSpacing: "0.04em",
            }}
          >
            LOST YOUR
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            className="fs"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={
              {
                display: "block",
                fontSize: "clamp(56px,8vw,124px)",
                fontWeight: 200,
                lineHeight: 1.1,
                WebkitTextFillColor: PURPLE,
              } as CSSProperties
            }
          >
            Throne?
          </motion.h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="fb"
          style={{
            color: "rgba(255,255,255,0.35)",
            marginTop: 24,
            maxWidth: 360,
            lineHeight: 1.7,
            fontSize: 12.5,
          }}
        >
          This page doesn't exist or has been moved. Head back and reclaim your spot at the top.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-gold"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            onClick={() => navigate("/")}
          >
            BACK TO HOME →
          </button>
          <button
            className="btn-ghost fb"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
            onClick={() => navigate("/teams")}
          >
            VIEW ROSTERS
          </button>
        </motion.div>
      </div>

      {/* Bottom scanline / divider */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD_A(0.18)}, transparent)`,
        }}
      />
    </div>
  );
}