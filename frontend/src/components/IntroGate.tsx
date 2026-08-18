import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, PURPLE, EASE_SIGNATURE } from "../constants";
import { LogoMark } from "./UI";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SESSION_KEY = "tyt-intro-seen";

type Phase = "loading" | "ready" | "powering" | "done";

function initialPhase(): Phase {
  if (typeof window === "undefined") return "done";
  return sessionStorage.getItem(SESSION_KEY) ? "done" : "loading";
}

interface IntroGateProps {
  /** Called once, the moment the gate finishes (including immediately, if
   *  this session already saw it). The route content underneath is not
   *  mounted until this fires — see App.tsx — so its own entrance
   *  animations play for real instead of resolving silently behind the
   *  overlay. */
  onDone?: () => void;
}

/**
 * One-time brand entrance, shown once per browser session (sessionStorage
 * flag — a hard refresh mid-session won't replay it, a new tab/session
 * will).
 */
export function IntroGate({ onDone }: IntroGateProps) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(initialPhase);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      onDone?.();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("ready"), reduced ? 0 : 1300);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  const enter = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    if (reduced) {
      setPhase("done");
      return;
    }
    setPhase("powering");
    const t = setTimeout(() => setPhase("done"), 620);
    return () => clearTimeout(t);
  };

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
        style={{
          position: "fixed", inset: 0, zIndex: 300, background: "#050505",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26,
          overflow: "hidden",
        }}
      >
        {phase === "powering" && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: [0, 1, 0], scale: [0.25, 3.5, 5] }}
            transition={{ duration: 0.6, times: [0, 0.35, 1], ease: "easeOut" }}
            style={{
              position: "absolute", width: 44, height: 44, borderRadius: "50%",
              background: `radial-gradient(circle, #fff 0%, ${GOLD} 32%, ${PURPLE} 65%, transparent 76%)`,
            }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: phase === "powering" ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_SIGNATURE }}
        >
          <LogoMark />
        </motion.div>

        {phase !== "powering" && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 9.5, letterSpacing: "0.35em" }}
          >
            HONORA VINCENTIUM
          </motion.span>
        )}

        {phase === "loading" && (
          <div style={{ width: 120, height: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden", borderRadius: 2 }}>
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: "100%" }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "55%", height: "100%", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            />
          </div>
        )}

        {phase === "ready" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
            className="btn-gold fb" onClick={enter} style={{ padding: "15px 46px", fontSize: 11 }}
          >
            ENTER
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
