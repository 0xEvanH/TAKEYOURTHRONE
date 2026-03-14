import { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { GOLD, GOLD_A } from "../constants";
import { STAFF } from "../data";
import { PageHero } from "./UI";
import { Footer } from "./Footer";

const CARD_WIDTH = 380;
const CARD_GAP = 16;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

export function OrgPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalWidth = STAFF.length * CARD_STRIDE - CARD_GAP;

  const getMaxDrag = () => {
    if (!trackRef.current) return 0;
    return Math.max(0, totalWidth - trackRef.current.offsetWidth);
  };

  const snapTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, STAFF.length - 1));
    setActiveIndex(clamped);
    animate(x, -clamped * CARD_STRIDE, { type: "spring", stiffness: 300, damping: 35 });
  };

  const onDragEnd = () => {
    const current = x.get();
    const nearest = Math.round(-current / CARD_STRIDE);
    snapTo(nearest);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Organisation"
        title="THE"
        titleAccent="People"
        sub="The owners and staff behind TAKE YOUR THRONE."
      />

      <div style={{ background: "#090909", padding: "104px 0 120px" }}>
        <div ref={trackRef} style={{ overflow: "hidden", paddingLeft: 80 }}>
          <motion.div
            drag="x"
            dragConstraints={{ left: -getMaxDrag(), right: 0 }}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
            onDragEnd={onDragEnd}
            style={{ x, display: "flex", gap: CARD_GAP, width: "max-content", cursor: "grab" }}
            whileDrag={{ cursor: "grabbing" }}
          >
            {STAFF.map((member, i) => (
              <StaffCard
                key={member.id}
                member={member}
                active={i === activeIndex}
                onClick={() => snapTo(i)}
              />
            ))}
          </motion.div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 80px 0" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {STAFF.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
                style={{
                  width: i === activeIndex ? 28 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: 0,
                  background: i === activeIndex ? GOLD : "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <ArrowButton
              direction="left"
              disabled={activeIndex === 0}
              onClick={() => snapTo(activeIndex - 1)}
            />
            <ArrowButton
              direction="right"
              disabled={activeIndex === STAFF.length - 1}
              onClick={() => snapTo(activeIndex + 1)}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function StaffCard({ member, active, onClick }: { member: typeof STAFF[0]; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered || active;

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.97 }}
      transition={{ duration: 0.3 }}
      style={{
        width: CARD_WIDTH,
        flexShrink: 0,
        background: lit ? GOLD_A(0.04) : "#0f0f0f",
        border: `1px solid ${lit ? GOLD_A(0.25) : "rgba(255,255,255,0.06)"}`,
        padding: "64px 44px 56px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.22s, border-color 0.22s",
        userSelect: "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: lit ? GOLD : "transparent",
        transition: "background 0.22s",
      }} />

      <div
        style={{
          width: 80, height: 80, borderRadius: "50%", marginBottom: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: lit ? GOLD_A(0.12) : "rgba(255,255,255,0.04)",
          border: `1px solid ${lit ? GOLD_A(0.35) : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.22s",
        }}
      >
        <span className="fd" style={{ fontSize: 28, fontWeight: 700, color: lit ? GOLD : "rgba(255,255,255,0.25)", transition: "color 0.22s" }}>
          {member.name.charAt(0)}
        </span>
      </div>

      <div className="fb" style={{
        color: lit ? GOLD : "rgba(255,255,255,0.3)",
        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.35em", marginBottom: 14,
        transition: "color 0.22s",
      }}>
        {member.role}
      </div>

      <div className="fd" style={{
        color: "#fff", fontWeight: 600,
        fontSize: "clamp(24px,2.5vw,36px)",
        lineHeight: 1.05, letterSpacing: "0.02em",
      }}>
        {member.name}
      </div>
    </motion.div>
  );
}

function ArrowButton({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44,
        background: "transparent",
        border: `1px solid ${!disabled && hovered ? GOLD : "rgba(255,255,255,0.12)"}`,
        color: disabled ? "rgba(255,255,255,0.12)" : hovered ? GOLD : "rgba(255,255,255,0.45)",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}