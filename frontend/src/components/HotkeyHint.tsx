import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, GOLD_A, EASE_SIGNATURE } from "../constants";
import { NAV_ITEMS } from "../data";

const SEEN_KEY = "tyt-hotkey-hint-seen";

const labelFor: Record<string, string> = {
  home: "Home", teams: "Teams", org: "Org", news: "News", shop: "Shop", partners: "Partners",
};

interface HotkeyHintProps {
  /** Caller decides *when* it's eligible to appear (e.g. IntroGate once its
   *  ENTER button is showing) — this component only decides *whether*
   *  (has this session already dismissed it once, ever). */
  show: boolean;
}

/** Centered, modal-weight callout for the hotkey nav (useHotkeyNav.ts) —
 *  shown once per session, on the load-in screen, and closed only by its
 *  own × (no auto-dismiss, no backdrop-click — the user decides when
 *  they're done reading it). */
export function HotkeyHint({ show }: HotkeyHintProps) {
  const [dismissed, setDismissed] = useState(false);

  if (typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY)) return null;
  if (dismissed) return null;

  const close = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hotkey-hint-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
          style={{
            position: "fixed", inset: 0, zIndex: 320,
            background: "rgba(4,4,4,0.72)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          <motion.div
            role="dialog"
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE_SIGNATURE }}
            className="glass-card"
            style={{ position: "relative", width: "100%", maxWidth: 560, padding: "48px 44px 44px", textAlign: "center" }}
          >
            <button
              onClick={close}
              aria-label="Dismiss"
              style={{
                position: "absolute", top: 18, right: 18, width: 32, height: 32, borderRadius: "50%",
                border: `1px solid ${GOLD_A(0.25)}`, background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.5)", fontSize: 17, lineHeight: 1, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ×
            </button>

            <span
              className="fb"
              style={{ color: GOLD, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", display: "block", marginBottom: 14 }}
            >
              Try This
            </span>
            <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1, marginBottom: 16 }}>
              Keyboard Shortcuts
            </h2>
            <p className="fb" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, lineHeight: 1.7, marginBottom: 32, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
              Press a letter, anywhere on the site, to jump straight to that page — no need to reach for the nav.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12 }}>
              {NAV_ITEMS.map(({ key, page }) => (
                <div
                  key={key}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,0.03)", border: `1px solid ${GOLD_A(0.18)}`,
                  }}
                >
                  <span
                    className="fd"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      width: 30, height: 30, fontSize: 14, fontWeight: 900,
                      border: `1px solid ${GOLD_A(0.45)}`, color: GOLD, borderRadius: 6,
                    }}
                  >
                    {key}
                  </span>
                  <span className="fb" style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600 }}>
                    {labelFor[page]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
