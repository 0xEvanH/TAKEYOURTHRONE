import { useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { GOLD, GOLD_A, GOLD_GLOW, EASE_SIGNATURE } from "../constants";
import { STAFF } from "../data";
import { PageHero } from "./UI";
import { AmbientGradient } from "./AmbientGradient";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const CARD_WIDTH = 380;
const CARD_GAP = 16;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const N = STAFF.length;
// Three copies laid end to end so there's always a full card's width of
// "more content" to drag/animate toward in either direction; positions
// that drift into the outer copies get silently re-centered into the
// middle one once a transition settles (identical content at the
// equivalent modular position, so the jump is invisible).
const EXTENDED = [...STAFF, ...STAFF, ...STAFF];

export function OrgPage() {
  useSEO({
    title: "Organisation",
    description:
      "TAKE YOUR THRONE organisation - our dedicated and passionate team behind the scenes, driving our mission to be the best in competitive gaming.",
    url: "/org",
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [pos, setPos] = useState(N); // start on the first card of the middle copy

  const centerOffset = () => (trackRef.current?.offsetWidth ?? 0) / 2 - CARD_WIDTH / 2;

  // Position the initial card dead center before first paint — x starts at
  // 0 otherwise, which is only correct by coincidence.
  useLayoutEffect(() => {
    x.set(centerOffset() - pos * CARD_STRIDE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (target: number) => {
    setPos(target);
    animate(x, centerOffset() - target * CARD_STRIDE, {
      type: "spring", stiffness: 300, damping: 35,
      onComplete: () => {
        const wrapped = (((target % N) + N) % N) + N;
        if (wrapped !== target) {
          setPos(wrapped);
          x.set(centerOffset() - wrapped * CARD_STRIDE);
        }
      },
    });
  };

  const onDragEnd = () => {
    const nearest = Math.round((centerOffset() - x.get()) / CARD_STRIDE);
    goTo(nearest);
  };

  const dragConstraints = {
    left: centerOffset() - (EXTENDED.length - 1) * CARD_STRIDE,
    right: centerOffset(),
  };

  const activeRealIndex = ((pos % N) + N) % N;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Organisation"
        title="THE"
        titleAccent="People"
        sub="The owners and staff behind TAKE YOUR THRONE."
      />

      <div style={{ position: "relative", zIndex: 0, background: "#090909", padding: "104px 0 120px", overflow: "hidden" }}>
        <AmbientGradient variant="center" />
        <div ref={trackRef} style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
            onDragEnd={onDragEnd}
            style={{ x, display: "flex", gap: CARD_GAP, width: "max-content", cursor: "grab" }}
            whileDrag={{ cursor: "grabbing" }}
          >
            {EXTENDED.map((member, idx) => (
              <StaffCard
                key={`${member.id}-${idx}`}
                member={member}
                active={idx === pos}
                onClick={() => goTo(idx)}
              />
            ))}
          </motion.div>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 80px 0" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {STAFF.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // Jump to whichever copy of this real index is nearest the
                  // current position, so the dot never causes a long
                  // full-loop scroll for what should be a short hop.
                  const candidates = [i, i + N, i + 2 * N];
                  const closest = candidates.reduce((a, b) => (Math.abs(b - pos) < Math.abs(a - pos) ? b : a));
                  goTo(closest);
                }}
                style={{
                  width: i === activeRealIndex ? 28 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: 0,
                  background: i === activeRealIndex ? GOLD : "rgba(255,255,255,0.15)",
                  boxShadow: i === activeRealIndex ? GOLD_GLOW(0.45) : "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <ArrowButton direction="left" onClick={() => goTo(pos - 1)} />
            <ArrowButton direction="right" onClick={() => goTo(pos + 1)} />
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
      transition={{ duration: 0.3, ease: EASE_SIGNATURE }}
      style={{
        width: CARD_WIDTH,
        flexShrink: 0,
        borderRadius: 16,
        background: lit ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${lit ? GOLD_A(0.35) : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        boxShadow: lit ? `0 28px 60px -30px ${GOLD_A(0.55)}` : "none",
        padding: "64px 44px 56px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
        userSelect: "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: lit ? "linear-gradient(90deg, #7c3aed, #f0a500)" : "transparent",
        boxShadow: lit ? GOLD_GLOW(0.4) : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }} />

      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          marginBottom: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: lit ? GOLD_A(0.12) : "rgba(255,255,255,0.04)",
          border: `1px solid ${lit ? GOLD_A(0.35) : "rgba(255,255,255,0.08)"}`,
          boxShadow: lit ? GOLD_GLOW(0.55) : "none",
          transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden", // important for circular images
        }}
      >
        {member.icon ? (
          <img
            src={member.icon}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span
            className="fd"
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: lit ? GOLD : "rgba(255,255,255,0.25)",
              transition: "color 0.22s",
            }}
          >
            {member.name.charAt(0)}
          </span>
        )}
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

function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        background: hovered ? GOLD_A(0.08) : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${hovered ? GOLD_A(0.55) : "rgba(255,255,255,0.12)"}`,
        boxShadow: hovered ? GOLD_GLOW(0.4) : "none",
        color: hovered ? GOLD : "rgba(255,255,255,0.45)",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
        flexShrink: 0,
      }}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}
