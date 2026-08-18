import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { GOLD_A, GOLD_GLOW, EASE_SIGNATURE } from "../constants";

/** Persistent bottom-right entry point into /contact, hidden on that page
 *  itself (no point pointing at where you already are). Sits below the
 *  intro gate's z-index so it's inert while that overlay is up. */
export function ContactFAB() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === "/contact") return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5, ease: EASE_SIGNATURE }}
      whileHover={{ y: -3 }}
      onClick={() => navigate("/contact")}
      aria-label="Get in touch"
      className="fb contact-fab"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 150,
        display: "flex", alignItems: "center", gap: 9,
        padding: "14px 18px", borderRadius: 999, border: `1px solid ${GOLD_A(0.35)}`,
        background: "rgba(10,10,10,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        color: "#fff", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
        cursor: "pointer", boxShadow: GOLD_GLOW(0.5),
        transition: "box-shadow 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <FiMessageCircle size={16} color="#f0a500" />
      {/* Collapses to an icon-only circle under 640px (see .contact-fab in
          GLOBAL_CSS) — the full pill was wide enough to sit on top of
          roster/card text on phone widths at whatever scroll position the
          page happened to be at. */}
      <span className="contact-fab-label">Contact</span>
    </motion.button>
  );
}
