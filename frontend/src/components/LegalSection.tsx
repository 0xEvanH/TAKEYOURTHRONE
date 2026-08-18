import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_SIGNATURE } from "../constants";

// Shared by PrivacyPage/TermsPage — was previously copy-pasted identically
// in both files.
export const LAST_UPDATED = "8 April 2026";
export const CONTACT_EMAIL = "TYTgaming2025@gmail.com";

interface LegalSectionProps {
  title: string;
  index: number;
  children: ReactNode;
}

export function LegalSection({ title, index, children }: LegalSectionProps) {
  return (
    <motion.div
      // Mount-triggered, not whileInView: these sections sit close enough
      // to the top of a short-ish page that the IntersectionObserver could
      // already consider them "in view" at mount, which made whileInView
      // fail to fire at all for some of them — they'd sit stuck at
      // opacity: 0 forever. A plain animate-on-mount has no such edge case.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 4) * 0.06, duration: 0.5, ease: EASE_SIGNATURE }}
      style={{ marginBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 28 }}
    >
      <h2 className="fd" style={{ color: "#fff", fontWeight: 600, fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 16, letterSpacing: "0.04em" }}>
        {title}
      </h2>
      <div className="fb" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 13, maxWidth: 760 }}>
        {children}
      </div>
    </motion.div>
  );
}
